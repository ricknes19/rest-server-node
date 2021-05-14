const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generate-jwt');

const register = async(req = request, res = response) => {

    const { nombre, correo, clave, rol } = req.body;

    try {
        
        const usuario = await new Usuario({ nombre, correo, clave, rol });

        if(rol !== 'USER_ROLE'){
            return res.status(400).json({
                msg: 'Sólo se permite el rol USER_ROLE'
            });
        }

        const salt = bcryptjs.genSaltSync();
        usuario.clave = bcryptjs.hashSync(clave, salt);
    
        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        res.status(201).json({
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error en el registro de usuario'
        });
    }
   
}

module.exports = {
    register
}


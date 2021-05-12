const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generate-jwt');

const login = async(req = request, res = response) => {

    const { correo, clave } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ correo, estado: true });
        if(!usuario){
            return res.status(400).json({
                msg: 'Correo/Contraseña son incorrectos'
            });
        }

        const claveValido = bcryptjs.compareSync( clave, usuario.clave );
        if(!claveValido){
            return res.status(400).json({
                msg: 'Correo/Contraseña son incorrectos'
            });
        }

        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Error en la autenticación'
        });
    }

}

module.exports = {
    login
}
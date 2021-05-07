const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    res.json({
        msg: 'GET usuario'
    });

}

const usuariosPost = async(req = request, res = response) => {

    const { nombre, correo, clave, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, clave, rol });
    
    const salt = bcryptjs.genSaltSync();
    usuario.clave = bcryptjs.hashSync(clave, salt);

    await usuario.save();

    res.status(201).json({ usuario });

}

const usuariosPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { correo, clave, ...nuevoUsuario } = req.body;

    if(clave){
        const salt = bcryptjs.genSaltSync();
        nuevoUsuario.clave = bcryptjs.hashSync(clave, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, nuevoUsuario);

    res.json({ usuario });

}

const usuariosDelete = (req = request, res = response) => {

    res.json({
        msg: 'DELETE usuario'
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}

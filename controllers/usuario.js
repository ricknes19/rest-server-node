const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
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

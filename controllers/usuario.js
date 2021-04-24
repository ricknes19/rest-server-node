const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {

    res.json({
        msg: 'GET usuario'
    });

}

const usuariosPost= (req = request, res = response) => {

    res.json({
        msg: 'POST usuario'
    });

}

const usuariosPut = (req = request, res = response) => {

    res.json({
        msg: 'PUT usuario'
    });

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

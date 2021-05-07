const Usuario = require('../models/usuario');

const verificaCorreo = async(correo = '') => {

    const existeCorreo = await Usuario.findOne({ correo });

    if(existeCorreo){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

module.exports = {
    verificaCorreo
}
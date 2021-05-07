const Usuario = require('../models/usuario');
const Role = require('../models/role');

const verificaCorreo = async(correo = '') => {

    const existeCorreo = await Usuario.findOne({ correo });

    if(existeCorreo){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const verificaRol = async(rol = '') => {
    
    const existeRol = await Role.findOne({ rol });
    
    if(!existeRol){
        throw new Error(`El rol ${rol} no es válido`);
    }
}

const verificaUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}

module.exports = {
    verificaCorreo,
    verificaRol,
    verificaUsuarioPorId
}
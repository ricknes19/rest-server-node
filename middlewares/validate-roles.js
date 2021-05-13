const { request, response } = require('express');

const validarAdminRole = (req = request, res = response, next) => {
    
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Debe validar el token'
        });
    }

    const { nombre, rol } = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no es un administrador`
        });
    }

    next();

}

const validarRolesPermitidos = ( ...roles ) => {

    return (req = request, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Debe validar el token'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `Se requiere uno de estos roles ${roles}`
            });
        }
        
        next();
    }

}


module.exports = {
    validarAdminRole,
    validarRolesPermitidos
}
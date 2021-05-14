const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuario');
const { verificaCorreo, verificaRol, verificaUsuarioPorId } = require('../helpers/db-validations');
const { validarCampos, validarJWT, validarAdminRole } = require('../middlewares');

const router = Router();

router.get('/', [
    validarJWT,
    validarAdminRole,
], usuariosGet);

router.post('/', [
    validarJWT,
    validarAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( verificaCorreo ),
    check('clave', 'La clave debe tener 6 o más caracteres').isLength( {min: 6} ),
    check('rol').custom( verificaRol ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( verificaUsuarioPorId ),
    check('rol').custom( verificaRol ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    validarAdminRole,
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( verificaUsuarioPorId ),
    validarCampos
], usuariosDelete);

module.exports = router;
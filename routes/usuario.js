const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validations');
const { verificaCorreo, verificaRol, verificaUsuarioPorId } = require('../helpers/db-validations');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( verificaCorreo ),
    check('clave', 'La clave debe tener 6 o más caracteres').isLength( {min: 6} ),
    check('rol').custom( verificaRol ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom( verificaUsuarioPorId ),
    check('rol').custom( verificaRol ),
    validarCampos
], usuariosPut);

router.delete('/', usuariosDelete);

module.exports = router;
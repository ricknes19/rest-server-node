const { Router } = require('express');
const { check } = require('express-validator');

const { register } = require('../controllers/register');
const { validarCampos } = require('../middlewares');
const { verificaCorreo } = require('../helpers/db-validations');

const router = Router();

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( verificaCorreo ),
    check('clave', 'La clave debe tener 6 o más caracteres').isLength( {min: 6} ),
    validarCampos
], register);

module.exports = router;
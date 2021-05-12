const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validations');

const router = Router();

router.post('/login', [
   check('correo', 'El correo no es válido').isEmail(),
   check('clave', 'La clave es obligatoria').not().isEmpty(),
   validarCampos 
], login);

module.exports = router;
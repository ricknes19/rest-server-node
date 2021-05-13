
const validations = require('../middlewares/validations');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...validations,
    ...validateJWT,
    ...validateRoles
}
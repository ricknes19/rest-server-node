const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    clave: {
        type: String,
        required: [ true, 'La clave es obligatoria']
    },
    avatar: { 
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, clave, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
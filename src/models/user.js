const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas del sal

/**
 * @typedef {Object} User
 * @property {String} name Nombre del usuario.
 * @property {String} email Correo electrónico del usuario.
 * @property {String} password Contraseña del usuario, que será encriptada.
 * @property {String[]} preference Preferencias del usuario.
 * @property {Boolean} [active] Estado de actividad del usuario.
 * @property {Date} [createdAt] Fecha en la que se creó el usuario.
 * @property {Date} [updateDate] Fecha en la que se actualizó la información del usuario por última vez.
 */

/**
 * Esquema para el modelo de usuario.
 * @type {mongoose.Schema<User>}
 */
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    preference: {
        type: [String],
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

/**
 * Middleware que se ejecuta antes de guardar un usuario en la base de datos.
 * Encripta la contraseña del usuario si ha sido modificada.
 * @function
 * @param {Function} next Función de callback para continuar con el siguiente middleware.
 */
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);

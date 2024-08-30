const mongoose = require('mongoose');

/**
 * @typedef {Object} Restaurant
 * @property {String} name Nombre del restaurante. Debe ser único.
 * @property {String} address Dirección del restaurante.
 * @property {Number} altitud Altitud del restaurante.
 * @property {Number} longitud Longitud del restaurante.
 * @property {Object[]} [horario] Horario de apertura del restaurante. El formato de cada objeto en el array puede variar.
 * @property {String[]} cuisine Tipos de cocina ofrecidos por el restaurante.
 * @property {Number} [rating] Calificación promedio del restaurante.
 * @property {Boolean} [active] Estado de actividad del restaurante.
 * @property {Date} [createdAt] Fecha en la que se creó el restaurante.
 * @property {Date} [updateDate] Fecha en la que se actualizó la información del restaurante por última vez.
 */

/**
 * Esquema para el modelo de restaurante.
 * @type {mongoose.Schema<Restaurant>}
 */
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Nombre único
    },
    address: {
        type: String,
        required: true
    },
    altitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    horario: {
        type: [Object],
        default: [] // Inicializa como un array vacío
    },
    cuisine: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        default: 0
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

// Índice compuesto para garantizar la unicidad de nombre y ubicación
restaurantSchema.index({ name: 1, altitud: 1, longitud: 1 }, { unique: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);

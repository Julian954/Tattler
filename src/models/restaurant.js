const mongoose = require('mongoose');

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
        default: true
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
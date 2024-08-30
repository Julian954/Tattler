const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef {Object} Favorite
 * @property {mongoose.Schema.Types.ObjectId} userId ID del usuario que ha marcado el restaurante como favorito.
 * @property {mongoose.Schema.Types.ObjectId} restaurantId ID del restaurante que ha sido marcado como favorito.
 * @property {Date} [createdAt] Fecha en la que se marcó el restaurante como favorito.
 * @property {Date} [updateDate] Fecha en la que se actualizó la información del favorito por última vez.
 */

/**
 * Esquema para el modelo de favoritos.
 * @type {mongoose.Schema<Favorite>}
 */
const FavoriteSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant', // Referencia al modelo Restaurant
        required: true
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

module.exports = mongoose.model('Favorite', FavoriteSchema);

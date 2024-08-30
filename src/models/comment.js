const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @typedef {Object} Comment
 * @property {mongoose.Schema.Types.ObjectId} userId ID del usuario que hizo el comentario.
 * @property {mongoose.Schema.Types.ObjectId} restaurantId ID del restaurante al que se refiere el comentario.
 * @property {String} [comment] Texto del comentario.
 * @property {Number} rating Calificación del comentario (1-5).
 * @property {Date} [createdAt] Fecha en la que se creó el comentario.
 * @property {Date} [updateDate] Fecha en la que se actualizó el comentario por última vez.
 */

/**
 * Esquema para el modelo de comentario.
 * @type {mongoose.Schema<Comment>}
 */
const CommentSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
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

module.exports = mongoose.model('Comment', CommentSchema);

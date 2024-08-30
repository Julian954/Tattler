const express = require('express');
const commentSchema = require('../models/comment');
const router = express.Router();

/**
 * @api POST /comments Crear Comentario
 * @apiName CreateComment
 * @apiGroup Comments
 * @apiParam {String} userId ID del usuario.
 * @apiParam {String} restaurantId ID del restaurante.
 * @apiParam {String} comment Texto del comentario.
 * @apiParam {Number} rating Calificación del comentario (1-5).
 * @apiSuccess {Object} data Información del comentario creado.
 * @apiError {Object} message Mensaje de error.
 */
router.post('/comments', (req, res) => {
    const comment = commentSchema(req.body);
    comment
        .save()
        .then((data) => {
            console.log('Comment guardado:', data);
            res.json(data);
        })
        .catch((error) => {
            console.error('Error al guardar el comment:', error);
            res.json({ message: error });
        });
});

/**
 * @api GET /comments Obtener Todos los Comentarios
 * @apiName GetAllComments
 * @apiGroup Comments
 * @apiSuccess {Object[]} data Lista de comentarios.
 * @apiError {Object} message Mensaje de error.
 */
router.get('/comments', (req, res) => {
    commentSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @api GET /comments/:id Obtener Comentario por ID
 * @apiName GetCommentById
 * @apiGroup Comments
 * @apiParam {String} id ID del comentario.
 * @apiSuccess {Object} data Información del comentario.
 * @apiError {Object} message Mensaje de error.
 */
router.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    commentSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @api {put} /comments/:id Actualizar Comentario
 * @apiName UpdateComment
 * @apiGroup Comments
 * @apiParam {String} id ID del comentario a actualizar.
 * @apiParam {String} [userId] ID del usuario.
 * @apiParam {String} [restaurantId] ID del restaurante.
 * @apiParam {String} [comment] Texto actualizado del comentario.
 * @apiParam {Number} [rating] Calificación actualizada del comentario.
 * @apiSuccess {Object} data Información del comentario actualizado.
 * @apiError {Object} message Mensaje de error.
 */
router.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { userId, restaurantId, comment, rating } = req.body;
    commentSchema
        .updateOne({ _id: id }, { $set: { userId, restaurantId, comment, rating, updateDate: Date.now() } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/**
 * @api {delete} /comments/:id Eliminar Comentario
 * @apiName DeleteComment
 * @apiGroup Comments
 * @apiParam {String} id ID del comentario a eliminar.
 * @apiSuccess {Object} data Información sobre la eliminación.
 * @apiError {Object} message Mensaje de error.
 */
router.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    commentSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;

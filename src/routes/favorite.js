/**
 * @module FavoriteRoutes
 */

const express = require('express');
const favoriteSchema = require('../models/favorite');
const router = express.Router();

/**
 * @route POST /favorites Crea un nuevo favorito
 * @group Favorites - Operaciones relacionadas con favoritos
 * @param {object} req.body - Contiene los datos del favorito que se desea crear
 * @returns {object} 200 - El favorito creado
 * @returns {object} 500 - Error al guardar el favorito
 */
router.post('/favorites', (req, res) => {
    const favorite = favoriteSchema(req.body);
    favorite
        .save()
        .then((data) => {
            console.log('Favorito guardado:', data);
            res.json(data);
        })
        .catch((error) => {
            console.error('Error al guardar el favorito:', error);
            res.status(500).json({ message: 'Error al guardar el favorito.', error });
        });
});

/**
 * @route GET /favorites Obtiene todos los favoritos
 * @group Favorites - Operaciones relacionadas con favoritos
 * @returns {Array} 200 - Una lista de todos los favoritos
 * @returns {object} 500 - Error al obtener los favoritos
 */
router.get('/favorites', (req, res) => {
    favoriteSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route GET /favorites/{id} Obtiene un favorito
 * @group Favorites - Operaciones relacionadas con favoritos
 * @param {string} id.path.required - El ID del favorito que se desea obtener
 * @returns {object} 200 - El favorito correspondiente al ID
 * @returns {object} 500 - Error al obtener el favorito
 */
router.get('/favorites/:id', (req, res) => {
    const { id } = req.params;
    favoriteSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route PUT /favorites/{id} Actualiza un favorito
 * @group Favorites - Operaciones relacionadas con favoritos
 * @param {string} id.path.required - El ID del favorito que se desea actualizar
 * @param {object} req.body - Contiene los nuevos datos del favorito
 * @returns {object} 200 - El favorito actualizado
 * @returns {object} 500 - Error al actualizar el favorito
 */
router.put('/favorites/:id', (req, res) => {
    const { id } = req.params;
    const { userId, restaurantId } = req.body;
    favoriteSchema
        .updateOne(
            { _id: id },
            {
                $set: {
                    userId,
                    restaurantId,
                    updateDate: Date.now(),
                },
            }
        )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route DELETE /favorites/{id} Elimina un favorito
 * @group Favorites - Operaciones relacionadas con favoritos
 * @param {string} id.path.required - El ID del favorito que se desea eliminar
 * @returns {object} 200 - Confirma la eliminación
 * @returns {object} 500 - Error al eliminar el favorito
 */
router.delete('/favorites/:id', (req, res) => {
    const { id } = req.params;
    favoriteSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

module.exports = router;

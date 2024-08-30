/**
 * @module UserRoutes
 */

const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

/**
 * @route POST /users Crea un nuevo usuario
 * @group Users - Operaciones relacionadas con usuarios
 * @param {object} req.body - Contiene los datos del usuario que se desea crear
 * @returns {object} 200 - El usuario creado
 * @returns {object} 500 - Error al guardar el usuario
 */
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => {
            console.log('Usuario guardado:', data);
            res.json(data);
        })
        .catch((error) => {
            console.error('Error al guardar el usuario:', error);
            res.status(500).json({ message: error });
        });
});

/**
 * @route GET /users Obtiene una lista de todos los usuarios
 * @group Users - Operaciones relacionadas con usuarios
 * @returns {Array} 200 - Una lista de todos los usuarios
 * @returns {object} 500 - Error al obtener los usuarios
 */
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/** 
 * @route GET /users/{id} Obtiene un usuario
 * @group Users - Operaciones relacionadas con usuarios
 * @param {string} id.path - El ID del usuario que se desea obtener
 * @returns {object} 200 - El usuario solicitado
 * @returns {object} 404 - Usuario no encontrado
 * @returns {object} 500 - Error al obtener el usuario
 */
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json(data);
            }
        })
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route PUT /users/{id} Actualiza un usuario
 * @group Users - Operaciones relacionadas con usuarios
 * @param {string} id.path - El ID del usuario que se desea actualizar
 * @param {object} req.body - Contiene los datos del usuario que se desea actualizar
 * @returns {object} 200 - El usuario actualizado
 * @returns {object} 404 - Usuario no encontrado
 * @returns {object} 500 - Error al actualizar el usuario
 */
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, preference, active } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { name, email, preference, active, updateDate: Date.now() } })
        .then((data) => {
            if (data.matchedCount === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json(data);
            }
        })
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route DELETE /users/{id} Elimina un usuario
 * @group Users - Operaciones relacionadas con usuarios
 * @param {string} id.path - El ID del usuario que se desea eliminar
 * @returns {object} 200 - Confirmación de eliminación del usuario
 * @returns {object} 404 - Usuario no encontrado
 * @returns {object} 500 - Error al eliminar el usuario
 */
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => {
            if (data.deletedCount === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                res.json(data);
            }
        })
        .catch((error) => res.status(500).json({ message: error }));
});

module.exports = router;

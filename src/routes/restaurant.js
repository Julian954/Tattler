/**
 * @module RestaurantRoutes
 */

const express = require('express');
const restaurantSchema = require('../models/restaurant');
const router = express.Router();

/**
 * @route POST /restaurants Agregar un nuevo restaurante
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {object} req.body - Contiene los datos del restaurante que se desea crear
 * @returns {object} 200 - El restaurante creado
 * @returns {object} 400 - Error por duplicado, restaurante ya existe
 * @returns {object} 500 - Error al guardar el restaurante
 */
router.post('/restaurants', (req, res) => {
    const restaurant = restaurantSchema(req.body);
    restaurant
        .save()
        .then((data) => {
            console.log('Restaurante guardado:', data);
            res.json(data);
        })
        .catch((error) => {
            if (error.code === 11000) { // Código de error para duplicado
                res.status(400).json({ message: 'El restaurante ya existe con ese nombre y ubicación.' });
            } else {
                res.status(500).json({ message: 'Error al guardar el restaurante.', error });
            }
        });
});

/** 
 * @route GET /restaurants  Obtener todos los restaurantes
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @returns {Array} 200 - Una lista de todos los restaurantes
 * @returns {object} 500 - Error al obtener los restaurantes
 */
router.get('/restaurants', (req, res) => {
    restaurantSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

// Función para calcular la distancia usando la fórmula del Haversine
const haversineDistance = (coords1, coords2) => {

    function toRad(x) {
        return x * Math.PI / 180;
    }

    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
};


/**
 * @route GET /restaurants/nearby Obtener restaurantes cercanos
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {number} lat.query.required - Latitud de la ubicación actual
 * @param {number} lon.query.required - Longitud de la ubicación actual
 * @returns {Array} 200 - Una lista de restaurantes dentro de un radio de 5 km
 * @returns {object} 500 - Error al obtener los restaurantes cercanos
 */
router.get('/restaurants/nearby', async (req, res) => {
    const { lat, lon } = req.query;
    const maxDistance = 5; // 5 km

    try {
        const restaurants = await restaurantSchema.find();
        const nearbyRestaurants = restaurants.filter(restaurant => {
            const distance = haversineDistance(
                [lat, lon],
                [restaurant.altitud, restaurant.longitud]
            );
            return distance <= maxDistance;
        });

        res.json(nearbyRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /restaurants/filter Filtrar restaurantes
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {string} name.query - Nombre del restaurante (opcional)
 * @param {string} cuisine.query - Tipo de cocina, separado por comas (opcional)
 * @param {number} lat.query - Latitud de la ubicación actual (opcional)
 * @param {number} lon.query - Longitud de la ubicación actual (opcional)
 * @param {string} orderByDistance.query - Ordenar por distancia ('asc' o 'desc')
 * @returns {Array} 200 - Una lista de restaurantes que coinciden con los filtros
 * @returns {object} 500 - Error al obtener los restaurantes filtrados
 */
router.get('/restaurants/filter', async (req, res) => {
    const { name, cuisine, lat, lon, orderByDistance } = req.query;
    const query = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (cuisine) query.cuisine = { $in: cuisine.split(',') };

    try {
        let restaurants = await restaurantSchema.find(query);

        if (lat && lon) {
            restaurants = restaurants.map(restaurant => {
                restaurant.distance = haversineDistance(
                    [lat, lon],
                    [restaurant.altitud, restaurant.longitud]
                );
                return restaurant;
            });

            if (orderByDistance === 'asc') {
                restaurants.sort((a, b) => a.distance - b.distance);
            } else if (orderByDistance === 'desc') {
                restaurants.sort((a, b) => b.distance - a.distance);
            }
        }

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /restaurants/search Buscar restaurantes
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {string} name.query - Nombre del restaurante (opcional)
 * @param {string} cuisine.query - Tipo de cocina, separado por comas (opcional)
 * @returns {Array} 200 - Una lista de restaurantes que coinciden con los filtros
 * @returns {object} 500 - Error durante la búsqueda
 */
router.get('/restaurants/search', async (req, res) => {
    const { name, cuisine } = req.query;

    try {
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (cuisine) query.cuisine = { $in: cuisine.split(',') };

        console.log('Consulta construida:', query);

        const restaurants = await restaurantSchema.find(query);
        res.json(restaurants);
    } catch (error) {
        console.error('Error durante la búsqueda:', error);
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /restaurants/{id} Obtener un restaurante
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {string} id.path.required - El ID del restaurante que se desea obtener
 * @returns {object} 200 - El restaurante correspondiente al ID
 * @returns {object} 500 - Error al obtener el restaurante
 */
router.get('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    restaurantSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route PUT /restaurants/{id} Actualizar un restaurante
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {string} id.path.required - El ID del restaurante que se desea actualizar
 * @param {object} req.body - Contiene los nuevos datos del restaurante
 * @returns {object} 200 - El restaurante actualizado
 * @returns {object} 500 - Error al actualizar el restaurante
 */
router.put('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, preference, active } = req.body;
    restaurantSchema
        .updateOne(
            { _id: id },
            {
                $set: {
                    name,
                    email,
                    preference,
                    active,
                    updateDate: Date.now(),
                },
            }
        )
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

/**
 * @route DELETE /restaurants/{id} Eliminar un restaurante
 * @group Restaurants - Operaciones relacionadas con restaurantes
 * @param {string} id.path.required - El ID del restaurante que se desea eliminar
 * @returns {object} 200 - Confirma la eliminación
 * @returns {object} 500 - Error al eliminar el restaurante
 */
router.delete('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    restaurantSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error }));
});

module.exports = router;

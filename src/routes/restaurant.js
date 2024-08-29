const express = require('express');
const restaurantSchema = require('../models/restaurant');
const router = express.Router();

//create restaurant
router.post('/restaurants',(req,res)=>{
    const restaurant = restaurantSchema(req.body);
    restaurant
    .save()
    .then((data) => {
        console.log('Restaurante guardado:', data);
        res.json(data);
    })
    .catch((error) => {if (error.code === 11000) { // Código de error para duplicado
        res.status(400).json({ message: 'El restaurante ya existe con ese nombre y ubicación.' });
        } else {
            res.status(500).json({ message: 'Error al guardar el restaurante.', error });
        } 
    });
});

//get all restaurants
router.get('/restaurants',(req,res)=>{
    restaurantSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
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

// get restaurantes cercanos max 5km
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

// get restaurantes búsqueda filtrada y ordenada por cercanía
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

// Búsqueda y filtrado de restaurantes
router.get('/restaurants/search', async (req, res) => {
    const { name, cuisine } = req.query; // Obtener parámetros de consulta

    try {
        const query = {};

        // Si el nombre está presente en la consulta, buscar por nombre utilizando una expresión regular
        if (name) query.name = { $regex: name, $options: 'i' }; 

        // Si el tipo de cocina está presente en la consulta, buscar por tipo de cocina
        if (cuisine) query.cuisine = { $in: cuisine.split(',') }; 

        console.log('Consulta construida:', query); // Log para depuración

        const restaurants = await restaurantSchema.find(query);
        res.json(restaurants); // Responder con los resultados de la consulta
    } catch (error) {
        console.error('Error durante la búsqueda:', error); // Log del error
        res.status(500).json({ message: error.message }); // Responder con el mensaje de error
    }
});

//get a restaurant
router.get('/restaurants/:id',(req,res)=>{
    const {id} = req.params;
    restaurantSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//update a restaurant
router.put('/restaurants/:id',(req,res)=>{
    const {id} = req.params;
    const {name,email,preference,active} = restaurantSchema(req.body);
    restaurantSchema
        .updateOne({_id:id},{$set:{name,email,preference,active,updateDate:Date.now()}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//delete a restaurant
router.delete('/restaurants/:id',(req,res)=>{
    const {id} = req.params;
    restaurantSchema
        .deleteOne({_id:id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});


module.exports = router;
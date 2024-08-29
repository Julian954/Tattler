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
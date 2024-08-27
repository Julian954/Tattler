const express = require('express');
const favoriteSchema = require('../models/favorite');
const router = express.Router();

//create favorite
router.post('/favorites',(req,res)=>{
    const comment = favoriteSchema(req.body);
    comment
    .save()
    .then((data) => {
        console.log('Favorito guardado:', data);
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al guardar el favorito:', error);
        res.json({message:error})}
    );
});

//get all favorites
router.get('/favorites',(req,res)=>{
    favoriteSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//get a favorite
router.get('/favorites/:id',(req,res)=>{
    const {id} = req.params;
    favoriteSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//update a comment
router.put('/favorites/:id',(req,res)=>{
    const {id} = req.params;
    const {userId,restaurantId} = favoriteSchema(req.body);
    favoriteSchema
        .updateOne({_id:id},{$set:{userId,restaurantId,updateDate:Date.now()}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//delete a comment
router.delete('/favorites/:id',(req,res)=>{
    const {id} = req.params;
    favoriteSchema
        .deleteOne({_id:id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});


module.exports = router;
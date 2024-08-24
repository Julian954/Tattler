const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

//create user
router.post('/users',(req,res)=>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => {
        console.log('Usuario guardado:', data);
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al guardar el usuario:', error);
        res.json({message:error})}
    );
});

//get all users
router.get('/users',(req,res)=>{
    userSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//get a user
router.get('/users/:id',(req,res)=>{
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//update a user
router.put('/users/:id',(req,res)=>{
    const {id} = req.params;
    const {name,email,preference,active} = userSchema(req.body);
    userSchema
        .updateOne({_id:id},{$set:{name,email,preference,active,updateDate:Date.now()}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//delete a user
router.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    userSchema
        .deleteOne({_id:id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});


module.exports = router;
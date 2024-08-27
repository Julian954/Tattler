const express = require('express');
const commentSchema = require('../models/comment');
const router = express.Router();

//create comment
router.post('/comments',(req,res)=>{
    const comment = commentSchema(req.body);
    comment
    .save()
    .then((data) => {
        console.log('Comment guardado:', data);
        res.json(data);
    })
    .catch((error) => {
        console.error('Error al guardar el comment:', error);
        res.json({message:error})}
    );
});

//get all comments
router.get('/comments',(req,res)=>{
    commentSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//get a comment
router.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    commentSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//update a comment
router.put('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const {userId,restaurantId,comment,rating} = commentSchema(req.body);
    commentSchema
        .updateOne({_id:id},{$set:{userId,restaurantId,comment,rating,updateDate:Date.now()}})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});

//delete a comment
router.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    commentSchema
        .deleteOne({_id:id})
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message:error}));
});


module.exports = router;
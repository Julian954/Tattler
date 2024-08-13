const express = require('express');
const app = express();

//config express

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Todo Ok!');
});
module.exports = app;
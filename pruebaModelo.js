const mongoose = require('mongoose');
const Trip = require('./models/trip.model');

(async () =>{
    await mongoose.connect('mongodb+srv://jetriix:NaoCurso@tattler.niep1.mongodb.net/?retryWrites=true&w=majority&appName=Tattler');

    const newTrip = await Trip.create({
        name:'prueba de viaje',
        descripcion:'prueba de desc',
        destination:'berlin',
        category:'amigos',
        start_date:'2024-08-14'
    });

    console.log(newTrip);
})();
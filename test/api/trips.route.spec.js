const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Trip = require('../../models/trip.model');


describe('Pruebas sobre api de trips',()=>{

    beforeAll(async ()=>{
        await mongoose.connect('mongodb+srv://jetriix:NaoCurso@tattler.niep1.mongodb.net/?retryWrites=true&w=majority&appName=Tattler');  
    });    

    afterAll(async ()=>{
        await mongoose.disconnect();
    });

    describe('GET /api/trips',()=>{

        let response;
        beforeEach(async ()=>{
            response = await request(app).get('/api/trips');
        });

        it('la ruta funciona',async ()=>{
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });


        it('La peticion nos devuelve un array de trips',async ()=>{
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('POST /api/trips',()=>{
        const newTrip = {
            name:'prueba de viaje2',
            description:'prueba de desc2',
            destination:'berlin',
            category:'familiar',
            start_date:'2024-08-16'
        };

        const wrongTrip = {
            nombre:'test trip'
        };

        afterAll(async ()=>{
            await Trip.deleteMany({name:'test trip'});
        });
         
        it('la ruta funciona',async ()=>{
            const response = await request(app).post('/api/trips').send(newTrip);
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('se inserta correctamente',async ()=>{
            const response = await request(app).post('/api/trips').send(newTrip);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newTrip.name);
        })

        it('Error en a insercion',async ()=>{
            const response = await request(app).post('/api/trips').send(wrongTrip);
            expect(response.statusCode).toBe(500); 
            expect(response.headers['content-type']).toContain('json');
        });
    });


    describe('PUT /api/trips',()=>{
        let trip;

        beorEach(async ()=>{
        trip = await Trip.create({
            name:'test trip',
            description:'prueba de desc',
            destination:'berlin',
            category:'amigos',
            start_date:'2024-08-14'
        });
        });

        afterEach(async ()=>{
            await Trip.findByIdAndDelete(trip._id);
        });

        it('la ruta funciona',async ()=>{
            const response = await request(app).put(`/api/trips/${trip._id}`).send({name:'test trip2'})
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
    });
})
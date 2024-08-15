const router  = require('express').Router();
const Trip = require('../../models/trip.model');

router.get('/',async (req,res)=>{
    try{
        const trips = await Trip.find();
        res.json(trips);
    }catch{
        res.status(500).json({message:'Algo salio mal'});
    }
});

router.post('/',async (req,res)=>{
    try{
        const newTrip = await Trip.create(req.body);
        res.json(newTrip);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put('/:tripId', async (req,res)=>{
    try{
        const tripEdit = await Trip.findByIdAndUpdate(
            req.params.tripId,
            req.body,
            {new:true}
        );
        res.json(tripEdit);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

module.exports = router;
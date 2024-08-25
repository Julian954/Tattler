const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    altitud:{
        type:Number,
        required:true
    },
    longitud:{
        type:Number,
        required:true
    },
    horario:{
        type:[Object],
        default:true
    },
    cuisine:{
        type:[String],
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Restaurant',restaurantSchema);
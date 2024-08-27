const mongoose = require('mongoose');
const {Schema} = mongoose;


const CommentSchema = mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId:{
        type: Schema.Types.ObjectId,
        ref: 'restaurant', // Referencia al modelo User
        required: true
    },
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        required:true
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

module.exports = mongoose.model('Comment',CommentSchema);
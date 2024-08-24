const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //numero de rondas del sal

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    preference:{
        type:[String],
        required:true
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

UserSchema.pre('save',function(next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password,saltRounds,(err,hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User',UserSchema);
const mongoose= require('mongoose');

const userschema= new mongoose.Schema({
    Fullname:{
        type:String,
    },
    Email:{
        type:String,
    },
    profile:{
        type:String,
    },
    Password:{
        type:String,
    },
    role:{
        type: String,
       enum: ['admin', 'user'],
       default: 'user'
   }
},
{timestamps:true})

const Usermodel= mongoose.model('user', userschema)
 
module.exports = Usermodel;
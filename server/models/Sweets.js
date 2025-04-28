const mongoose= require('mongoose');

const postSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,      // Makes title mandatory
        trim: true
    },
    desc:{
        type: String 
    },
    image:{
        type: String,
        default: ""          // Optional: default empty if no image
    },
    price: {
        type: Number,
        required: true,     // Makes price mandatory
        min: [0, 'Price cannot be negative'] // Optional: validates that price is not negative
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
    
}, 
{timestamps:true})

const Postmodel= mongoose.model('sweets', postSchema)

module.exports= Postmodel;
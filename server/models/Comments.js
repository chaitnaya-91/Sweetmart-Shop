const mongoose= require('mongoose');

const CommentSchema= new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sweets',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comment: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Commentmodel= mongoose.model('comments', CommentSchema);

module.exports= Commentmodel;
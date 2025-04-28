const express = require('express');
const { Login } = require('../controllers/Auth');
const { AddComment, ViewComments } = require('../controllers/Comment');


const CommentRoutes = express.Router();

CommentRoutes.post('/addcomment',  AddComment);
CommentRoutes.get('/viewcomment/:postId',  ViewComments);


module.exports = CommentRoutes;

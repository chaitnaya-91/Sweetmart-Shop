const express= require('express');
const { GetSinglePost } = require('../controllers/Public');

const PublicGet = express.Router();

PublicGet.get('/getpost/:id', GetSinglePost)

module.exports= PublicGet;
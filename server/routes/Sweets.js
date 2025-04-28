const express= require('express');
const { Create, Delete, Update, Getposts } = require('../controllers/Sweets');
const IsAdmin = require('../middlewares/IsAdmin');
const upload = require('../middlewares/Multer');

const Blogroutes= express.Router();

Blogroutes.post('/create', upload.single('image'), Create);
Blogroutes.patch('/update/:id', upload.single('image'), Update);
Blogroutes.get('/getdata', Getposts);
Blogroutes.delete('/delete/:id', Delete);

module.exports= Blogroutes;

/* you can isAdmin
*/
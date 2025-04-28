const express= require('express');
const { Payments, Getkey } = require('../controllers/Razorpay');


const Razor= express.Router();

Razor.post('/process', Payments);
Razor.get('/getkey', Getkey);

module.exports= Razor;
const express= require('express');
const {Register, Login, Logout, verifyToken}= require('../controllers/Auth.js');
const upload = require('../middlewares/Multer.js');

const Authroutes=express.Router();

Authroutes.post('/register',upload.single('profile') ,Register);
Authroutes.post('/login',Login);
Authroutes.post('/logout',Logout);
Authroutes.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
  });

module.exports = Authroutes;
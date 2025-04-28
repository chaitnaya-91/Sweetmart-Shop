const express = require('express');
const dotenv = require('dotenv');
const DBCon = require('./utils/db.js');
const Authroutes = require('./routes/Auth.js');
const cookieParser= require('cookie-parser');
const Blogroutes = require('./routes/Sweets.js');
const DashboardRoutes = require('./routes/Dashboard.js')
var cors = require('cors');
const CommentRoutes = require('./routes/Comments.js');
const PublicGet = require('./routes/public.js');
const Razorpay= require('razorpay');
const Razor = require('./routes/Razorpay.js');

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
  

const corsOptoins={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptoins))
DBCon();
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json()); //work post method

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.use('/auth', Authroutes);
app.use('/sweets', Blogroutes);
app.use('/dashboard', DashboardRoutes);
app.use('/public', PublicGet);
app.use('/comments', CommentRoutes);
app.use('/payments', Razor);

app.listen(PORT, () => {
    console.log(`App is running on Port ${PORT}`);
});
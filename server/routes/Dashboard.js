const express= require('express');
const IsAdmin= require('../middlewares/IsAdmin.js');
const {Dashboard, GetUsers, Delete} = require('../controllers/Dashboard.js');


const DashboardRoutes=express.Router();

DashboardRoutes.get('/', Dashboard);
DashboardRoutes.get('/users', GetUsers);
DashboardRoutes.delete('/delete/:id', Delete);

module.exports= DashboardRoutes;
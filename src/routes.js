const express = require('express');

const ProfileControllers = require('./controllers/ProfileControllers');
const JobControllers = require('./controllers/JobControllers');
const DashboardControllers = require('./controllers/DashboardControllers');

const routes = express.Router();

routes.get('/', DashboardControllers.index);

routes.get('/job', JobControllers.addJobPage);
routes.post('/job', JobControllers.addJob);
routes.get('/job/:id', JobControllers.editJobPage);
routes.post('/job/:id', JobControllers.editJob);
routes.post('/job/delete/:id', JobControllers.deleteJob);

routes.get('/profile', ProfileControllers.profilePage);
routes.post('/profile', ProfileControllers.updateProfile);

module.exports = routes;
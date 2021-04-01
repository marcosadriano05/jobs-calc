const express = require('express');

const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
  name: "Marcos",
  avatar: "https://github.com/marcosadriano05.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
};

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    budget: 4500,
    status: "progress",
    "total-hours": 20,
    "daily-hours": 2
  },
  {
    id: 2,
    name: "OneTwo Project",
    budget: 2000,
    status: "done",
    "total-hours": 30,
    "daily-hours": 3
  }
];

routes.get('/', (req, res) => {
  return res.status(200).render(views + 'index', { jobs, profile });
});

routes.get('/job', (req, res) => {
  return res.status(200).render(views + 'job');
});

routes.post('/job', (req, res) => {
  // { name: 'Maratona Discover', 'daily-hours': '4', 'total-hours': '20' }
  const jobId = jobs[jobs.length - 1]?.id + 1 || 0; // Definindo Id para novo Job

  const jobAdded = {
    ...req.body,
    id: jobId,
    budget: 1500,
    status: "progress"
  };

  jobs.push(jobAdded);

  return res.status(200).redirect('/');
});

routes.get('/job/:id', (req, res) => {
  const jobId = req.params.id;

  const job = jobs.find(job => job.id == jobId);

  return res.status(200).render(views + 'job-edit', { job });
});

routes.post('/job/:id', (req, res) => {
  //{ name: 'OneTwo Project', 'daily-hours': '3', 'total-hours': '30' }
  const jobId = req.params.id;

  const job = jobs.find(job => job.id == jobId);

  jobEdited = { ...job, ...req.body };

  jobs[jobs.indexOf(job)] = jobEdited;

  return res.status(200).redirect('/');
});

routes.get('/profile', (req, res) => {
  return res.status(200).render(views + 'profile', { profile });
});

module.exports = routes;
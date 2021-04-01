const express = require('express');

const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
  name: "Marcos",
  avatar: "https://github.com/marcosadriano05.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75
};

const jobs = [
  {
    id: 1,
    name: "Pizzaria Guloso",
    budget: 4500,
    status: "progress",
    "total-hours": 20,
    "daily-hours": 2,
    created_at: Date.now(),
    remainingDays: 1
  },
  {
    id: 2,
    name: "OneTwo Project",
    budget: 2000,
    status: "done",
    "total-hours": 4,
    "daily-hours": 5,
    created_at: Date.now(),
    remainingDays: 1
  }
];

function daysToComplete(job) {
  // Total de dias para realizar o trabalho
  const remainigDays = job["total-hours"] / job["daily-hours"];

  // Data da criação do Job
  const createdDate = new Date(job.created_at);

  // Dia do vencimento do Job
  const dueDay = createdDate.getDate() + Number(remainigDays);

  // Data do vencimento do Job (em milisegundos)
  const dueDate = createdDate.setDate(dueDay);

  // Diferença entre a data de vencimento e a data atual
  const timeDiff = dueDate - Date.now();

  // Dia em ms
  const dayInMs = 1000 * 60 * 60 * 24;

  // Dias restantes para a conclusão do Job
  const leftDays = Math.floor(timeDiff / dayInMs);

  return leftDays;
}

routes.get('/', (req, res) => {

  const updatedJobs = jobs.map(job => {
    // Dias que restam para a conclusão do job
    const remainingDays = daysToComplete(job);

    // Atualizando status do job
    const status = remainingDays <= 0 ? "done" : "progress";

    // Custo do projeto
    const budget = profile["value-hour"] * job["total-hours"];

    return {
      ...job,
      remainingDays,
      status,
      budget
    };
  });

  return res.status(200).render(views + 'index', { jobs: updatedJobs, profile });
});

routes.get('/job', (req, res) => {
  return res.status(200).render(views + 'job');
});

routes.post('/job', (req, res) => {
  // { name: 'Maratona Discover', 'daily-hours': '4', 'total-hours': '20' }
  const jobId = jobs[jobs.length - 1]?.id + 1 || 0; // Definindo Id para novo Job

  // 48 * 5 * 5 = 1200h no ano

  const jobAdded = {
    ...req.body,
    id: jobId,
    created_at: Date.now()
  };

  console.log(jobAdded);
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
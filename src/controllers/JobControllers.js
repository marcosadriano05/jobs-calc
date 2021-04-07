const Profile = require('../models/Profile');
const Job = require('../models/Job');

const JobUtils = require('../utils/JobUtils')

module.exports = {
  addJobPage(req, res) {
    return res.status(200).render('job');
  },

  addJob(req, res) {
    const jobs = Job.get();
    // Definindo Id para novo Job
    const jobId = jobs[jobs.length - 1]?.id || 0;
  
    const jobAdded = {
      ...req.body,
      id: jobId + 1,
      created_at: Date.now()
    };
    
    Job.create(jobAdded);
  
    return res.status(200).redirect('/');
  },

  editJobPage(req, res) {
    const jobId = req.params.id;

    const jobs = Job.get();

    const job = jobs.find(job => job.id == jobId);

    if(!job) {
      return res.send("Job not found!");
    }
  
    const updatedJob = JobUtils.update(job);
  
    return res.status(200).render('job-edit', { job: updatedJob });
  },

  editJob(req, res) {
    const jobId = req.params.id;

    const jobs = Job.get();
  
    const job = jobs.find(job => job.id == jobId);
  
    updatedJob = { ...job, ...req.body };

    Job.update(updatedJob, jobId);
  
    return res.status(200).redirect('/');
  },

  deleteJob(req, res) {
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.status(200).redirect('/');
  }
}
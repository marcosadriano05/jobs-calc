const Profile = require('../models/Profile');
const Job = require('../models/Job');

const JobUtils = require('../utils/JobUtils')

module.exports = {
  addJobPage(req, res) {
    return res.status(200).render('job');
  },

  async addJob(req, res) {  
    const jobAdded = {
      ...req.body,
      created_at: Date.now()
    };
    
    await Job.create(jobAdded);
  
    return res.status(200).redirect('/');
  },

  async editJobPage(req, res) {
    const jobId = req.params.id;

    const jobs = await Job.get();
    const profile = await Profile.get()

    const job = jobs.find(job => job.id == jobId);

    if(!job) {
      return res.send("Job not found!");
    }
  
    const updatedJob = JobUtils.update(job, profile);
  
    return res.status(200).render('job-edit', { job: updatedJob });
  },

  async editJob(req, res) {
    const jobId = req.params.id;

    const jobs = await Job.get();
  
    const job = jobs.find(job => job.id == jobId);
  
    updatedJob = { ...job, ...req.body };

    Job.update(updatedJob, jobId);
  
    return res.status(200).redirect('/');
  },

  async deleteJob(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.status(200).redirect('/');
  }
}
const Profile = require('../models/Profile');
const Job = require('../models/Job');

const JobUtils = require('../utils/JobUtils')

module.exports = {
  async addJobPage(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();

    const updatedJobs = jobs.map(job => {
      return JobUtils.update(job, profile);
    });

    const freetime = profile["hours-per-day"] - updatedJobs
      .filter(job => job.status === "progress")
      .reduce((sum, current) => {
      return sum + current["daily-hours"];
    }, 0);

    return res.status(200).render('job', { freetime });
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
  
    updatedJob = { ...req.body };

    Job.update(updatedJob, jobId);
  
    return res.status(200).redirect('/');
  },

  async deleteJob(req, res) {
    const jobId = req.params.id;

    await Job.delete(jobId);

    return res.status(200).redirect('/');
  }
}
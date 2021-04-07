const Profile = require('../models/Profile');
const Job = require('../models/Job');

const JobUtils = require('../utils/JobUtils');

module.exports = { 
  async index(req, res) {
    const jobs = Job.get();
    const profile = await Profile.get();

    let projectsInfo = {
      total: jobs.length,
      done: 0,
      progress: 0,
      totalHours: 0
    };

    let updatedJobs = [];
    
    for (let i = 0; i < jobs.length; i++) {
      updatedJobs[i] = await JobUtils.update(jobs[i]);
    }
    /*
    const updatedJobs = jobs.map(async job => {
      const updatedJob = await JobUtils.update(job);
      return updatedJob;
    });
    */

    updatedJobs.forEach(job => {
      projectsInfo[job.status] += 1;
      job.status === "progress" && (projectsInfo.totalHours += Number(job["daily-hours"]));
    })

    return res.status(200).render('index', {
      jobs: updatedJobs, 
      profile, 
      projectsInfo,
      freeTime: profile["hours-per-day"] - projectsInfo.totalHours
    });
  }
}
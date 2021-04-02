const Profile = require('../models/Profile');
const Job = require('../models/Job');

const JobUtils = require('../utils/JobUtils');

module.exports = { 
  index(req, res) {
    const jobs = Job.get();
    const profile = Profile.get();

    let projectsInfo = {
      total: jobs.length,
      done: 0,
      progress: 0,
      totalHours: 0
    };

    const updatedJobs = jobs.map(job => {
      return JobUtils.update(job);
    });

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
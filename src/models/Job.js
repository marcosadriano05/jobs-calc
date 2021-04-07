const Database = require('../db/config');

module.exports = {
  async get() {
    const db = await Database();

    const jobs = await db.all(`SELECT * FROM jobs`);

    await db.close();

    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at
    }));
  },

  async create(newData) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newData.name}",
      ${newData["daily-hours"]},
      ${newData["total-hours"]},
      ${newData.created_at}
    )`);

    await db.close();
  },

  update(updatedJob, jobId) {
    data = data.map(job => {
      if (job.id === Number(jobId)) {
        return updatedJob;
      }
      return job;
    })
  },

  async delete(id) {
    const db = await Database();

    await db.run(`DELETE FROM jobs WHERE id = ${id}`);

    await db.close();
  }
}
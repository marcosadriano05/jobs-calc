function daysToComplete(job) {
  // Total de dias para realizar o trabalho
  const remainigDays = (job["total-hours"] / job["daily-hours"]).toFixed();
  
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
  const leftDays = Math.ceil(timeDiff / dayInMs);

  return leftDays;
}

function update(job, profile) {
  // Dias que restam para a conclusão do job
  const remainingDays = daysToComplete(job);
  
  // Atualizando status do job
  const status = remainingDays < 0 ? "done" : "progress";

  // Custo do projeto
  const budget = profile["value-hour"] * job["total-hours"];

  return {
    ...job,
    remainingDays,
    status,
    budget
  };
}

function freeTime(profile, jobs) {
  return profile["hours-per-day"] - jobs
  .filter(job => job.status === "progress")
  .reduce((sum, current) => {
  return sum + current["daily-hours"];
}, 0)
}

module.exports = {
  daysToComplete,
  update,
  freeTime
}
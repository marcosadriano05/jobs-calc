let data = [
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

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  },

  delete(id) {
    data = data.filter(job => Number(id) !== job.id);
  }
}
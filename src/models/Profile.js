let data = {
  name: "Marcos",
  avatar: "https://github.com/marcosadriano05.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 30
};

module.exports = {
  get() {
    return data;
  },

  update(newData) {
    data = newData;
  }
}
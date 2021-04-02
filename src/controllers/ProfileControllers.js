const Profile = require('../models/Profile')

module.exports = {
  profilePage(req, res) {
    return res.status(200).render('profile', { profile: Profile.get() });
  },

  updateProfile(req, res) {
    const data = req.body;

    // Número de semanas no ano
    const weeksPerYear = 52;

    // Remover semanas de férias do ano e saber as semans de trabalho por mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

    // Total de horas de trabalho na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    // Horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    });

    return res.status(200).redirect('/profile');
  }
}
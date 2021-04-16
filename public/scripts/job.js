const themeState = localStorage.getItem('theme')

if (themeState) {
  document.querySelector(":root").classList.add("dark-theme")
} else {
  document.querySelector(":root").classList.remove("dark-theme")
}

const dailyHours = document.getElementById("daily-hours")
const message = document.querySelector(".message")
const submitJobButton = document.getElementById("submit-job")
const freeTime = Number(dailyHours.getAttribute("data-freetime"))
const currentHourDay = Number(dailyHours.value)

dailyHours.addEventListener("input", e => {
  e.preventDefault()
  const inputValue = Number(e.target.value)
  if (inputValue > freeTime + currentHourDay) {
    message.classList.add("alert")
    message.textContent = `Você ultrapassou ${Math.abs(freeTime + currentHourDay - inputValue)}h do seu tempo livre`
    submitJobButton.setAttribute("disabled", true)
    submitJobButton.style.cursor = "not-allowed"
  } else {
    message.classList.remove("alert")
    message.textContent = `Você tem ${Math.abs(freeTime + currentHourDay - inputValue)}h livres`
    submitJobButton.removeAttribute("disabled")
    submitJobButton.style.cursor = "pointer"
  }
})
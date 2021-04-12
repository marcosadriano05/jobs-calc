import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelector('#delete-job')

for (let card of cards) {
  const cardId = card.dataset.id

  const deleteButton = card.querySelector('button.delete')
  deleteButton.onclick = () => {
    modal.open()
    deleteForm.setAttribute('action', '/job/delete/' + cardId)
  }
}

const theme = document.getElementById('theme')

const themeState = localStorage.getItem('theme')

if (themeState !== null) {
  changeThemeIcon()
  theme.setAttribute('checked', themeState)
  if (themeState) {
    document.querySelector(":root").classList.add("dark-theme")
  } else {
    document.querySelector(":root").classList.remove("dark-theme")
  }
}

theme.addEventListener('change', (e) => handleOption(e))

function handleOption(e) {
  localStorage.setItem('theme', e.target.checked)
  if (e.target.checked) {
    document.querySelector(":root").classList.add("dark-theme")
  } else {
    localStorage.removeItem('theme')
    document.querySelector(":root").classList.remove("dark-theme")
  }
  changeThemeIcon()
}

function changeThemeIcon() {
  const themeState = localStorage.getItem('theme')
  const icon = document.getElementById("icon-theme")
  if (themeState) {
    icon.removeAttribute("src")
    icon.setAttribute("src", "/images/sun-solid.svg")
  } else {
    icon.removeAttribute("src")
    icon.setAttribute("src", "/images/moon-solid.svg")
  }
}
import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

document
  .querySelector('.open-modal')
  .addEventListener('click', modal.open)

const themeState = localStorage.getItem('theme')

if (themeState) {
  document.querySelector(":root").classList.add("dark-theme")
} else {
  document.querySelector(":root").classList.remove("dark-theme")
}

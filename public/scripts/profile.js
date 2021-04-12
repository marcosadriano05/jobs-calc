const themeState = localStorage.getItem('theme')

if (themeState) {
  document.querySelector(":root").classList.add("dark-theme")
} else {
  document.querySelector(":root").classList.remove("dark-theme")
}
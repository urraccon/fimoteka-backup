document.addEventListener('DOMContentLoaded', () => {
  const toSearchFormButton = document.querySelector('.to-search-form');
  toSearchFormButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkModeToggle'),
    bodySection = document.querySelector('body');
  const mainSection = document.querySelector('main');

  darkModeToggle.addEventListener('click', () => {
    toggleDarkMode();
  });

  function toggleDarkMode() {
    bodySection.classList.toggle('dark-mode');
    mainSection.classList.toggle('dark-mode');

    const isDarkMode = mainSection.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  }
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    toggleDarkMode();
  }
});

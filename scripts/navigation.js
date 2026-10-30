// Responsive navigation toggle
const menuButton = document.querySelector('#menu-button');
const navElement = document.querySelector('#nav-menu');

if (menuButton && navElement) {
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    navElement.classList.toggle('open');
    const isExpanded = menuButton.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    menuButton.textContent = isExpanded ? '✕' : '☰';
  });

  // Close when a link inside nav is clicked
  navElement.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuButton.classList.contains('open')) {
        menuButton.classList.remove('open');
        navElement.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
      }
    });
  });
}

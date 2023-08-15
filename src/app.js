// Get elements
const loader = document.getElementById('loader-wrapper');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const mobileMenu = document.getElementById('mobile-menu');


window.addEventListener('load', () => {
  if (loader) {
    loader.remove();
  }
});

if (mobileMenuTrigger) {
  mobileMenuTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle('is-open');
  });
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
}

const nunjucks = require('nunjucks');

// Configurer l'environnement Nunjucks
const env = nunjucks.configure({
  // ... autres options de configuration ...
});

// Enregistrer la macro SvgIcon
env.addGlobal('SvgIcon', (iconName, width, height) => {
  return env.renderString(macro_SvgIcon, { iconName, width, height });
});

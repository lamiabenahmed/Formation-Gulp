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


document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1920: {
        slidesPerView: 3, // 3 slides per view from 1920px down to 769px
      },
      768: {
        slidesPerView: 2, // 2 slides per view on tablet (768px)
      },
      600: {
        slidesPerView: 1, // 1 slide per view on mobile (576px)
      },
      360: {
        slidesPerView: 1, // 1 slide per view on screens narrower than 360px
      }
    }
  });
});


const goToTopButton = document.getElementById('goToTopButton');

// Afficher ou masquer le bouton en fonction du défilement
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    goToTopButton.style.display = 'block';
  } else {
    goToTopButton.style.display = 'none';
  }
});

// Faire défiler la page vers le haut lorsque le bouton est cliqué
goToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

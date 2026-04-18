// NAVBAR SCROLL
// ═══════════════════════════════════════════
//  CAFE LOTTLE — JavaScript
// ═══════════════════════════════════════════

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
let dark = false;
themeToggle.addEventListener('click', () => {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? '☀️' : '🌙';
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  scrollTopBtn.classList.toggle('visible', y > 400);
  updateActiveNav();
});

// ── ACTIVE NAV LINK ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const y = window.scrollY + 100;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + s.id);
      });
    }
  });
}

// ── HAMBURGER / MOBILE NAV ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMobile() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

// ── MENU TABS ──
function switchTab(tab) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  const panel = document.getElementById('panel-' + tab);
  if (panel) panel.classList.add('active');

  const emojiMap = { drinks: '☕', snacks: '🥨', shakes: '🥤', biryani: '🍛' };
  document.querySelectorAll('.menu-tab').forEach(t => {
    if (t.textContent.includes(emojiMap[tab])) {
      t.classList.add('active');
      t.setAttribute('aria-selected', 'true');
    }
  });
}

// ── GALLERY SLIDER ──
let currentSlide = 0;
const totalSlides = 2;

function slideGallery(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(n) {
  currentSlide = n;
  updateSlider();
}

function updateSlider() {
  document.getElementById('gallerySlider').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
    d.setAttribute('aria-selected', i === currentSlide);
  });
}

// Auto-advance gallery every 5 seconds
setInterval(() => slideGallery(1), 5000);

// ── LIGHTBOX ──
function openLightbox(emoji) {
  document.getElementById('lightboxEmoji').textContent = emoji;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ── CONTACT FORM ──
function submitForm() {
  const name    = document.getElementById('formName').value.trim();
  const contact = document.getElementById('formContact').value.trim();

  if (!name || !contact) {
    alert('Please fill in your name and contact info.');
    return;
  }

  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('formName').value    = '';
  document.getElementById('formContact').value = '';
  document.getElementById('formMsg').value     = '';

  setTimeout(() => {
    document.getElementById('formSuccess').style.display = 'none';
  }, 4000);
}
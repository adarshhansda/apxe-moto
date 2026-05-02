/* APEX MOTO — HOME INTERACTIVITY */

/* —— Loader —— */
(function () {
  const loader = document.getElementById('loader');
  const pct = document.getElementById('loader-pct');
  let p = 0;
  const interval = setInterval(() => {
    p = Math.min(p + Math.random() * 18, 99);
    pct.textContent = 'LOADING... ' + Math.round(p) + '%';
  }, 120);
  window.addEventListener('load', () => {
    clearInterval(interval);
    pct.textContent = 'LOADING... 100%';
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Fallback
  setTimeout(() => loader.classList.add('hidden'), 2500);
})();

/* —— Custom cursor —— */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
});

function animRing() {
  rx += (cx - rx) * 0.14;
  ry += (cy - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

/* —— Progress bar & back to top —— */
const progressBar = document.getElementById('progress-bar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${docH > 0 ? scrolled / docH : 0})`;
  backTop.classList.toggle('visible', scrolled > 400);
});

/* —— Mobile menu —— */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* —— Reveal animations —— */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* —— Testimonial slider —— */
const slides = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentSlide = 0;

function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Auto slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 6000);
}
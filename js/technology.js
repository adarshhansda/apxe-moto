    /* â”€â”€ Loader â”€â”€ */
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
      setTimeout(() => loader.classList.add('hidden'), 2200);
    })();

    /* â”€â”€ Custom cursor â”€â”€ */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let cx = 0, cy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; });
    function animRing() { rx += (cx - rx) * 0.14; ry += (cy - ry) * 0.14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
    animRing();

    /* â”€â”€ Progress bar & back to top â”€â”€ */
    const progressBar = document.getElementById('progress-bar');
    const backTop = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${docH > 0 ? scrolled / docH : 0})`;
      backTop.classList.toggle('visible', scrolled > 400);
    });

    /* â”€â”€ Mobile menu â”€â”€ */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });

    /* â”€â”€ Spec bar animation â”€â”€ */
    const specObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const fills = e.target.querySelectorAll('.spec-fill');
          fills.forEach(bar => {
            bar.classList.add('in');
            bar.style.transform = `scaleX(${bar.dataset.width})`;
          });
          specObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    const specBars = document.querySelector('.spec-bars');
    if (specBars) specObserver.observe(specBars);

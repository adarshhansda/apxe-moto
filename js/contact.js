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

    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let cx = 0, cy = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; });
    function animRing() { rx += (cx - rx) * 0.14; ry += (cy - ry) * 0.14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
    animRing();

    const progressBar = document.getElementById('progress-bar');
    const backTop = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${docH > 0 ? scrolled / docH : 0})`;
      backTop.classList.toggle('visible', scrolled > 400);
    });

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });

    async function handleContactSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const submitBtn = form.querySelector('.btn-submit');
      const originalBtnText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.style.display = 'none';
          document.getElementById('formSuccess').classList.add('show');
          setTimeout(() => {
            form.style.display = 'block';
            document.getElementById('formSuccess').classList.remove('show');
            form.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
          }, 4000);
        } else {
          alert('Something went wrong. Please try again.');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error sending your message.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    }

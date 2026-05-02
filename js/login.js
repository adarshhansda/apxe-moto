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

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });

    function togglePassword(inputId, btn) {
      const input = document.getElementById(inputId);
      if (input.type === 'password') { input.type = 'text'; btn.textContent = 'Hide'; }
      else { input.type = 'password'; btn.textContent = 'Show'; }
    }

    function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const errorMsg = document.getElementById('errorMessage');

      if (email && password.length >= 6) {
        errorMsg.classList.remove('show');
        alert('ðŸ” Demo Mode: Login successful!\nWelcome back, ' + email + '!\n\nThis is a demo website. No real authentication is performed.');
        window.location.href = 'index.html';
      } else {
        errorMsg.classList.add('show');
        if (password.length < 6) {
          errorMsg.textContent = 'Password must be at least 6 characters.';
        }
      }
    }

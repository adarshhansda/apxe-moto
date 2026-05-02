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

    function checkPasswordStrength() {
      const password = document.getElementById('signup-password').value;
      const bars = [
        document.getElementById('strength1'),
        document.getElementById('strength2'),
        document.getElementById('strength3'),
        document.getElementById('strength4')
      ];
      const strengthText = document.getElementById('strengthText');

      bars.forEach(bar => { bar.className = 'strength-bar'; });

      let strength = 0;
      if (password.length >= 6) strength++;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
      if (/[0-9]/.test(password) || /[!@#$%^&*]/.test(password)) strength++;

      const levels = ['weak', 'weak', 'medium', 'strong'];

      for (let i = 0; i < strength; i++) {
        bars[i].classList.add(levels[strength - 1]);
      }

      if (strength === 0) strengthText.textContent = 'Password strength';
      else if (strength <= 2) strengthText.textContent = 'Weak password';
      else if (strength === 3) strengthText.textContent = 'Medium password';
      else strengthText.textContent = 'Strong password!';
    }

    function handleSignup(e) {
      e.preventDefault();
      const firstName = document.getElementById('signup-first').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const errorMsg = document.getElementById('errorMessage');

      errorMsg.classList.remove('show');

      if (password !== confirm) {
        errorMsg.textContent = 'âŒ Passwords do not match. Please try again.';
        errorMsg.classList.add('show');
        return;
      }

      if (password.length < 8) {
        errorMsg.textContent = 'âŒ Password must be at least 8 characters.';
        errorMsg.classList.add('show');
        return;
      }

      alert('ðŸ“ Demo Mode: Account created!\nWelcome to APEX MOTO, ' + firstName + '!\n\nThis is a demo website. No real account is created.');
      window.location.href = 'index.html';
    }

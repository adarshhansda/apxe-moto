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

    /* â”€â”€ Product filter â”€â”€ */
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.product-card').forEach(card => {
          const show = filter === 'all' || card.dataset.cat === filter;
          card.style.opacity = show ? '1' : '0.25';
          card.style.pointerEvents = show ? 'auto' : 'none';
        });
      });
    });

    /* â”€â”€ Cart system â”€â”€ */
    let cart = JSON.parse(localStorage.getItem('apexCart') || '[]');

    function saveCart() { localStorage.setItem('apexCart', JSON.stringify(cart)); updateCartBtn(); }

    function updateCartBtn() {
      const total = cart.reduce((s, i) => s + i.qty, 0);
      const btn = document.getElementById('cartBtn');
      if (btn) btn.textContent = total > 0 ? 'Cart (' + total + ')' : 'Cart (0)';
    }

    function updateQty(btn, delta) {
      const input = btn.parentElement.querySelector('.qty-input');
      let val = parseInt(input.value) + delta;
      if (val < 1) val = 1;
      input.value = val;
    }

    function addToCart(btn, name, price) {
      const qty = parseInt(btn.parentElement.querySelector('.qty-input').value);
      const feedback = btn.parentElement.querySelector('.cart-feedback');
      btn.textContent = 'Adding...';
      btn.classList.add('added');
      const existing = cart.find(item => item.name === name);
      if (existing) { existing.qty += qty; } else { cart.push({ name, price, qty }); }
      saveCart();
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 2000);
      }, 600);
    }

    updateCartBtn();

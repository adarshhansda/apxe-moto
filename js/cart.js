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
  setTimeout(() => loader.classList.add('hidden'), 2200);
})();

/* —— Custom cursor —— */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px'; });
  function animRing() { rx += (cx - rx) * 0.14; ry += (cy - ry) * 0.14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
  animRing();
}

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
hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); });
});

/* —— PRODUCT IMAGE MAPPING —— */
const productImages = {
  'APEX X-1 Pro': 'images/p1.png',
  'GT Tourer S': 'images/p2.png',
  'Enduro MX-7': 'images/p3.png',
  'X-2R Track': 'images/p4.png',
  'ADV Explore': 'images/p5.png',
  'MX Pro Lite': 'images/p6.png'
};

/* —— Currency Formatter —— */
function formatRupees(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

/* —— Cart System —— */

let cart = JSON.parse(localStorage.getItem('apexCart') || '[]');

function saveCart() { localStorage.setItem('apexCart', JSON.stringify(cart)); updateCartUI(); }

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const btn = document.getElementById('cartBtn');
  if (btn) btn.textContent = total > 0 ? 'Cart (' + total + ')' : 'Cart (0)';
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');

  if (!cartItems || !cartEmpty || !cartSummary) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  }

  cartEmpty.style.display = 'none';
  cartSummary.style.display = 'block';

  let subtotal = 0;
  cartItems.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    // Get product image – first check if stored in item, else use mapping
    let imgSrc = item.image || productImages[item.name] || '';
    const imgHTML = imgSrc
      ? `<img src="${imgSrc}" alt="${item.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='🪖'">`
      : '🪖';

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          ${imgHTML}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-model">Unit Price: ${formatRupees(item.price)}</div>
          <div class="cart-item-qty">
            <button onclick="updateCartQty(${index}, -1)">−</button>
            <input type="text" value="${item.qty}" readonly>
            <button onclick="updateCartQty(${index}, 1)">+</button>
          </div>
        </div>
        <div class="cart-item-price">${formatRupees(itemTotal)}</div>
        <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Remove item">✕</button>
      </div>
    `;
  }).join('');

  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal >= 200 ? 0 : 15;

  document.getElementById('cartSubtotal').textContent = formatRupees(subtotal);
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : formatRupees(shipping);
  document.getElementById('cartTax').textContent = formatRupees(tax);
  document.getElementById('cartTotal').textContent = formatRupees(subtotal + tax + shipping);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const btn = document.getElementById('cartBtn');
  if (btn) btn.textContent = 'Cart (' + totalItems + ')';
}

function updateCartQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty < 1) {
    cart.splice(index, 1);
  }
  saveCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function applyPromo() {
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  if (code === 'APEX10') {
    alert('✅ Promo code APEX10 applied! 10% discount added.');
    document.getElementById('promoInput').value = '';
  } else if (code === 'FREESHIP') {
    alert('✅ Free shipping applied!');
    document.getElementById('promoInput').value = '';
  } else if (code === '') {
    alert('Please enter a promo code.');
  } else {
    alert('❌ Invalid promo code. Try APEX10 or FREESHIP.');
  }
}

function handleCheckout() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(total * 0.08);
  const shipping = total >= 200 ? 0 : 15;
  const grandTotal = total + tax + shipping;

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('🛒 Demo Mode: Order Placed!\n\nItems: ' + cart.reduce((s, i) => s + i.qty, 0) + '\nTotal: ' + formatRupees(grandTotal) + '\n\nThank you for shopping with APEX MOTO!\n\nThis is a demo website. No real order is placed.');
  cart = [];
  saveCart();
}

// Auto-update on page load
updateCartUI();

// Also update products.html ke cart button ko sync karne ke liye
window.addEventListener('storage', (e) => {
  if (e.key === 'apexCart') {
    cart = JSON.parse(e.newValue || '[]');
    updateCartUI();
  }
});

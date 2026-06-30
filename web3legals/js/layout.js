// ============================================
// Web3Legals - Shared Layout (Nav + Footer)
// ============================================

function injectLayout() {
  const path = window.location.pathname;
  const isRoot = path === '/' || path.endsWith('index.html');
  const prefix = isRoot ? '' : (path.split('/').length > 2 ? '../' : '');

  // ─── NAVBAR ───
  const navHTML = `
  <nav class="navbar">
    <div class="inner">
      <a href="${prefix}index.html" class="nav-logo">
        <div class="logo-box">W3L</div>
        Web3<span>Legals</span>
      </a>
      <ul class="nav-links">
        <li><a href="${prefix}index.html">Home</a></li>
        <li><a href="${prefix}pages/services.html">Services</a></li>
        <li><a href="${prefix}pages/about.html">About</a></li>
        <li class="dropdown">
          <a href="#">Resources ▾</a>
          <div class="dropdown-menu">
            <a href="${prefix}pages/blog.html">📝 Blog</a>
            <a href="${prefix}pages/research.html">🔬 Research</a>
            <a href="${prefix}pages/crypto-countries.html">🌍 Crypto-Friendly Countries</a>
          </div>
        </li>
        <li><a href="${prefix}pages/compliance.html">Compliance</a></li>
        <li><a href="${prefix}pages/contact.html" class="nav-cta">Consult Now</a></li>
      </ul>
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-nav" id="mobileNav">
    <a href="${prefix}index.html">Home</a>
    <a href="${prefix}pages/services.html">Services</a>
    <a href="${prefix}pages/about.html">About</a>
    <a href="${prefix}pages/blog.html" class="mobile-sub">↳ Blog</a>
    <a href="${prefix}pages/research.html" class="mobile-sub">↳ Research</a>
    <a href="${prefix}pages/crypto-countries.html" class="mobile-sub">↳ Crypto Countries</a>
    <a href="${prefix}pages/compliance.html">Compliance Law</a>
    <a href="${prefix}pages/contact.html">Contact</a>
  </div>`;

  // ─── FOOTER ───
  const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${prefix}index.html" class="nav-logo" style="display:inline-flex;margin-bottom:0.5rem">
            <div class="logo-box">W3L</div>
            Web3<span>Legals</span>
          </a>
          <p>Premier legal counsel for Web3 businesses. Navigating crypto regulation, compliance & blockchain law across 20+ jurisdictions worldwide.</p>
          <div class="social-links">
            <a href="https://t.me/Parikrahul" target="_blank" class="social-link" title="Telegram">✈</a>
            <a href="mailto:web3legal@gmail.com" class="social-link" title="Email">✉</a>
            <a href="https://rahulpareek.in" target="_blank" class="social-link" title="Founder">🔗</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="${prefix}pages/services.html#token">Token Legal Counsel</a></li>
            <li><a href="${prefix}pages/services.html#exchange">Exchange Licensing</a></li>
            <li><a href="${prefix}pages/services.html#dao">DAO Structuring</a></li>
            <li><a href="${prefix}pages/services.html#defi">DeFi Compliance</a></li>
            <li><a href="${prefix}pages/services.html#nft">NFT & IP Law</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="${prefix}pages/blog.html">Blog Articles</a></li>
            <li><a href="${prefix}pages/research.html">Research Papers</a></li>
            <li><a href="${prefix}pages/crypto-countries.html">Crypto Countries</a></li>
            <li><a href="${prefix}pages/compliance.html">Compliance Hub</a></li>
            <li><a href="${prefix}pages/resources.html">Web3Legals PDF Library</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:+919664277114">+91 96642 77114</a></li>
            <li><a href="https://t.me/Parikrahul" target="_blank">@Parikrahul</a></li>
            <li><a href="mailto:web3legal@gmail.com">web3legal@gmail.com</a></li>
            <li><a href="${prefix}pages/about.html">About Rahul Pareek</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 Web3Legals. All rights reserved. | Founder: <a href="https://rahulpareek.in" target="_blank">Rahul Pareek</a></p>
        <p>Legal counsel for the decentralised world 🌐</p>
      </div>
    </div>
  </footer>`;

  // Inject
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ─── HAMBURGER TOGGLE ───
  const btn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  btn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // ─── ACTIVE NAV LINK ───
  const links = document.querySelectorAll('.nav-links a, .mobile-nav a');
  links.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
}

// ─── FADE-IN OBSERVER ───
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ─── TOAST ───
function showToast(msg, type = 'success') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'toast' + (type === 'error' ? ' error' : '');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initFadeIn();
});

/* =========================================================
   Hey Girl Hey — Site JS
   - Quick Exit (button + double-ESC)
   - Mobile nav toggle
   - Contact form placeholder handler
   - Footer year
   ========================================================= */
(function () {
  'use strict';

  // ---------- Quick Exit ----------
  // Replaces the current history entry so Back does not return here,
  // and opens a neutral site. Change EXIT_URL if desired.
  var EXIT_URL = 'https://www.weather.com';

  function quickExit() {
    try {
      // Open a neutral page in a new tab to bury this one.
      window.open(EXIT_URL, '_blank', 'noopener');
    } catch (e) { /* ignore */ }
    // Replace this tab's current entry so it is not in Back history.
    window.location.replace(EXIT_URL);
  }

  var exitBtn = document.getElementById('quick-exit');
  if (exitBtn) exitBtn.addEventListener('click', quickExit);

  // Double-tap ESC within 1.5s to exit.
  var lastEsc = 0;
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var now = Date.now();
      if (now - lastEsc < 1500) quickExit();
      lastEsc = now;
    }
  });

  // ---------- Mobile nav ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Contact form (placeholder) ----------
  // TODO: Replace with Formspree / Netlify Forms / Supabase function.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in all fields.';
        return;
      }
      status.textContent = 'Thank you. This form is not yet connected. Please email us directly for now.';
      form.reset();
    });
  }

  // ---------- Donate (placeholder) ----------
  // TODO: Replace with Stripe Payment Link. e.g. https://donate.stripe.com/xxxx
  document.querySelectorAll('[data-donate]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (btn.getAttribute('href') === '#donate') {
        e.preventDefault();
        alert('Donations coming soon. Thank you for your support!');
      }
    });
  });

  // ---------- Footer year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============================================================
   LUMO CANDLES — Homepage JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById('header');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const successMsg = document.getElementById('newsletterSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        successMsg.style.color = '#c0392b';
        successMsg.textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return;
      }

      // Simulate submission
      const btn = form.querySelector('.newsletter__btn');
      btn.textContent = 'Subscribing…';
      btn.disabled = true;

      setTimeout(() => {
        successMsg.style.color = '';
        successMsg.textContent = 'You\'re in! Welcome to the Lumo community.';
        emailInput.value = '';
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }, 900);
    });
  }

  /* ---------- Quick-add cart feedback ---------- */
  const cartCount = document.querySelector('.cart-count');
  let count = 0;

  document.querySelectorAll('.product-card__quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      count++;
      cartCount.textContent = count;

      // Brief visual pulse on cart icon
      cartCount.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
        { duration: 300, easing: 'ease-out' }
      );

      const original = btn.textContent;
      btn.textContent = '✓ Added';
      setTimeout(() => { btn.textContent = original; }, 1200);
    });
  });

  /* ---------- Scroll-reveal animation ---------- */
  const revealEls = document.querySelectorAll(
    '.product-card, .values__item, .story__content, .story__media, .newsletter__inner'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * 60}ms`);
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealEls.forEach(el => el.classList.add('revealed'));
  }

})();

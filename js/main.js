/* ============================================================
   LABC — main.js  v2.0  (Production Complete)
   All interactive features for the full website
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1.  PAGE LOADER
───────────────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  function hide() {
    loader.classList.add('hidden');
    triggerHeroAnimations();
    initScrollReveal(); // start watching after load
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 900);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 900));
  }
  // Hard fallback
  setTimeout(() => loader.classList.add('hidden'), 3200);
})();

function triggerHeroAnimations() {
  document.querySelectorAll('.hero-animate').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 140);
  });
}

/* ─────────────────────────────────────────────────────────────
   2.  SCROLL PROGRESS BAR
───────────────────────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  function update() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ─────────────────────────────────────────────────────────────
   3.  STICKY NAVBAR
───────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

(function initNavbar() {
  if (!navbar) return;

  function tick() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();

  // Highlight active link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   4.  MOBILE MENU
───────────────────────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn   = document.querySelector('.mobile-menu-close');
  if (!hamburger || !mobileMenu) return;

  function open() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function close() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ─────────────────────────────────────────────────────────────
   5.  SCROLL REVEAL (custom AOS replacement)
───────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.getAttribute('data-delay') || 0, 10);
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────────────────────
   6.  ANIMATED COUNTERS
───────────────────────────────────────────────────────────── */
(function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  if (!els.length) return;

  function run(el) {
    const target   = parseFloat(el.getAttribute('data-target') || '0');
    const suffix   = el.getAttribute('data-suffix') || '';
    const isFloat  = target % 1 !== 0;
    const duration = 2000;
    const t0       = performance.now();

    (function tick(now) {
      const p   = Math.min((now - t0) / duration, 1);
      const val = (1 - Math.pow(2, -10 * p)) * target;
      el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    })(performance.now());
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      run(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
})();

/* ─────────────────────────────────────────────────────────────
   7.  BACK TO TOP
───────────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ─────────────────────────────────────────────────────────────
   8.  SMOOTH ANCHOR SCROLLING
───────────────────────────────────────────────────────────── */
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id  = a.getAttribute('href');
      if (id === '#') return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      const offset = (navbar?.offsetHeight || 80) + 16;
      window.scrollTo({
        top: tgt.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
})();

/* ─────────────────────────────────────────────────────────────
   9.  HERO PARALLAX (mouse / gyro)
───────────────────────────────────────────────────────────── */
(function initParallax() {
  const blobs = document.querySelectorAll('.hero-blob');
  if (!blobs.length) return;

  // Mouse parallax (desktop)
  if (!window.matchMedia('(pointer:coarse)').matches) {
    window.addEventListener('mousemove', e => {
      const cx = (e.clientX / window.innerWidth  - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      blobs.forEach((b, i) => {
        const f = (i + 1) * 22;
        b.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
      });
    }, { passive: true });
  }

  // Gyro fallback (mobile)
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      const cx = ((e.gamma || 0) / 45);
      const cy = ((e.beta  || 0) / 90);
      blobs.forEach((b, i) => {
        const f = (i + 1) * 10;
        b.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
      });
    }, { passive: true });
  }
})();

/* ─────────────────────────────────────────────────────────────
   10. TYPED TEXT EFFECT
───────────────────────────────────────────────────────────── */
(function initTyped() {
  const el = document.querySelector('.typed-text');
  if (!el) return;
  const words = (el.getAttribute('data-words') || '').split(',').map(w => w.trim()).filter(Boolean);
  if (!words.length) return;

  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = word.substring(0, deleting ? ci-- : ++ci);

    if (!deleting && ci > word.length)   { deleting = true; return setTimeout(tick, 2000); }
    if (deleting  && ci < 0)             { deleting = false; wi = (wi + 1) % words.length; return setTimeout(tick, 400); }
    setTimeout(tick, deleting ? 50 : 90);
  }
  tick();
})();

/* ─────────────────────────────────────────────────────────────
   11. PORTFOLIO CATEGORY FILTER
───────────────────────────────────────────────────────────── */
(function initPortfolioFilter() {
  const btns  = document.querySelectorAll('.portfolio-filters .filter-btn');
  const items = document.querySelectorAll('[data-category]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';

      items.forEach(item => {
        const match = cat === 'all' || item.getAttribute('data-category') === cat;
        if (match) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px) scale(0.95)';
          setTimeout(() => { if (item.style.opacity === '0') item.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

/* ─────────────────────────────────────────────────────────────
   12. PORTFOLIO MODAL
───────────────────────────────────────────────────────────── */
(function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  if (!modal) return;

  const img   = modal.querySelector('.modal-img');
  const title = modal.querySelector('.modal-title');
  const cat   = modal.querySelector('.modal-cat');
  const desc  = modal.querySelector('.modal-desc');
  const close = modal.querySelector('.modal-close');

  document.querySelectorAll('.portfolio-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      let d;
      try { d = JSON.parse(card.getAttribute('data-modal')); } catch { return; }
      if (img)   { img.src = d.img || ''; img.alt = d.title || ''; }
      if (title)  title.textContent = d.title    || '';
      if (cat)    cat.textContent   = d.category || '';
      if (desc)   desc.innerHTML    = d.desc     || '';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      close?.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  close?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
})();

/* ─────────────────────────────────────────────────────────────
   13. GALLERY LIGHTBOX
───────────────────────────────────────────────────────────── */
(function initLightbox() {
  const lb  = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg     = lb.querySelector('.lightbox-img');
  const lbCap     = lb.querySelector('.lightbox-caption');
  const lbCounter = document.getElementById('lightbox-counter');
  const closBtn   = lb.querySelector('.lightbox-close');
  const prevBtn   = lb.querySelector('.lightbox-prev');
  const nextBtn   = lb.querySelector('.lightbox-next');

  let current = 0;

  function getVisible() {
    return [...document.querySelectorAll('.gallery-item[data-src]')]
      .filter(el => getComputedStyle(el).display !== 'none');
  }

  function show(idx) {
    const list = getVisible();
    current = (idx + list.length) % list.length;
    const item = list[current];
    if (!item || !lbImg) return;

    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src         = item.getAttribute('data-src') || '';
      lbImg.alt         = item.querySelector('img')?.alt || '';
      lbImg.style.opacity = '1';
      if (lbCap)     lbCap.textContent     = item.getAttribute('data-caption') || '';
      if (lbCounter) lbCounter.textContent = `${current + 1} / ${list.length}`;
    }, 180);
  }

  function open(idx) {
    show(idx);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    closBtn?.focus();
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item[data-src]').forEach((item, i) => {
    item.addEventListener('click', () => {
      const list = getVisible();
      const vi   = list.indexOf(item);
      open(vi >= 0 ? vi : i);
    });
  });

  closBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(current - 1));
  nextBtn?.addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });

  // Touch swipe
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) show(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────────────────
   14. SUBTLE CARD 3-D TILT (desktop only)
───────────────────────────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(pointer:coarse)').matches) return;

  document.querySelectorAll('.service-card, .testimonial-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ─────────────────────────────────────────────────────────────
   15. PROGRESS BARS (clients page rating bars)
───────────────────────────────────────────────────────────── */
(function initProgressBars() {
  const bars = document.querySelectorAll('[data-progress]');
  if (!bars.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const pct = e.target.getAttribute('data-progress') || '0';
      e.target.style.transition = 'width 1.4s cubic-bezier(.4,0,.2,1)';
      e.target.style.width = pct + '%';
      io.unobserve(e.target);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => { b.style.width = '0'; io.observe(b); });
})();

/* ─────────────────────────────────────────────────────────────
   16. FAQ ACCORDION
───────────────────────────────────────────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q || !a) return;

    q.setAttribute('role', 'button');
    q.setAttribute('tabindex', '0');

    function toggle() {
      const open = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-answer')?.classList.remove('open');
      });
      if (!open) {
        item.classList.add('open');
        a.classList.add('open');
      }
    }

    q.addEventListener('click', toggle);
    q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
})();

/* ─────────────────────────────────────────────────────────────
   17. LAZY IMAGE FADE-IN
───────────────────────────────────────────────────────────── */
(function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length) return;

  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   18. TESTIMONIAL AUTO-CAROUSEL (homepage only)
───────────────────────────────────────────────────────────── */
(function initTestimonialCarousel() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return; // only present if explicitly added

  const cards = track.querySelectorAll('.testimonial-card');
  if (cards.length < 2) return;

  let idx = 0;
  const show = () => {
    cards.forEach((c, i) => {
      c.style.display = i === idx ? '' : 'none';
    });
  };

  show();
  setInterval(() => {
    idx = (idx + 1) % cards.length;
    show();
  }, 5000);
})();

/* ─────────────────────────────────────────────────────────────
   19. NOTIFICATION TOAST (utility, used by contact.js)
───────────────────────────────────────────────────────────── */
window.LABC = window.LABC || {};
window.LABC.toast = function(msg, type = 'success', duration = 5000) {
  const existing = document.getElementById('labc-toast');
  existing?.remove();

  const t = document.createElement('div');
  t.id = 'labc-toast';
  t.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${msg}</span>`;
  Object.assign(t.style, {
    position: 'fixed', bottom: '32px', left: '50%',
    transform: 'translateX(-50%) translateY(20px)',
    background: type === 'success' ? '#065F46' : '#7F1D1D',
    color: '#fff', padding: '14px 24px',
    borderRadius: '12px', fontSize: '0.88rem', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    zIndex: '99999', transition: 'all 0.35s ease',
    maxWidth: '90vw', textAlign: 'center'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.transform = 'translateX(-50%) translateY(0)';
    t.style.opacity = '1';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 400);
  }, duration);
};

/* ─────────────────────────────────────────────────────────────
   20. INITIALISE HERO ANIMATE STATES (called before loader hides)
───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero-animate').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
  });
  // If loader already hidden (cached page), trigger immediately
  if (!document.getElementById('page-loader') ||
      document.getElementById('page-loader')?.classList.contains('hidden')) {
    triggerHeroAnimations();
    initScrollReveal();
  }
});

/* ===================================================
   CREAR — Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navigation scroll state ---- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });

  /* ---- Back to top ---- */
  document.getElementById('backTop')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Services hover interaction ---- */
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      serviceItems.forEach(i => {
        i.classList.remove('service-item--active');
        i.classList.add('service-item--muted');
      });
      item.classList.remove('service-item--muted');
      item.classList.add('service-item--active');
    });
  });

  /* Reset to first item when leaving the list */
  const servicesList = document.querySelector('.services-list');
  servicesList?.addEventListener('mouseleave', () => {
    serviceItems.forEach((item, i) => {
      item.classList.toggle('service-item--active', i === 0);
      item.classList.toggle('service-item--muted', i !== 0);
    });
  });

  /* ---- Intersection Observer for scroll animations ---- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        /* Stagger cards and process items */
        const delay = entry.target.dataset.delay ?? 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /* Portfolio cards — staggered */
  document.querySelectorAll('.portfolio-card').forEach((el, i) => {
    el.dataset.delay = i * 100;
    observer.observe(el);
  });

  /* Process items — staggered */
  document.querySelectorAll('.process-item').forEach((el, i) => {
    el.dataset.delay = i * 70;
    observer.observe(el);
  });

  /* ---- Smooth anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Testimonial navigation (placeholder) ---- */
  const prevBtn = document.querySelector('.testimonial-btn--prev');
  const nextBtn = document.querySelector('.testimonial-btn--next');
  if (prevBtn && nextBtn) {
    [prevBtn, nextBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        /* Visual feedback only — extend with real testimonial data as needed */
        btn.style.background = 'rgba(220,222,230,0.6)';
        setTimeout(() => btn.style.background = '', 200);
      });
    });
  }

  /* ---- Play button (reel) ---- */
  document.querySelector('.play-btn')?.addEventListener('click', () => {
    /* Extend: open lightbox or swap to <video> */
    alert('Odtwarzanie wideo...');
  });

});

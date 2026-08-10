// Subtle scroll reveal — adds .in-view to elements as they enter viewport
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// Photo gallery: tap-to-toggle for touch devices (desktop keeps :hover)
(function () {
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.hover-item');
    document.querySelectorAll('.hover-item.active').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });
    if (item) item.classList.toggle('active');
  });
})();

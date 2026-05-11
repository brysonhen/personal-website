(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.pill-nav a');

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        document.querySelectorAll('a[href="#' + entry.target.id + '"]').forEach(function (l) {
          l.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(function (s) { observer.observe(s); });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    });
  });

  // Belt-and-suspenders: strip any hash that sneaks through
  window.addEventListener('hashchange', function () {
    history.replaceState(null, '', window.location.pathname);
  });
})();

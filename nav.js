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
})();

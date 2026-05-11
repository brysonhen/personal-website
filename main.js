// Scroll progress bar
(function () {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        bar.style.height = (scrolled / total * 100) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// Hero name parallax — drifts down and fades as you scroll
(function () {
  const heroName = document.querySelector('.hero-name');
  const heroSection = document.querySelector('.hero-section');
  if (!heroName || !heroSection) return;

  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const scrollY = window.scrollY;
        const heroH = heroSection.offsetHeight;

        if (scrollY <= heroH) {
          heroName.style.transform = 'translateY(' + (scrollY * 1.4) + 'px)';
          heroName.style.opacity = Math.max(0, 1 - scrollY / (heroH * 0.6));
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// Section heading parallax — subtle drift as headings pass through viewport
(function () {
  var headings = document.querySelectorAll('section h2');
  if (!headings.length) return;

  headings.forEach(function (h2) { h2.style.willChange = 'transform'; });

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        headings.forEach(function (h2) {
          var rect = h2.getBoundingClientRect();
          var centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
          h2.style.transform = 'translateY(' + (centerOffset * 0.08) + 'px)';
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// Scroll reveal
(function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('revealed', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
    observer.observe(el);
  });
})();

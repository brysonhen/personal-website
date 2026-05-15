(function () {

  // ── GSAP + ScrollTrigger ──
  gsap.registerPlugin(ScrollTrigger);

  // ── Hero entrance — only plays if the page loads at the top ──
  var heroSection = document.querySelector('.hero-section');
  var atTop = heroSection && window.scrollY < heroSection.offsetHeight * 0.5;

  if (atTop) {
    gsap.timeline({ delay: 0.15 })
      .fromTo('.hero-first',  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
      .fromTo('.hero-last',   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' }, '-=0.75')
      .fromTo('.hero-sub',    { opacity: 0 },         { opacity: 1,        duration: 0.7, ease: 'power2.out' }, '-=0.35')
      .fromTo('.hero-scroll', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');

    // Only add scrub when starting at the top — otherwise ScrollTrigger
    // immediately calculates progress and sets hero-name to opacity:0
    gsap.to('.hero-name', {
      y: 160,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3
      }
    });
  } else {
    gsap.set('.hero-name', { opacity: 1, y: 0 });
  }

  // ── Heading clip-path reveals ──
  gsap.utils.toArray('h2.reveal').forEach(function (h2) {
    gsap.set(h2, { opacity: 1 });

    var main = h2.querySelector('.h2-main');
    var ghost = h2.querySelector('.h2-ghost');

    if (main) {
      gsap.set(main, { '--h2-wght': 300 });
      gsap.fromTo(main,
        { clipPath: 'inset(0 100% 0 0)', '--h2-wght': 300 },
        { clipPath: 'inset(0 0% 0 0)', '--h2-wght': 800, duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: h2, start: 'top 85%' } }
      );
    }
    if (ghost) {
      gsap.fromTo(ghost,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: h2, start: 'top 85%' } }
      );
    }
  });

  // ── Section heading parallax scrub ──
  gsap.utils.toArray('section h2').forEach(function (h2) {
    gsap.fromTo(h2,
      { y: 20 },
      { y: -20, ease: 'none',
        scrollTrigger: {
          trigger: h2,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  // ── Fade-up reveals (paragraphs, non-heading elements) ──
  gsap.utils.toArray('.reveal:not(h2):not(.projects-scroll):not(.contact-cards)').forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' } }
    );
  });

  // ── Slide-from-left reveals ──
  gsap.utils.toArray('.reveal-left').forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' } }
    );
  });

  // ── Project cards stagger ──
  if (document.querySelector('.project-card')) {
    gsap.fromTo('.project-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-scroll', start: 'top 82%' } }
    );
  }

  // ── Contact cards stagger ──
  if (document.querySelector('.contact-card')) {
    gsap.fromTo('.contact-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-cards', start: 'top 88%' } }
    );
  }

  // ── Count-up ──
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var triggered = false;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: function () {
        if (triggered) return;
        triggered = true;
        var duration = 1400;
        var start = performance.now();
        function step(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
  });

  // ── Magnetic elements ──
  function makeMagnetic(els, strength, withScale) {
    els.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.style.zIndex = '2';
      });
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = (e.clientX - (rect.left + rect.width  / 2)) * strength;
        var dy = (e.clientY - (rect.top  + rect.height / 2)) * strength;
        gsap.to(el, { x: dx, y: dy, scale: withScale ? 1.08 : 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', function () {
        el.style.zIndex = '';
        gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
      });
    });
  }

  makeMagnetic(document.querySelectorAll('.pill-nav a'), 0.15, true);
  makeMagnetic(document.querySelectorAll('.contact-card'), 0.08, false);

  // ── Dock magnification on project cards ──
  var projectsOuter = document.querySelector('.projects-scroll-outer');
  if (projectsOuter) {
    var dockCards = Array.from(projectsOuter.querySelectorAll('.project-card'));
    var MAX_SCALE = 1.18;
    var FALLOFF = 260;

    projectsOuter.addEventListener('mousemove', function (e) {
      dockCards.forEach(function (card) {
        var rect = card.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top  + rect.height / 2;
        var dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
        var scale = 1 + (MAX_SCALE - 1) * Math.max(0, 1 - dist / FALLOFF);
        gsap.to(card, { scale: scale, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
      });
    });

    projectsOuter.addEventListener('mouseleave', function () {
      dockCards.forEach(function (card) {
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
      });
    });
  }

})();

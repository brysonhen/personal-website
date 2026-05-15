// Hero subtitle typing effect
(function () {
  const el = document.getElementById('hero-typing');
  if (!el) return;

  const phrases = [
    'Computer Science.',
    'Data Science.',
    'Turning ideas into reality.',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    el.textContent = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    let delay = deleting ? 40 : 80;
    if (!deleting && ci === phrase.length) { delay = 2000; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1200);
})();

// Live status strip
(function () {
  var daysEl = document.getElementById('status-days');
  if (!daysEl) return;

  var graduation = new Date('2027-05-10T00:00:00');

  function update() {
    var days = Math.ceil((graduation - new Date()) / 86400000);
    daysEl.textContent = days > 0 ? days : '0';
  }

  update();
  setInterval(update, 60000);
})();

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



(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const darkOrbs = [
    { x: 0.0, y: 0.0, r: 0.50, rgb: [155,  65, 12], speed: 0.00012, phase: 0.0 },
    { x: 1.0, y: 1.0, r: 0.48, rgb: [140,  22, 22], speed: 0.00009, phase: 2.1 },
    { x: 1.0, y: 0.0, r: 0.42, rgb: [130, 100, 12], speed: 0.00010, phase: 4.4 },
    { x: 0.0, y: 1.0, r: 0.44, rgb: [100,  42, 14], speed: 0.00008, phase: 1.2 },
    { x: 0.5, y: 0.0, r: 0.36, rgb: [ 48,  44, 42], speed: 0.00007, phase: 3.3 },
  ];

  const lightOrbs = [
    { x: 0.0, y: 0.0, r: 0.50, rgb: [220, 120, 40], speed: 0.00012, phase: 0.0 },
    { x: 1.0, y: 1.0, r: 0.48, rgb: [200,  60, 60], speed: 0.00009, phase: 2.1 },
    { x: 1.0, y: 0.0, r: 0.42, rgb: [190, 150, 40], speed: 0.00010, phase: 4.4 },
    { x: 0.0, y: 1.0, r: 0.44, rgb: [160,  90, 40], speed: 0.00008, phase: 1.2 },
    { x: 0.5, y: 0.0, r: 0.36, rgb: [140, 130, 120], speed: 0.00007, phase: 3.3 },
  ];

  function draw(ts) {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    const orbs = document.documentElement.dataset.theme === 'light' ? lightOrbs : darkOrbs;

    orbs.forEach(function (orb) {
      const t  = ts * orb.speed + orb.phase;
      const cx = (orb.x + Math.sin(t)        * 0.14) * w;
      const cy = (orb.y + Math.cos(t * 0.73) * 0.11) * h;
      const r  = orb.r * Math.max(w, h);

      const alpha = 0.11 + Math.sin(t * 1.5) * 0.05;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(' + orb.rgb + ',' + alpha + ')');
      g.addColorStop(1, 'rgba(' + orb.rgb + ',0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(draw);
})();

(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const orbs = [
    { x: 0.15, y: 0.2,  r: 0.55, rgb: [249, 115, 22], speed: 0.00007, phase: 0.0 },
    { x: 0.82, y: 0.75, r: 0.50, rgb: [220,  38, 38], speed: 0.00005, phase: 2.1 },
    { x: 0.50, y: 0.45, r: 0.40, rgb: [180,  28, 10], speed: 0.00006, phase: 4.4 },
    { x: 0.75, y: 0.15, r: 0.35, rgb: [249, 115, 22], speed: 0.00004, phase: 1.2 },
  ];

  function draw(ts) {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    orbs.forEach(function (orb) {
      const t  = ts * orb.speed + orb.phase;
      const cx = (orb.x + Math.sin(t)        * 0.14) * w;
      const cy = (orb.y + Math.cos(t * 0.73) * 0.11) * h;
      const r  = orb.r * Math.max(w, h);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(' + orb.rgb + ',0.13)');
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

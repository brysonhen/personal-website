(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 50;
  const MAX_DIST = 120;
  const FPS = 30;
  const INTERVAL = 1000 / FPS;
  let lastTime = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.5 + 0.5;
    this.isOrange = Math.random() > 0.7;
  }

  Particle.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.isOrange ? 'rgba(249,115,22,0.5)' : 'rgba(245,240,232,0.2)';
    ctx.fill();
  };

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }

  function loop(timestamp) {
    requestAnimationFrame(loop);
    if (timestamp - lastTime < INTERVAL) return;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].move();
      particles[i].draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = (1 - d / MAX_DIST) * 0.15;
          ctx.strokeStyle = (particles[i].isOrange || particles[j].isOrange)
            ? 'rgba(249,115,22,' + alpha + ')'
            : 'rgba(245,240,232,' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', function () { resize(); init(); }, { passive: true });
  resize();
  init();
  requestAnimationFrame(loop);
})();

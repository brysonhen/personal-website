(function () {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const icon = btn.querySelector('i');

  const saved = localStorage.getItem('theme') || 'dark';
  root.dataset.theme = saved;
  updateIcon(saved);

  btn.addEventListener('click', function () {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
})();

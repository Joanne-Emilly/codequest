(() => {
  const key = 'codequest-theme';
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem(key); } catch {}
  function apply() {
    const dark = choice === 'dark' || (choice !== 'light' && preference.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#17151c' : '#f63040';
    document.getElementById('theme')?.setAttribute('aria-pressed', String(dark));
  }
  apply();
  preference.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.getElementById('theme').addEventListener('click', () => {
      choice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, choice); } catch {}
      apply();
    });
  });
})();

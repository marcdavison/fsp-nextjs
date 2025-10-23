document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-transition]');
    if (!link || !document.startViewTransition) return;

    const href = link.getAttribute('href');
    const direction = link.dataset.transition;

    e.preventDefault();

    const container = document.getElementById('page-container');
    container.classList.remove('slide-left', 'slide-right');
    container.classList.add(direction === 'forward' ? 'slide-left' : 'slide-right');

    document.startViewTransition(() => {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  });
});
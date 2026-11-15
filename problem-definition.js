// Animate only the Problem Definition questions and cards.
(() => {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('#problem-definition .problem-questions, #problem-definition .problem-cards').forEach((group) => {
    observer.observe(group);
    group.classList.add('is-observed');
  });
})();

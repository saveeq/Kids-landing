document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section-animate');
  const options = {
    threshold: 0.15
  };
  const observer = new window.IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Анимация только один раз
      }
    });
  }, options);
  sections.forEach(section => {
    observer.observe(section);
  });
}); 
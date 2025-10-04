// Animate items on scroll
const items = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.timeline-content').classList.add('visible');
    }
  });
}, { threshold: 0.2 });

items.forEach(item => {
  observer.observe(item);
});

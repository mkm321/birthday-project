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

// ----- Simple Image Carousel Logic -----
const carousels = document.querySelectorAll('.photo-carousel');

carousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const images = track.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const videos = track.querySelectorAll('video');
  const video1 = document.getElementById('video1');
  let index = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    // Disable or enable buttons based on index
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === (images.length + videos.length) - 1;
  };

    //   Previous button click
    prevBtn.addEventListener('click', () => {
    if (index > 0) {
        if (video1) {
          video1.pause();
        }
        index--;
        updateCarousel();
    }
    });

    // Next button click
    nextBtn.addEventListener('click', () => {
    if (index < (images.length + videos.length) - 1) {
        if (video1) {
          video1.pause();
        }
        index++;
        updateCarousel();
    }
    });
});


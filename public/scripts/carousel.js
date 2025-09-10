// CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (!slides || images.length === 0) {
    console.warn('Carousel: elemento .slides mancante o nessuna immagine trovata. Carousel disattivato.');
    return;
  }

  let index = 0;

  function showSlide(i) {
    index = (i + images.length) % images.length;
    const slideWidth = images[0].clientWidth || 300;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));

  if (window.innerWidth >= 320 && window.innerWidth <= 767.98) {
    let startX = 0;
    let endX = 0;

    slides.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });

    function handleSwipe() {
      const diffX = startX - endX;

      // soglia minima per evitare tocchi accidentali
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // swipe verso sinistra
          showSlide(index + 1);
        } else {
          // swipe verso destra
          showSlide(index - 1);
        }
      }
    }
  }
});

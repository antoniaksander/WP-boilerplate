import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.product-carousel-swiper');

  new Swiper(el, {
    modules: [Navigation],
    // Mobile: Show 1 full card and a "peek" of the next card to imply swiping
    slidesPerView: 3,
    spaceBetween: 16,
    // loop: true,
    navigation: {
      nextEl: el.querySelector('.carousel-btn-next'),
      prevEl: el.querySelector('.carousel-btn-prev'),
    },
    breakpoints: {
      // Tablet: 3 cards side-by-side
      768: { slidesPerView: 3, spaceBetween: 24 },
      // Desktop: 4 cards side-by-side
      1024: { slidesPerView: 4, spaceBetween: 32 },
    },
  });
});

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.product-carousel-swiper');

  carousels.forEach((el) => {
    new Swiper(el, {
      modules: [Navigation],
      slidesPerView: 'auto',
      spaceBetween: 16,
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        768: { spaceBetween: 24 },
        1024: { spaceBetween: 32 },
      },
    });
  });
});

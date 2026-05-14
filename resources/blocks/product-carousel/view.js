import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-carousel-swiper').forEach((el) => {
    const wrap = el.closest('.sobe-product-carousel');
    const slideCount = el.querySelectorAll('.swiper-slide').length;

    new Swiper(el, {
      modules: [Navigation],
      slidesPerView: 2,
      spaceBetween: 12,
      loop: slideCount > 4,
      navigation: {
        nextEl: wrap.querySelector('.carousel-btn-next'),
        prevEl: wrap.querySelector('.carousel-btn-prev'),
      },
      breakpoints: {
        640:  { slidesPerView: 3, spaceBetween: 16 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  });
});

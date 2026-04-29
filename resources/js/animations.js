import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const presets = {
  'fade-up': { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
  'fade-in': { opacity: 0, duration: 0.6, ease: 'power2.out' },
  'scale-in': { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.2)' },
  'slide-left': { x: -40, opacity: 0, duration: 0.8, ease: 'power2.out' },
  'slide-right': { x: 40, opacity: 0, duration: 0.8, ease: 'power2.out' },
};

// Query only elements not yet processed — makes this function safe to call
// repeatedly after WooCommerce AJAX updates without duplicating animations.
function initAnimationBus() {
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const elements = document.querySelectorAll(
      '[data-animate]:not([data-animated])',
    );

    elements.forEach((el) => {
      el.dataset.animated = 'true';

      const type = el.dataset.animate;

      if (type === 'hero-content') {
        gsap.from(el.querySelectorAll('h1, h2, p, a, button'), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        });
        return;
      }

      if (type === 'product-feature') {
        gsap.from(el.querySelectorAll(':scope > div'), {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
        return;
      }

      if (type === 'brand-carousel') {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
        });
        return;
      }

      const preset = presets[type];
      if (!preset) return;

      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: preset.y ?? 0,
        x: preset.x ?? 0,
        scale: preset.scale ?? 1,
        opacity: preset.opacity ?? 0,
        duration: preset.duration ?? 0.8,
        ease: preset.ease ?? 'power2.out',
      });
    });
  });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Always defined so cart drawer can call it safely regardless of motion preference
  window.showSiteHeader = () => {};

  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const headerAnim = gsap.to(header, {
      yPercent: -100,
      duration: 0.35,
      ease: 'power2.inOut',
      paused: true,
    });

    ScrollTrigger.create({
      start: 'top top-=80',
      end: '99999',
      onUpdate(self) {
        if (self.direction === 1) {
          headerAnim.play(); // scrolling down → hide
        } else {
          headerAnim.reverse(); // scrolling up   → show
        }
      },
    });

    window.showSiteHeader = () => headerAnim.reverse();
  });
}

export { initAnimationBus, initStickyHeader, gsap, ScrollTrigger };

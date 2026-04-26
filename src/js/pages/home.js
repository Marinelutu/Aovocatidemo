import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';
import { initStickyPin } from '../animations/sticky-pin.js';
import { initImageMask } from '../animations/image-mask.js';
import { initCounters } from '../animations/counters.js';
import { initParallax } from '../animations/parallax.js';

gsap.registerPlugin(ScrollTrigger);

function initHome() {
  // Initialize standard animations
  initTextReveal('.text-reveal');
  initStickyPin('.pin-section');
  initImageMask('.img-mask');
  initCounters('.counter');
  initParallax();

  // Scroll-to-explore indicator
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    gsap.fromTo(scrollHint, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 1, delay: 2, ease: 'power2.out' }
    );
    
    // Bounce loop
    gsap.to(scrollHint.querySelector('.scroll-hint__arrow'), {
      y: 5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Fade on first scroll
    ScrollTrigger.create({
      start: 'top -50',
      once: true,
      onEnter: () => gsap.to(scrollHint, { opacity: 0, duration: 0.5 })
    });
  }

  // Cards hover scale
  document.querySelectorAll('.card-practice').forEach(card => {
    const img = card.querySelector('.img-inner');
    if (img) {
      card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }));
      card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }));
    }
  });

  // Carousel S7
  initCarousel();
}

function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const btnPrev = document.querySelector('.carousel-prev');
  const btnNext = document.querySelector('.carousel-next');
  const counterCurrent = document.querySelector('.carousel-counter .current');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let interval;

  function updateCarousel() {
    gsap.to(track, {
      xPercent: -100 * currentIndex,
      duration: 0.8,
      ease: 'power3.inOut'
    });
    counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); stopAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); stopAuto(); });

  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); stopAuto(); }
    if (e.key === 'ArrowLeft') { prevSlide(); stopAuto(); }
  });

  startAuto();
}

document.addEventListener('DOMContentLoaded', initHome);

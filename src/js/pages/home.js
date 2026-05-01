/**
 * home.js — Home page interactions
 * SEVER & ASOCIAȚII
 * Phase 4/13/14: Hero, animations, carousel with drag, video background
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';
import { initStickyPin } from '../animations/sticky-pin.js';
import { initImageMask } from '../animations/image-mask.js';
import { initCounters } from '../animations/counters.js';
import { initParallax } from '../animations/parallax.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHome() {
  // Initialize standard animations
  initTextReveal('.text-reveal');
  initStickyPin('.pin-section');
  initImageMask('.img-mask');
  initCounters('.counter');
  initParallax();

  // Scroll-to-explore indicator
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint && !prefersReduced) {
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
    if (img && !prefersReduced) {
      card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }));
      card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }));
    }
  });

  // Video background fallback (Phase 14)
  initVideoBackground();

  // Carousel S7 (Phase 13)
  initCarousel();

  // Recent Case Reveal & Zoom (Phase 4 Improvements)
  const caseImg = document.querySelector('.featured-case .img-inner');
  if (caseImg && !prefersReduced) {
    gsap.fromTo(caseImg, 
      { scale: 1.3, yPercent: 10 },
      {
        scale: 1,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.featured-case',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }
}

/**
 * Phase 14 — Video Background
 * Handles video load errors and ensures the CSS-only fallback is visible.
 * The fallback is a high-res architectural image with a slow CSS pan.
 */
function initVideoBackground() {
  const video = document.querySelector('.hero-video');
  const fallback = document.querySelector('.hero-fallback');

  if (!video || !fallback) return;

  // If video can play, ensure it's above fallback
  video.addEventListener('canplaythrough', () => {
    video.style.zIndex = '1';
  }, { once: true });

  // If video fails, hide it and show fallback
  video.addEventListener('error', () => {
    video.style.display = 'none';
  });

  // Additional check: if video hasn't started after 3s, rely on fallback
  setTimeout(() => {
    if (video.readyState < 2) {
      video.style.opacity = '0';
    }
  }, 3000);
}

/**
 * Phase 13 — Carousel Component
 * Testimonial carousel with:
 * - prev/next buttons
 * - auto-advance (5000ms interval)
 * - pause on mouseenter, resume on mouseleave
 * - keyboard left/right arrow support
 * - drag-to-navigate support
 * - gsap.to on xPercent with power3.inOut
 * - progress counter "01/03"
 * - progress bar
 */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const btnPrev = document.querySelector('.carousel-prev');
  const btnNext = document.querySelector('.carousel-next');
  const counterCurrent = document.querySelector('.carousel-counter .current');
  const progressBar = document.querySelector('.carousel-progress-bar');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoInterval;

  function updateCarousel(animate = true) {
    const duration = (animate && !prefersReduced) ? 0.8 : 0;

    gsap.to(track, {
      xPercent: -100 * currentIndex,
      duration: duration,
      ease: 'power3.inOut'
    });

    // Update counter
    if (counterCurrent) {
      counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    // Update progress bar
    if (progressBar) {
      const pct = ((currentIndex + 1) / slides.length) * 100;
      progressBar.style.width = pct + '%';
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    updateCarousel();
  }

  /* ─── Auto-advance ─── */
  function startAuto() {
    stopAuto();
    autoInterval = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  /* ─── Button clicks ─── */
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      stopAuto();
      startAuto(); // Restart timer
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      stopAuto();
      startAuto();
    });
  }

  /* ─── Pause on hover ─── */
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);
  }

  /* ─── Keyboard navigation ─── */
  document.addEventListener('keydown', (e) => {
    // Only respond if carousel section is visible
    const section = document.querySelector('.testimonials-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      stopAuto();
      startAuto();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      stopAuto();
      startAuto();
    }
  });

  /* ─── Drag support ─── */
  let isDragging = false;
  let dragStartX = 0;
  let dragDelta = 0;
  const DRAG_THRESHOLD = 50;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragDelta = 0;
    track.classList.add('is-dragging');
    track.setPointerCapture(e.pointerId);
    stopAuto();
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    dragDelta = e.clientX - dragStartX;

    // Visual feedback: slight drag offset
    if (!prefersReduced) {
      const basePercent = -100 * currentIndex;
      const dragPercent = (dragDelta / track.offsetWidth) * 100;
      gsap.set(track, { xPercent: basePercent + dragPercent * 0.4 });
    }
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    if (dragDelta < -DRAG_THRESHOLD) {
      nextSlide();
    } else if (dragDelta > DRAG_THRESHOLD) {
      prevSlide();
    } else {
      updateCarousel();
    }

    startAuto();
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  /* ─── Prevent link clicks during drag ─── */
  track.addEventListener('click', (e) => {
    if (Math.abs(dragDelta) > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  });

  /* ─── Initialize ─── */
  updateCarousel(false);
  startAuto();
}

document.addEventListener('DOMContentLoaded', initHome);

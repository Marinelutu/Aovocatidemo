/**
 * cazuri.js — Cases & Results page interactions
 * SEVER & ASOCIAȚII
 * Phase 10 + Phase 15: Horizontal scroll, text reveal, card entrance, image parallax
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';
import { initHorizontalScroll } from '../animations/horizontal.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initCazuri() {
  initTextReveal('.reveal-text');
  initHorizontalScroll();

  if (prefersReduced) return;

  const cards = document.querySelectorAll('.case-card');

  /* ─── Staggered entrance animation ─── */
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    scale: 0.95,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.h-scroll-section',
      start: 'top 85%',
      once: true,
    },
  });

  /* ─── Image parallax within horizontal scroll ─── */
  const section = document.querySelector('.h-scroll-section');
  const track = document.querySelector('.h-scroll-track');

  if (section && track) {
    cards.forEach((card) => {
      const img = card.querySelector('.case-card__image img');
      if (!img) return;

      /* Create a subtle parallax: image moves slower than the card scroll */
      gsap.fromTo(
        img,
        { x: -30 },
        {
          x: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });
  }

  /* ─── Card hover scale + shadow ─── */
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, {
        scale: 1.02,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    );
    card.addEventListener('mouseleave', () =>
      gsap.to(card, {
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initCazuri, 200);
});

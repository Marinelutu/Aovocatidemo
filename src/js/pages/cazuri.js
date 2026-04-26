/**
 * cazuri.js — Cases & Results page interactions
 * SEVER & ASOCIAȚII
 * Phase 10 + Phase 15: Horizontal scroll, text reveal, card entrance
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

  /* ─── Case card hover scale ─── */
  if (!prefersReduced) {
    document.querySelectorAll('.case-card').forEach((card) => {
      card.addEventListener('mouseenter', () =>
        gsap.to(card, { scale: 1.03, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
      );
      card.addEventListener('mouseleave', () =>
        gsap.to(card, { scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
      );
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initCazuri, 200);
});

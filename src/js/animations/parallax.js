/**
 * parallax.js — data-speed attr parallax system
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.3
 *
 * HTML: any element with data-speed="0.5" (range 0.1–0.9)
 * Lower speed = more parallax movement.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize parallax on all elements with [data-speed].
 */
export function initParallax() {
  if (prefersReduced) return;

  document.querySelectorAll('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    const section = el.closest('section') || el.parentElement;

    gsap.to(el, {
      y: () => (1 - speed) * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

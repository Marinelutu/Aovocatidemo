/**
 * image-mask.js — Clip-path expansion reveals
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.2
 *
 * HTML structure required:
 *   <div class="img-mask">
 *     <img src="..." class="img-inner" alt="...">
 *   </div>
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize image mask reveal on all .img-mask elements.
 * @param {string} selector — CSS selector for mask containers
 */
export function initImageMask(selector = '.img-mask') {
  if (prefersReduced) return;

  const masks = document.querySelectorAll(selector);

  masks.forEach((mask) => {
    const inner = mask.querySelector('.img-inner');

    // Mask clip-path reveal
    gsap.from(mask, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: mask,
        start: 'top 80%',
        once: true,
      },
    });

    // Inner image scale
    if (inner) {
      gsap.from(inner, {
        scale: 1.15,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mask,
          start: 'top 80%',
          once: true,
        },
      });
    }
  });
}

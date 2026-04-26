/**
 * text-reveal.js — Staggered line reveals
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.1
 *
 * Usage: import { initTextReveal } from './text-reveal.js'
 *        initTextReveal('.text-reveal')
 *
 * HTML: <h2 class="text-reveal">Your headline text here</h2>
 * The function splits text into lines and animates each .line-inner up.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLines } from '../core/split-text.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize text reveal animation on elements matching the selector.
 * @param {string} selector — CSS selector for elements to reveal
 */
export function initTextReveal(selector = '[data-reveal]') {
  if (prefersReduced) return;

  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const lineInners = splitLines(el);

    if (lineInners.length === 0) return;

    gsap.from(lineInners, {
      y: '110%',
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

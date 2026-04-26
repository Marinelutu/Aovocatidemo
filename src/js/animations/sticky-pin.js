/**
 * sticky-pin.js — GSAP pin sections
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.4
 *
 * HTML: <section class="pin-section"> ... </section>
 * Pins the section while scrolling through 150% of its height.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize sticky pin on all .pin-section elements.
 * @param {string} selector — CSS selector for pin sections
 */
export function initStickyPin(selector = '.pin-section') {
  if (prefersReduced) return;

  document.querySelectorAll(selector).forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=150%',
      pin: true,
      anticipatePin: 1,
      scrub: 1,
    });
  });
}

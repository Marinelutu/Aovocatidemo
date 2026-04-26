/**
 * counters.js — Animated number counters
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.9
 *
 * HTML: <span class="counter" data-target="200" data-suffix="+">0</span>
 * Animates from 0 to data-target with optional suffix.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize animated counters on all .counter elements.
 * @param {string} selector — CSS selector for counter elements
 */
export function initCounters(selector = '.counter') {
  const counters = document.querySelectorAll(selector);

  counters.forEach((el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';

    if (prefersReduced) {
      // Show final value immediately
      el.textContent = target + suffix;
      return;
    }

    gsap.to({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].val) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });
  });
}

/**
 * horizontal.js — Horizontal scroll sections
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.8
 *
 * HTML:
 *   <section class="h-scroll-section">
 *     <div class="h-scroll-track">
 *       <div class="h-panel">Panel 1</div>
 *       <div class="h-panel">Panel 2</div>
 *       ...
 *     </div>
 *   </section>
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize horizontal scroll on .h-scroll-section elements.
 * Uses absolute pixel xPercent based on (scrollWidth - viewportWidth)
 * to ensure the scroll stops exactly when the last card is fully visible.
 */
export function initHorizontalScroll() {
  if (prefersReduced) return;

  const sections = document.querySelectorAll('.h-scroll-section');

  sections.forEach((section) => {
    const track = section.querySelector('.h-scroll-track');
    if (!track) return;

    const panels = track.querySelectorAll('.h-panel');
    if (panels.length === 0) return;

    /* Calculate exact pixel distance to scroll */
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
      },
    });
  });
}

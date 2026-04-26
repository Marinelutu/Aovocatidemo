/**
 * practici.js — Practice pages interactions
 * SEVER & ASOCIAȚII
 * Phase 7/8/9 + Phase 15: SVG stroke draw-on, counters, sticky, text reveal
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';
import { initImageMask } from '../animations/image-mask.js';
import { initStickyPin } from '../animations/sticky-pin.js';
import { initCounters } from '../animations/counters.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initPractici() {
  initTextReveal('.reveal-text');
  initImageMask('.img-mask');
  initCounters('.stat-num');

  /* ─── Sticky pin for "Ce facem" column ─── */
  // The .sticky-col uses CSS sticky, no GSAP pin needed here

  /* ─── SVG Draw-on lines between process steps (Phase 15) ─── */
  if (!prefersReduced) {
    const stepLines = document.querySelectorAll('.step-line path');
    stepLines.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path.closest('.step-line'),
          start: 'top 80%',
          once: true,
        },
      });
    });
  }

  /* ─── Card hover scale on practice hub ─── */
  if (!prefersReduced) {
    document.querySelectorAll('.card-practice').forEach((card) => {
      const img = card.querySelector('.img-inner');
      if (img) {
        card.addEventListener('mouseenter', () =>
          gsap.to(img, { scale: 1.08, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
        );
        card.addEventListener('mouseleave', () =>
          gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out', overwrite: 'auto' })
        );
      }
    });
  }

  /* ─── Case brief hover indicator ─── */
  document.querySelectorAll('.case-brief').forEach((brief) => {
    brief.style.cursor = 'default';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initPractici, 200);
});

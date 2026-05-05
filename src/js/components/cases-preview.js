/**
 * cases-preview.js — Cinematic Case Archive interactions
 * SEVER & ASOCIAȚII
 * 
 * Features:
 *  - Staggered scroll-triggered entrance animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize the cinematic cases archive component
 */
export function initCasesPreview() {
  const sections = document.querySelectorAll('.cases-archive');
  if (sections.length === 0) return;

  sections.forEach(section => {
    initEntranceAnimations(section);
  });
}

/**
 * Staggered entrance animations via ScrollTrigger
 */
function initEntranceAnimations(section) {
  if (prefersReduced) return;

  const rows = section.querySelectorAll('.case-row');
  const header = section.querySelector('.cases-archive__header');
  const footer = section.querySelector('.cases-archive__footer');

  // Animate header
  if (header) {
    gsap.fromTo(header,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
        }
      }
    );
  }

  // Animate each row with stagger
  if (rows.length > 0) {
    gsap.fromTo(rows,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rows[0],
          start: 'top 85%',
        }
      }
    );
  }

  // Animate footer
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
        }
      }
    );
  }
}

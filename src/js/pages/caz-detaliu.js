/**
 * caz-detaliu.js — Case Detail Roadmap Logic
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initCazDetaliu() {
  // 1. Roadmap steps entrance
  const steps = document.querySelectorAll('.roadmap-step');
  steps.forEach((step, i) => {
    gsap.from(step, {
      x: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
      },
    });
    
    // Animate the dot
    const dot = step.querySelector('.roadmap-dot');
    if (dot) {
      gsap.from(dot, {
        scale: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
      });
    }
  });

  // 2. Result section punch-in
  const result = document.querySelector('.result-section');
  if (result) {
    gsap.from(result.querySelector('h3'), {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: result,
        start: 'top 80%',
      },
    });
  }
}

document.addEventListener('DOMContentLoaded', initCazDetaliu);

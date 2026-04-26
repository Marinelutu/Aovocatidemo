/**
 * despre.js — About page interactions
 * SEVER & ASOCIAȚII
 * Phase 5 + Phase 15: Text reveal, image mask, parallax, sticky pin
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';
import { initImageMask } from '../animations/image-mask.js';
import { initParallax } from '../animations/parallax.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initDespre() {
  initTextReveal('.reveal-text');
  initImageMask('.img-mask');
  initParallax();

  /* ─── Sticky pin for founding story ─── */
  // The pin-section uses CSS sticky via the class, or GSAP pin
  const pinSection = document.querySelector('.despre-story.pin-section');
  if (pinSection && !prefersReduced) {
    const storyImage = pinSection.querySelector('.story-image');
    if (storyImage) {
      // Make the image sticky while scrolling through the story text
      ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: storyImage,
        pinSpacing: false,
      });
    }
  }

  /* ─── Value cards entrance animation ─── */
  if (!prefersReduced) {
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length > 0) {
      gsap.from(valueCards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.despre-values',
          start: 'top 75%',
          once: true,
        },
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initDespre, 200);
});

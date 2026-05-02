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

  /* ─── Sticky pin for founding story (Inverted) ─── */
  const pinSection = document.querySelector('.despre-story.pin-section');
  if (pinSection && !prefersReduced) {
    const storyContent = pinSection.querySelector('.story-content');
    const storyImage = pinSection.querySelector('.story-image');
    
    if (storyContent && storyImage) {
      // Pin the text content
      ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: storyContent,
        pinSpacing: false,
      });

      // Add parallax to the image
      gsap.to(storyImage.querySelector('.img-inner'), {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: pinSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
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

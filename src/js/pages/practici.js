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

  /* ─── Sequential Scroll Reveal for Practice List ─── */
  const pinSection = document.querySelector('.pin-section-practici');
  if (pinSection && !prefersReduced) {
    const listItems = pinSection.querySelectorAll('.scroll-list-item');
    
    if (listItems.length > 0) {
      // Initial state: hidden and slightly below for a "live" entrance
      gsap.set(listItems, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ paused: true });

      listItems.forEach((item) => {
        // 1. Reveal Text: Opacity and Y-motion ONLY
        tl.to(item, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });

        // 2. Pause before next item
        tl.to({}, { duration: 0.5 });
      });

      let maxProgress = 0;

      ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: `+=${listItems.length * 40}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Strictly forward: once revealed, it never hides again
          if (self.progress > maxProgress) {
            maxProgress = self.progress;
          }
          tl.progress(maxProgress);
        }
      });
    }
  }

  /* ─── Process Horizontal Animation ─── */
  const processSection = document.querySelector('.process-horizontal');
  if (processSection && !prefersReduced) {
    const cards = processSection.querySelectorAll('.process-card');
    const line = processSection.querySelector('.process-line');

    if (line) {
      gsap.fromTo(line, 
        { scaleX: 0, transformOrigin: 'left center' },
        { 
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: processSection,
            start: 'top 80%',
            end: 'center 60%',
            scrub: true,
          }
        }
      );
    }

    if (cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processSection,
            start: 'top 80%',
            end: 'center 60%',
            scrub: true,
          }
        }
      );
    }
  }

  /* ─── Floating Assets Parallax ─── */
  if (!prefersReduced) {
    const assets = document.querySelectorAll('.float-asset');
    assets.forEach((asset, i) => {
      gsap.to(asset, {
        y: i % 2 === 0 ? -100 : 100,
        rotation: i % 2 === 0 ? 15 : -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initPractici, 200);
});

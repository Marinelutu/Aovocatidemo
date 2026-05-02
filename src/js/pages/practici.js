/**
 * practici.js — Practice pages interactions
 * SEVER & ASOCIAȚII
 * Phase 7/8/9 + Phase 15: SVG stroke draw-on, counters, sticky, text reveal
 * + Stacked Cards cinematic animation
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

  /* ─── Stacked Cards: Cinematic Scroll ─── */
  initStackedCards();

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

/**
 * Stacked Cards — Full-viewport sticky cards with cinematic entrance
 * Each card covers the previous one as the user scrolls.
 * Content animates in with blur-to-clear and fade-in-up effects.
 */
function initStackedCards() {
  const wrapper = document.querySelector('.stacked-wrapper');
  if (!wrapper) return;

  const cards = wrapper.querySelectorAll('.stacked-card');
  if (cards.length === 0) return;

  if (prefersReduced) {
    // For reduced motion: just show everything
    cards.forEach(card => card.classList.add('is-active'));
    return;
  }

  cards.forEach((card, index) => {
    const label = card.querySelector('.card-label');
    const divider = card.querySelector('.card-divider');
    const title = card.querySelector('.card-title-signature');
    const detail = card.querySelector('.card-detail');
    const bgImg = card.querySelector('.card-bg img');

    // Create a timeline for each card's entrance
    const tl = gsap.timeline({ paused: true });

    // Background image: subtle parallax zoom
    if (bgImg) {
      tl.fromTo(bgImg,
        { scale: 1.15 },
        { scale: 1, duration: 1.5, ease: 'power2.out' },
        0
      );
    }

    // Label: fade in and slide up
    if (label) {
      tl.fromTo(label,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      );
    }

    // Divider: scale in from center
    if (divider) {
      tl.fromTo(divider,
        { opacity: 0, scaleX: 0 },
        { opacity: 0.6, scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0.3
      );
    }

    // Title: blur-to-clear + fade-in-up (the hero animation)
    if (title) {
      tl.fromTo(title,
        { opacity: 0, filter: 'blur(12px)', y: 30 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'power3.out' },
        0.35
      );
    }

    // Detail: fade-in-up
    if (detail) {
      tl.fromTo(detail,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.6
      );
    }

    // Create ScrollTrigger for each card
    ScrollTrigger.create({
      trigger: card,
      start: 'top 60%',
      end: 'center center',
      onEnter: () => {
        card.classList.add('is-active');
        tl.play();
      },
      // Keep revealed — don't reverse
    });

    // Parallax: as the card is being scrolled past, shift content up
    if (index < cards.length - 1) {
      gsap.to(card.querySelector('.card-content'), {
        y: -60,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initPractici, 200);
});


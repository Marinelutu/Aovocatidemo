/**
 * nav.js — Navigation interactions
 * SEVER & ASOCIAȚII
 * Phase 3: scramble on hover, active state, footer auto-expand, mobile menu
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrambleLinks } from '../animations/scramble.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize navigation interactions
 */
function initNav() {
  const navIsland = document.getElementById('nav-island');
  if (!navIsland) return;

  /* ─── 1. Active link detection ─── */
  const currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    const linkMap = {
      'home': '/',
      'despre': '/despre.html',
      'practici': '/practici.html',
      'corporativ': '/practici.html',
      'imobiliar': '/practici.html',
      'munca': '/practici.html',
      'cazuri': '/cazuri.html',
      'contact': '/contact.html',
    };

    const activeHref = linkMap[currentPage];
    if (activeHref) {
      navIsland.querySelectorAll('.nav-links a').forEach((link) => {
        if (link.getAttribute('href') === activeHref) {
          link.classList.add('is-active');
        }
      });
    }
  }

  /* ─── 2. Scramble on nav link hover ─── */
  initScrambleLinks('#nav-island [data-scramble]');

  /* ─── 3. Footer auto-expand ─── */
  const footer = document.querySelector('.site-footer');
  if (footer && !prefersReduced) {
    ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => navIsland.classList.add('is-expanded'),
      onLeaveBack: () => navIsland.classList.remove('is-expanded'),
    });
  }

  /* ─── 4. Mobile hamburger ─── */
  const hamburger = navIsland.querySelector('.nav-hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navIsland.classList.toggle('is-menu-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click
    navIsland.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navIsland.classList.remove('is-menu-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── 5. Nav CTA → navigate to contact ─── */
  const ctaBtn = navIsland.querySelector('.nav-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      // Use page transition if available
      const navigateTo = window.__navigateTo;
      if (navigateTo) {
        navigateTo('/contact.html');
      } else {
        window.location.href = '/contact.html';
      }
    });
  }

  /* ─── 6. Scroll hint — fade on first scroll ─── */
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint && !prefersReduced) {
    // Show after 2s delay
    gsap.set(scrollHint, { opacity: 0, y: 10 });
    gsap.to(scrollHint, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 2,
      ease: 'power2.out',
    });

    // Fade out on first scroll
    let hasScrolled = false;
    function onFirstScroll() {
      if (hasScrolled) return;
      hasScrolled = true;
      gsap.to(scrollHint, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          scrollHint.style.display = 'none';
        },
      });
      window.removeEventListener('scroll', onFirstScroll);
    }
    window.addEventListener('scroll', onFirstScroll, { passive: true });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

export { initNav };

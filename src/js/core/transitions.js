/**
 * transitions.js — Page transition overlay
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.6 + Phase 12 wiring
 */

import gsap from 'gsap';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const overlay = document.getElementById('page-overlay');

/**
 * Navigate to a URL with page transition overlay
 */
function navigateTo(href) {
  if (!overlay || prefersReduced) {
    window.location.href = href;
    return;
  }

  gsap.to(overlay, {
    scaleY: 1,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'bottom',
    onComplete: () => {
      window.location.href = href;
    }
  });
}

/**
 * Check if a link is internal (should trigger page transition)
 */
function isInternalLink(anchor) {
  // Skip mailto, tel, javascript, hash-only
  const href = anchor.getAttribute('href');
  if (!href) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('javascript:')) return false;
  if (href === '#' || href.startsWith('#')) return false;
  if (anchor.getAttribute('target') === '_blank') return false;

  // Must be same origin
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Intercept all internal link clicks
 */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  if (!isInternalLink(anchor)) return;

  e.preventDefault();
  const href = anchor.getAttribute('href');
  navigateTo(href);
});

/**
 * On page load: animate overlay OUT (reveal page)
 */
if (overlay && !prefersReduced) {
  // Set overlay to cover page initially
  gsap.set(overlay, { scaleY: 1, transformOrigin: 'top' });

  // Animate out after DOM is ready
  gsap.to(overlay, {
    scaleY: 0,
    duration: 0.5,
    ease: 'power3.inOut',
    transformOrigin: 'top',
    delay: 0.1,
  });
}

export { navigateTo };

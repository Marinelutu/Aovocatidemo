/**
 * transitions.js — Page transition overlay
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.6 + Phase 12 wiring
 * 
 * Intercepts ALL internal <a href> clicks across all pages.
 * Skips: mailto:, tel:, #anchor, target="_blank" links.
 * On click: animate overlay in (scaleY 0→1, 0.5s, power3.inOut)
 * After 500ms: window.location.href = href
 * On page load: animate overlay out (scaleY 1→0, 0.5s, power3.inOut, origin top)
 */

import gsap from 'gsap';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const overlay = document.getElementById('page-overlay');

/* Track if a transition is currently in progress to prevent double-clicks */
let isTransitioning = false;

/**
 * Navigate to a URL with page transition overlay
 */
function navigateTo(href) {
  if (isTransitioning) return;

  if (!overlay || prefersReduced) {
    window.location.href = href;
    return;
  }

  isTransitioning = true;

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
  const href = anchor.getAttribute('href');
  if (!href) return false;

  // Skip mailto, tel, javascript, hash-only
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('tel:')) return false;
  if (href.startsWith('javascript:')) return false;
  if (href === '#' || href.startsWith('#')) return false;

  // Skip target="_blank"
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
 * Intercept all internal link clicks across the entire page
 * Uses event delegation on document for maximum coverage
 */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a');
  if (!anchor) return;
  if (!isInternalLink(anchor)) return;

  e.preventDefault();
  const href = anchor.getAttribute('href');

  // Don't navigate to current page
  const currentPath = window.location.pathname;
  const targetPath = new URL(href, window.location.origin).pathname;
  if (currentPath === targetPath) return;

  navigateTo(href);
});

/**
 * On page load: animate overlay OUT (reveal page)
 * Sets overlay to cover page initially, then animates it away
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

// Expose navigateTo globally for other modules (e.g., nav CTA)
window.__navigateTo = navigateTo;

export { navigateTo };

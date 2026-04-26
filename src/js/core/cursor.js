/**
 * cursor.js — Custom cursor dot + ring
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.5
 */

import gsap from 'gsap';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (dot && ring && !prefersReduced) {
  // Hide default cursor via CSS (done in cursor.css)

  window.addEventListener('mousemove', (e) => {
    gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
  });

  // Expand ring on interactive elements
  document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-expanded'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-expanded'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to(dot,  { opacity: 0, duration: 0.2 });
    gsap.to(ring, { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to(dot,  { opacity: 1, duration: 0.2 });
    gsap.to(ring, { opacity: 1, duration: 0.2 });
  });

  // Pointer down state
  document.addEventListener('mousedown', () => {
    ring.classList.add('is-pressed');
  });

  document.addEventListener('mouseup', () => {
    ring.classList.remove('is-pressed');
  });
}

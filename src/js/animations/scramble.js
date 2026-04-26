/**
 * scramble.js — Character decode text scramble
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.7
 *
 * Usage: scramble(element, 'FINAL TEXT', 1200)
 * Characters randomly cycle through CHARS before resolving to the final letter.
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Scramble text effect on an element.
 * @param {HTMLElement} el — Target element
 * @param {string} finalText — The final resolved text
 * @param {number} duration — Duration in ms (default 1200)
 */
export function scramble(el, finalText, duration = 1200) {
  let frame = 0;
  const totalFrames = duration / 50;

  const interval = setInterval(() => {
    el.textContent = finalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (frame / totalFrames > i / finalText.length) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');

    if (++frame >= totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 50);
}

/**
 * Attach scramble effect to all elements with [data-scramble].
 * Triggers on mouseenter, restores original text.
 */
export function initScrambleLinks(selector = '[data-scramble]') {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.querySelectorAll(selector).forEach((el) => {
    const originalText = el.textContent.trim();
    let isScrambling = false;

    el.addEventListener('mouseenter', () => {
      if (isScrambling) return;
      isScrambling = true;
      scramble(el, originalText, 600);
      setTimeout(() => { isScrambling = false; }, 700);
    });
  });
}

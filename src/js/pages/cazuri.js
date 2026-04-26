import { initTextReveal } from '../animations/text-reveal.js';
import { initHorizontalScroll } from '../animations/horizontal.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTextReveal('.reveal-text');
    initHorizontalScroll();
  }, 200);
});

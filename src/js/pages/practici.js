import { initTextReveal } from '../animations/text-reveal.js';
import { initImageMask } from '../animations/image-mask.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTextReveal('.reveal-text');
    initImageMask('.img-mask');
  }, 200);
});

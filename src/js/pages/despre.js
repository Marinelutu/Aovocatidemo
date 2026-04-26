import { initTextReveal } from '../animations/text-reveal.js';
import { initImageMask } from '../animations/image-mask.js';
import { initParallax } from '../animations/parallax.js';
import { initStickyPin } from '../animations/sticky-pin.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTextReveal('.reveal-text');
    initImageMask('.img-mask');
    initParallax();
    initStickyPin();
  }, 200);
});

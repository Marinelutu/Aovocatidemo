import gsap from 'gsap';
import { initTextReveal } from '../animations/text-reveal.js';
import { initImageMask } from '../animations/image-mask.js';
import { initStickyPin } from '../animations/sticky-pin.js';
import { initCounters } from '../animations/counters.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTextReveal('.reveal-text');
    initImageMask('.img-mask');
    initStickyPin('.sticky-col');
    initCounters('.stat-num');
    
    // SVG Draw lines for process steps
    const stepLines = document.querySelectorAll('.step-line path');
    if (stepLines.length > 0 && typeof gsap !== 'undefined') {
      stepLines.forEach(line => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true
          }
        });
      });
    }
  }, 200);
});

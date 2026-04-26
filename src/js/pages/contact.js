/**
 * contact.js — Contact page interactions
 * SEVER & ASOCIAȚII
 * Phase 11 + Phase 15: Form validation, focus animations, SVG micro-animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initTextReveal } from '../animations/text-reveal.js';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initContact() {
  initTextReveal('.reveal-text');

  /* ─── Form validation ─── */
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');

      inputs.forEach((input) => {
        const group = input.closest('.field-group');
        if (
          !input.value.trim() ||
          (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value))
        ) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        if (!prefersReduced) {
          gsap.to(form, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              form.style.display = 'none';
              successMessage.removeAttribute('hidden');
              gsap.fromTo(
                successMessage,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
              );
            },
          });
        } else {
          form.style.display = 'none';
          successMessage.removeAttribute('hidden');
        }
      }
    });

    // Remove error on input
    form.querySelectorAll('input, textarea, select').forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.field-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }

  /* ─── Phase 15: Map pin SVG entrance animation ─── */
  if (!prefersReduced) {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
      const pinSvg = mapPlaceholder.querySelector('svg');
      if (pinSvg) {
        gsap.from(pinSvg, {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: mapPlaceholder,
            start: 'top 80%',
            once: true,
          },
        });
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initContact, 200);
});

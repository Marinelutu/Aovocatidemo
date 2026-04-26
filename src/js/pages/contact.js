import { initTextReveal } from '../animations/text-reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initTextReveal('.reveal-text');
  }, 200);

  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        const group = input.closest('.field-group');
        if (!input.value.trim() || (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value))) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        form.style.display = 'none';
        successMessage.removeAttribute('hidden');
      }
    });

    // Remove error on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.field-group');
        if (group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }
});

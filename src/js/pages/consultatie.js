/**
 * consultatie.js — Consultation Page Logic
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initConsultatie() {
  // 1. Text reveals
  const reveals = document.querySelectorAll('.text-reveal');
  reveals.forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    });
  });

  // 2. Real Calendar Interaction
  const calendarPlaceholder = document.querySelector('.calendar-placeholder');
  if (calendarPlaceholder) {
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    
    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      // Adjust firstDay to be 1 (Monday) to 7 (Sunday)
      let firstDay = new Date(year, month, 1).getDay();
      firstDay = firstDay === 0 ? 7 : firstDay; 
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const monthNames = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
      
      let html = `
        <div class="calendar-interactive">
          <div class="calendar-header mb-sm" style="display:flex; align-items:center; justify-content:space-between;">
            <button type="button" class="btn-prev" aria-label="Luna anterioara">&larr;</button>
            <h4 class="h-3">${monthNames[month]} ${year}</h4>
            <button type="button" class="btn-next" aria-label="Luna urmatoare">&rarr;</button>
          </div>
          <div class="calendar-weekdays mb-xs" style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; color: var(--c-text-muted); font-size: 0.8rem;">
            <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
          </div>
          <div class="calendar-grid">
      `;
      
      // Empty slots before 1st of month
      for (let i = 1; i < firstDay; i++) {
        html += `<div class="calendar-day empty"></div>`;
      }
      
      // Days
      for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(year, month, i);
        // disable weekends and past dates
        const isPast = d < new Date(new Date().setHours(0,0,0,0));
        const isWeekend = d.getDay() === 0 || d.getDay() === 6;
        const isDisabled = isPast || isWeekend;
        const isSelected = selectedDate && d.getTime() === selectedDate.getTime();
        
        html += `<div class="calendar-day ${isDisabled ? 'disabled' : ''} ${isSelected ? 'is-selected' : ''}" data-day="${i}" ${!isDisabled ? 'data-cursor' : ''}>${i}</div>`;
      }
      
      html += `</div>`;
      
      // Time slots if date selected
      if (selectedDate) {
        html += `
          <div class="time-slots mt-md">
            <h5 class="label-small mb-sm">Selectați ora:</h5>
            <div class="time-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'].map(t => 
                `<button type="button" class="time-slot ${selectedTime === t ? 'is-selected' : ''}" data-time="${t}">${t}</button>`
              ).join('')}
            </div>
          </div>
        `;
      }
      
      // Summary
      if (selectedDate && selectedTime) {
        html += `<p class="label-small mt-md" style="color: var(--c-ink);">Programare: ${selectedDate.toLocaleDateString('ro-RO')} la ora ${selectedTime}</p>`;
      }
      
      html += `</div>`;
      
      calendarPlaceholder.innerHTML = html;
      
      // Attach events
      calendarPlaceholder.querySelector('.btn-prev').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      });
      calendarPlaceholder.querySelector('.btn-next').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
      });
      
      calendarPlaceholder.querySelectorAll('.calendar-day:not(.disabled):not(.empty)').forEach(el => {
        el.addEventListener('click', (e) => {
          const day = parseInt(e.target.dataset.day);
          selectedDate = new Date(year, month, day);
          selectedTime = null; // reset time when date changes
          renderCalendar();
        });
      });
      
      calendarPlaceholder.querySelectorAll('.time-slot').forEach(el => {
        el.addEventListener('click', (e) => {
          selectedTime = e.target.dataset.time;
          renderCalendar();
        });
      });
    }
    
    const style = document.createElement('style');
    style.textContent = `
      .calendar-interactive { width: 100%; }
      .calendar-grid { 
        display: grid; 
        grid-template-columns: repeat(7, 1fr); 
        gap: 10px; 
      }
      .calendar-day {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--c-border);
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--f-body);
        font-size: 0.9rem;
      }
      .calendar-day:not(.disabled):not(.empty):hover {
        background: var(--c-ink);
        color: var(--c-white);
        border-color: var(--c-ink);
      }
      .calendar-day.is-selected {
        background: var(--c-ink);
        color: var(--c-white);
        border-color: var(--c-ink);
      }
      .calendar-day.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      .calendar-day.empty {
        border: none;
      }
      .time-slot {
        padding: 10px;
        border: 1px solid var(--c-border);
        background: transparent;
        color: var(--c-text);
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--f-body);
      }
      .time-slot:hover, .time-slot.is-selected {
        background: var(--c-ink);
        color: var(--c-white);
        border-color: var(--c-ink);
      }
      .btn-prev, .btn-next {
        background: transparent;
        border: none;
        color: var(--c-text);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 5px 10px;
        transition: opacity 0.2s;
      }
      .btn-prev:hover, .btn-next:hover {
        opacity: 0.6;
      }
    `;
    document.head.appendChild(style);
    
    renderCalendar();
  }

  // 3. Form Handling
  const form = document.getElementById('callback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>Trimitere...</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<span>Cerere Trimisă!</span>';
        btn.style.background = '#28a745';
        btn.style.borderColor = '#28a745';
        form.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
}

document.addEventListener('DOMContentLoaded', initConsultatie);

import{g as k,S as w}from"./nav-BTFV5Nwc.js";k.registerPlugin(w);function T(){document.querySelectorAll(".text-reveal").forEach(a=>{k.from(a,{y:40,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:a,start:"top 90%"}})});const s=document.querySelector(".calendar-placeholder");if(s){let m=function(){const o=a.getFullYear(),d=a.getMonth();let r=new Date(o,d,1).getDay();r=r===0?7:r;const x=new Date(o,d+1,0).getDate();let l=`
        <div class="calendar-interactive">
          <div class="calendar-header mb-sm" style="display:flex; align-items:center; justify-content:space-between;">
            <button type="button" class="btn-prev" aria-label="Luna anterioara">&larr;</button>
            <h4 class="h-3">${["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"][d]} ${o}</h4>
            <button type="button" class="btn-next" aria-label="Luna urmatoare">&rarr;</button>
          </div>
          <div class="calendar-weekdays mb-xs" style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; color: var(--c-text-muted); font-size: 0.8rem;">
            <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
          </div>
          <div class="calendar-grid">
      `;for(let t=1;t<r;t++)l+='<div class="calendar-day empty"></div>';for(let t=1;t<=x;t++){const i=new Date(o,d,t),b=i<new Date(new Date().setHours(0,0,0,0)),L=i.getDay()===0||i.getDay()===6,h=b||L,D=e&&i.getTime()===e.getTime();l+=`<div class="calendar-day ${h?"disabled":""} ${D?"is-selected":""}" data-day="${t}" ${h?"":"data-cursor"}>${t}</div>`}l+="</div>",e&&(l+=`
          <div class="time-slots mt-md">
            <h5 class="label-small mb-sm">Selectați ora:</h5>
            <div class="time-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${["09:00","10:30","12:00","14:00","15:30","17:00"].map(t=>`<button type="button" class="time-slot ${n===t?"is-selected":""}" data-time="${t}">${t}</button>`).join("")}
            </div>
          </div>
        `),e&&n&&(l+=`<p class="label-small mt-md" style="color: var(--c-ink);">Programare: ${e.toLocaleDateString("ro-RO")} la ora ${n}</p>`),l+="</div>",s.innerHTML=l,s.querySelector(".btn-prev").addEventListener("click",()=>{a.setMonth(a.getMonth()-1),m()}),s.querySelector(".btn-next").addEventListener("click",()=>{a.setMonth(a.getMonth()+1),m()}),s.querySelectorAll(".calendar-day:not(.disabled):not(.empty)").forEach(t=>{t.addEventListener("click",i=>{const b=parseInt(i.target.dataset.day);e=new Date(o,d,b),n=null,m()})}),s.querySelectorAll(".time-slot").forEach(t=>{t.addEventListener("click",i=>{n=i.target.dataset.time,m(),v()})}),v()},v=function(){const o=e&&n;g&&g.querySelectorAll('input, select, button[type="submit"]').forEach(r=>{r.disabled=!o,o?(r.style.opacity="1",r.style.cursor=""):(r.style.opacity="0.5",r.style.cursor="not-allowed")}),p&&y&&(o?(p.innerHTML="Finalizare Programare",y.innerHTML=`Ați selectat <strong>${e.toLocaleDateString("ro-RO")}</strong> la ora <strong>${n}</strong>. Vă rugăm să completați datele de mai jos.`,p.style.color="",c&&c.classList.contains("mobile-hidden")&&(c.classList.remove("mobile-hidden"),window.innerWidth<=768&&setTimeout(()=>{c.scrollIntoView({behavior:"smooth",block:"start"})},100))):(p.innerHTML="Selectați Data și Ora",y.innerHTML="Vă rugăm să alegeți o dată și o oră din calendarul alăturat pentru a putea completa formularul.",p.style.color="var(--c-text-muted)",c&&window.innerWidth<=768&&c.classList.add("mobile-hidden")))},a=new Date,e=null,n=null;const c=document.getElementById("booking-form-container"),p=document.getElementById("form-dynamic-title"),y=document.getElementById("form-dynamic-desc"),g=document.getElementById("callback-form"),f=document.createElement("style");f.textContent=`
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
      @media (max-width: 768px) {
        .mobile-hidden {
          display: none !important;
        }
      }
    `,document.head.appendChild(f),m()}const u=document.getElementById("callback-form");u&&u.addEventListener("submit",a=>{a.preventDefault();const e=u.querySelector("button"),n=e.innerHTML;e.innerHTML="<span>Trimitere...</span>",e.disabled=!0,setTimeout(()=>{e.innerHTML="<span>Cerere Trimisă!</span>",e.style.background="#28a745",e.style.borderColor="#28a745",u.reset(),setTimeout(()=>{e.innerHTML=n,e.style.background="",e.style.borderColor="",e.disabled=!1},3e3)},1500)})}document.addEventListener("DOMContentLoaded",T);

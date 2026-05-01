/**
 * flow-field.js — Animated Noise-Driven Vector Field
 * SEVER & ASOCIAȚII
 */

import { createNoise3D } from 'simplex-noise';

export class FlowField {
  constructor(container, options = {}) {
    if (!container) return;
    this.container = container;
    
    // Config
    this.agentCount = options.agentCount || 600;
    this.flowScale = options.flowScale || 0.004;
    this.mode = options.mode || 'light'; // 'dark' or 'light'
    this.lineWidth = 0.9;
    this.speed = 1.6;
    this.fadeAlpha = 0.05;
    
    // State
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.noise3D = createNoise3D();
    this.agents = [];
    this.animationFrame = null;
    this.isVisible = false;
    this.time = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    
    this.init();
  }

  init() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'auto'; // Enable clicks
    this.container.appendChild(this.canvas);
    
    this.setupColors();
    this.resize();
    this.createAgents();
    
    // Observers
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
      if (this.isVisible) this.animate();
      else cancelAnimationFrame(this.animationFrame);
    }, { threshold: 0.1 });
    this.intersectionObserver.observe(this.container);
    
    // Reset on click
    this.handleClick = () => {
      this.noise3D = createNoise3D();
      this.createAgents();
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    this.canvas.addEventListener('click', this.handleClick);
  }

  setupColors() {
    if (this.mode === 'dark') {
      this.bgColor = '#0A0A0A';
      this.strokeColor = '250, 250, 248'; // Whiteish
      this.bgFill = 'rgba(10, 10, 10, 0.05)';
    } else {
      this.bgColor = '#FAFAF8';
      this.strokeColor = '10, 10, 10'; // Blackish
      this.bgFill = 'rgba(250, 250, 248, 0.05)';
    }
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    
    // Redraw bg on resize
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Re-create agents to fit new bounds
    this.createAgents();
  }

  createAgents() {
    const rect = this.container.getBoundingClientRect();
    this.agents = [];
    for (let i = 0; i < this.agentCount; i++) {
      this.agents.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        oldX: 0,
        oldY: 0,
        alpha: Math.random() * (0.60 - 0.18) + 0.18
      });
      this.agents[i].oldX = this.agents[i].x;
      this.agents[i].oldY = this.agents[i].y;
    }
  }

  animate() {
    if (!this.isVisible) return;
    
    this.ctx.fillStyle = this.bgFill;
    this.ctx.fillRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    
    this.time += 1;
    const t = this.time * 0.0006;
    
    const rect = this.container.getBoundingClientRect();
    
    this.ctx.lineWidth = this.lineWidth;
    
    for (let i = 0; i < this.agents.length; i++) {
      const a = this.agents[i];
      
      // Calculate angle using simplex noise
      const noise = this.noise3D(a.x * this.flowScale, a.y * this.flowScale, t);
      const angle = noise * Math.PI * 2.5;
      
      // Update pos
      a.oldX = a.x;
      a.oldY = a.y;
      a.x += Math.cos(angle) * this.speed;
      a.y += Math.sin(angle) * this.speed;
      
      // Draw trail
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(${this.strokeColor}, ${a.alpha})`;
      this.ctx.moveTo(a.oldX, a.oldY);
      this.ctx.lineTo(a.x, a.y);
      this.ctx.stroke();
      
      // Wrap around or teleport
      if (a.x < 0 || a.x > rect.width || a.y < 0 || a.y > rect.height) {
        a.x = Math.random() * rect.width;
        a.y = Math.random() * rect.height;
        a.oldX = a.x;
        a.oldY = a.y;
      }
    }
    
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.canvas.removeEventListener('click', this.handleClick);
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

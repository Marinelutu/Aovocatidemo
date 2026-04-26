/**
 * split-text.js — Custom SplitText utility
 * SEVER & ASOCIAȚII
 * Spec: AGENTS.md §4.1 (custom line splitter)
 *
 * Wraps each visual line in:
 *   <div class="line" style="overflow:hidden">
 *     <div class="line-inner">...text...</div>
 *   </div>
 *
 * Returns an array of .line-inner elements for animation.
 */

/**
 * Split an element's text content into wrapped lines.
 * @param {HTMLElement} el — The element to split
 * @returns {HTMLElement[]} — Array of .line-inner elements
 */
export function splitLines(el) {
  if (!el) return [];

  const text = el.textContent.trim();
  if (!text) return [];

  const words = text.split(/\s+/);

  // Preserve original styles
  const computedStyle = window.getComputedStyle(el);
  const originalDisplay = computedStyle.display;
  const originalWidth = el.offsetWidth;

  // Create a measuring clone
  const clone = el.cloneNode(false);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.width = originalWidth + 'px';
  clone.style.whiteSpace = 'normal';
  clone.style.wordWrap = 'break-word';
  document.body.appendChild(clone);

  // Measure which words fall on which line
  const lines = [];
  let currentLine = [];
  let lastTop = null;

  words.forEach((word) => {
    // Add word to clone as a span to measure position
    const span = document.createElement('span');
    span.textContent = (clone.childNodes.length > 0 ? ' ' : '') + word;
    span.style.display = 'inline';
    clone.appendChild(span);

    const top = span.getBoundingClientRect().top;

    if (lastTop !== null && top > lastTop) {
      // New line detected
      lines.push(currentLine.join(' '));
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
    lastTop = top;
  });

  // Push the last line
  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }

  // Remove measuring clone
  document.body.removeChild(clone);

  // Build the wrapped line DOM
  el.innerHTML = '';
  const lineInners = [];

  lines.forEach((lineText) => {
    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('line');
    lineWrapper.style.overflow = 'hidden';

    const lineInner = document.createElement('div');
    lineInner.classList.add('line-inner');
    lineInner.textContent = lineText;

    lineWrapper.appendChild(lineInner);
    el.appendChild(lineWrapper);
    lineInners.push(lineInner);
  });

  return lineInners;
}

/**
 * Split multiple elements at once.
 * @param {string|NodeList|HTMLElement[]} selector
 * @returns {HTMLElement[]} — All .line-inner elements
 */
export function splitAll(selector) {
  const elements = typeof selector === 'string'
    ? document.querySelectorAll(selector)
    : selector;

  const allInners = [];
  elements.forEach((el) => {
    const inners = splitLines(el);
    allInners.push(...inners);
  });
  return allInners;
}

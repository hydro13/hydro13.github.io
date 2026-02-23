// Terminal typewriter animation
(function () {
  const terminal = document.getElementById('terminal');
  if (!terminal) return;

  const lines = [
    { type: 'prompt', text: '$ ' },
    { type: 'command', text: 'kanbu start --workspace mblock', delay: 40 },
    { type: 'newline' },
    { type: 'output', text: '[kanbu] 154 MCP tools loaded ', instant: true },
    { type: 'success', text: '✓', instant: true },
    { type: 'newline' },
    { type: 'output', text: '[kanbu] Knowledge graph: online ', instant: true },
    { type: 'success', text: '✓', instant: true },
    { type: 'newline' },
    { type: 'pause', duration: 400 },
    { type: 'prompt', text: '$ ' },
    { type: 'command', text: 'sdr start --mode ads-b', delay: 40 },
    { type: 'newline' },
    { type: 'output', text: '[sdr] Tracking 12 aircraft above BRU ', instant: true },
    { type: 'success', text: '✓', instant: true },
    { type: 'newline' },
    { type: 'pause', duration: 400 },
    { type: 'prompt', text: '$ ' },
    { type: 'command', text: 'tandem status', delay: 40 },
    { type: 'newline' },
    { type: 'output', text: '[tandem] Browser ready, 180 threats blocked today ', instant: true },
    { type: 'success', text: '✓', instant: true },
    { type: 'newline' },
    { type: 'pause', duration: 300 },
    { type: 'prompt', text: '$ ' },
    { type: 'cursor' },
  ];

  let currentSpan = null;

  function createSpan(className) {
    const span = document.createElement('span');
    span.className = className;
    terminal.appendChild(span);
    return span;
  }

  async function typeChar(span, char, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        span.textContent += char;
        resolve();
      }, delay);
    });
  }

  async function pause(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async function runTerminal() {
    for (const line of lines) {
      if (line.type === 'newline') {
        terminal.appendChild(document.createElement('br'));
        continue;
      }

      if (line.type === 'pause') {
        await pause(line.duration);
        continue;
      }

      if (line.type === 'cursor') {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        terminal.appendChild(cursor);
        continue;
      }

      currentSpan = createSpan(line.type);

      if (line.instant) {
        currentSpan.textContent = line.text;
        await pause(80);
      } else {
        for (const char of line.text) {
          await typeChar(currentSpan, char, line.delay || 0);
        }
      }
    }
  }

  // Start after a short delay
  setTimeout(runTerminal, 600);
})();

// Scroll reveal animation
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger the animation based on position in grid
          const siblings = entry.target.parentElement.children;
          const index = Array.from(siblings).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.project-card, .skill-group, .hire-card').forEach(el => {
    observer.observe(el);
  });
})();

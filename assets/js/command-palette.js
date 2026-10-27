/**
 * Pulkit Tiwari Portfolio - Command Palette (Ctrl+K / Cmd+K)
 * Fast keyboard-first search navigation for recruiters and engineers.
 */

(function () {
  const modal = document.getElementById('cmd-palette-modal');
  const input = document.getElementById('cmd-search-input');
  const list = document.getElementById('cmd-results-list');
  const triggerBtn = document.getElementById('cmd-palette-btn');

  if (!modal || !input || !list) return;

  const actions = [
    { label: "Go to Hero & Summary", category: "Navigation", target: "#hero", icon: "🚀" },
    { label: "Test OpsPilot AI Triage Sandbox", category: "Interactive Sim", target: "#playground", icon: "🤖" },
    { label: "Test Real-Time Redis Cache Simulator", category: "Interactive Sim", target: "#playground", icon: "⚡" },
    { label: "View Flagship Projects", category: "Projects", target: "#projects", icon: "💻" },
    { label: "Explore Skills Matrix", category: "Skills", target: "#skills", icon: "🛠️" },
    { label: "View Experience & Internships", category: "Timeline", target: "#experience", icon: "💼" },
    { label: "View Certifications & CodeChef Rank", category: "Achievements", target: "#certifications", icon: "🏆" },
    { label: "Open Interactive Terminal CLI", category: "Terminal", target: "#terminal", icon: "⌨️" },
    { label: "View Full Resume (Printable ATS)", category: "Resume", action: () => window.openResumeModal(), icon: "📄" },
    { label: "Copy Email: Pulkittiwari7007@gmail.com", category: "Contact", action: () => window.copyEmailToClipboard(), icon: "📧" },
    { label: "Copy Phone: +91-7007107270", category: "Contact", action: () => window.copyPhoneToClipboard(), icon: "📱" },
    { label: "Visit GitHub Profile (Impulkit77)", category: "Social", action: () => window.open('https://github.com/Impulkit77', '_blank'), icon: "🐙" },
    { label: "Visit LinkedIn Profile", category: "Social", action: () => window.open('https://linkedin.com/in/pulkit-tiwari-734a1a387', '_blank'), icon: "🔗" }
  ];

  let selectedIndex = 0;
  let filteredActions = [...actions];

  function openPalette() {
    modal.classList.add('open');
    input.value = '';
    renderResults(actions);
    input.focus();
    if (window.audioFx) window.audioFx.playLaser();
  }

  function closePalette() {
    modal.classList.remove('open');
  }

  function renderResults(items) {
    filteredActions = items;
    selectedIndex = 0;
    list.innerHTML = '';

    if (items.length === 0) {
      list.innerHTML = `<div style="padding: 18px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching commands found.</div>`;
      return;
    }

    items.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = `cmd-item ${index === 0 ? 'selected' : ''}`;
      el.innerHTML = `
        <div class="cmd-item-left">
          <span>${item.icon}</span>
          <span>${item.label}</span>
        </div>
        <span class="cmd-item-hint">${item.category}</span>
      `;

      el.addEventListener('click', () => {
        executeItem(item);
      });

      list.appendChild(el);
    });
  }

  function executeItem(item) {
    closePalette();
    if (item.target) {
      const el = document.querySelector(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action) {
      item.action();
    }
    if (window.audioFx) window.audioFx.playClick();
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    // Open on Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    }

    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredActions.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredActions.length;
        updateSelectedHighlight();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredActions.length > 0) {
        selectedIndex = (selectedIndex - 1 + filteredActions.length) % filteredActions.length;
        updateSelectedHighlight();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        executeItem(filteredActions[selectedIndex]);
      }
    }
  });

  function updateSelectedHighlight() {
    const items = list.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    const filtered = actions.filter(a => a.label.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    renderResults(filtered);
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePalette();
    }
  });
})();

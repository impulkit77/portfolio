/**
 * Pulkit Tiwari Portfolio - Main Application Logic
 * Orchestrates dynamic typing, theme switcher, modals, toast feedback, and interactions.
 */

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
window.showToast = function (message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-cyan); font-size: 1.1rem;">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOutToast 0.3s ease-in forwards';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
};

// Clipboard Helpers
window.copyEmailToClipboard = function () {
  navigator.clipboard.writeText('Pulkittiwari7007@gmail.com').then(() => {
    window.showToast('Copied email (Pulkittiwari7007@gmail.com) to clipboard!');
    if (window.audioFx) window.audioFx.playSuccess();
  });
};

window.copyPhoneToClipboard = function () {
  navigator.clipboard.writeText('+91-7007107270').then(() => {
    window.showToast('Copied phone (+91-7007107270) to clipboard!');
    if (window.audioFx) window.audioFx.playSuccess();
  });
};

// ==========================================================================
// Dynamic Role Typing Effect
// ==========================================================================
function initTypingHeadline() {
  const target = document.getElementById('typing-role');
  if (!target) return;

  const roles = [
    "Full Stack Developer",
    "Applied AI & RAG Engineer",
    "High-Performance Systems Builder",
    "LLM Tool-Calling Specialist"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ==========================================================================
// Theme Switcher (Obsidian Cyber / Matrix Terminal / Clean Light)
// ==========================================================================
function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const themes = ['cyber', 'matrix', 'light'];
  let currentThemeIdx = 0;

  // Restore saved theme
  const saved = localStorage.getItem('pulkit-portfolio-theme');
  if (saved && themes.includes(saved)) {
    document.documentElement.setAttribute('data-theme', saved);
    currentThemeIdx = themes.indexOf(saved);
  }

  themeBtn.addEventListener('click', () => {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    const nextTheme = themes[currentThemeIdx];
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('pulkit-portfolio-theme', nextTheme);

    const themeIcons = { cyber: '🌙', matrix: '🟢', light: '☀️' };
    themeBtn.innerHTML = themeIcons[nextTheme] || '🎨';

    window.showToast(`Switched theme to ${nextTheme.toUpperCase()}`);
    if (window.audioFx) window.audioFx.playClick();
  });
}

// ==========================================================================
// Sound FX Audio Toggle
// ==========================================================================
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    const isUnmuted = window.audioFx.toggleMute();
    soundBtn.classList.toggle('active', isUnmuted);
    soundBtn.innerHTML = isUnmuted ? '🔊' : '🔇';
    soundBtn.title = isUnmuted ? 'Audio FX Enabled' : 'Audio FX Muted';
    window.showToast(isUnmuted ? 'Audio FX Enabled 🔊' : 'Audio FX Muted 🔇');
  });
}

// ==========================================================================
// Mobile Nav Menu Toggle
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
    if (window.audioFx) window.audioFx.playClick();
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      navLinks.classList.remove('mobile-open');
    });
  });
}

// ==========================================================================
// Projects Filter
// ==========================================================================
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.classList.add('revealed');
        } else {
          card.style.display = 'none';
        }
      });

      if (window.audioFx) window.audioFx.playClick();
    });
  });
}

// ==========================================================================
// Skills Category Filter
// ==========================================================================
function initSkillsFilter() {
  const catBtns = document.querySelectorAll('.skill-cat-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;

      skillCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.audioFx) window.audioFx.playClick();
    });
  });
}

// ==========================================================================
// Interactive Resume Modal Viewer
// ==========================================================================
window.openResumeModal = function () {
  const modal = document.getElementById('resume-modal');
  if (modal) {
    modal.classList.add('open');
    if (window.audioFx) window.audioFx.playLaser();
  }
};

window.closeResumeModal = function () {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.remove('open');
};

// ==========================================================================
// Interactive Project Deep-Dive Modal
// ==========================================================================
const projectDeepDives = {
  opspilot: {
    title: "OpsPilot – AI Support & Triage Agent Platform",
    tagline: "Applied AI / Full Stack (2026)",
    image: "assets/images/opspilot.jpg",
    problem: "Modern customer support teams struggle with high ticket volume, slow triage routing, and generic hallucinations from off-the-shelf LLMs without domain grounding or deterministic guardrails.",
    solution: "A production-grade agentic triage platform pairing pgvector dense embeddings with Postgres full-text BM25 search via Reciprocal Rank Fusion (RRF). Coupled with a tool-calling Claude agent that classifies tickets, drafts replies, opens GitHub issues, and verifies confidence thresholds.",
    keyMetrics: [
      "Hybrid RAG (pgvector + BM25 RRF)",
      "Strict 'I don't know' fallback below 0.65 confidence",
      "Model Context Protocol (MCP) server integration",
      "Slack Bolt bot with inline citation streaming & feedback capture",
      "Automated LLM-as-judge eval suite in CI/CD"
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Claude API", "MCP", "Slack Bolt", "Next.js", "TypeScript", "Docker"],
    githubUrl: "https://github.com/Impulkit77"
  },
  redis_cache: {
    title: "Real-Time Caching & Session Management System",
    tagline: "High-Performance Distributed Systems / Redis & Java (2026)",
    image: "assets/images/redis-system.jpg",
    problem: "Direct database read saturation across 5+ backend services caused latency spikes exceeding 140ms and connection pool exhaustion during peak concurrent user spikes.",
    solution: "Engineered an end-to-end caching layer with Redis key-value structures, TTL policies, and Redis Pub/Sub + Sorted Sets for real-time leaderboards. Implemented a multi-threaded Java Spring Boot consumer and interactive telemetry dashboard.",
    keyMetrics: [
      "91% Cache Hit Ratio achieved across 5+ backend services",
      "18% Latency Reduction compared to direct database queries",
      "Stress tested and benchmarked across 10,000+ requests",
      "Real-time Pub/Sub notification pipeline",
      "Interactive Spring Boot telemetry & expiration visualizer"
    ],
    stack: ["Java", "Spring Boot", "Redis", "Maven", "JUnit", "HTML5", "CSS3", "Docker"],
    githubUrl: "https://github.com/Impulkit77"
  }
};

window.openProjectModal = function (projectId) {
  const modal = document.getElementById('project-modal');
  const details = projectDeepDives[projectId];
  if (!modal || !details) return;

  document.getElementById('modal-project-title').textContent = details.title;
  document.getElementById('modal-project-tagline').textContent = details.tagline;
  document.getElementById('modal-project-img').src = details.image;
  document.getElementById('modal-project-problem').textContent = details.problem;
  document.getElementById('modal-project-solution').textContent = details.solution;

  const metricsList = document.getElementById('modal-project-metrics');
  metricsList.innerHTML = details.keyMetrics.map(m => `<li>${m}</li>`).join('');

  const stackRow = document.getElementById('modal-project-stack');
  stackRow.innerHTML = details.stack.map(s => `<span class="tag-badge cyan">${s}</span>`).join('');

  document.getElementById('modal-project-github').href = details.githubUrl;

  modal.classList.add('open');
  if (window.audioFx) window.audioFx.playLaser();
};

window.closeProjectModal = function () {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('open');
};

// ==========================================================================
// Contact Form Handler
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const topicChips = document.querySelectorAll('.topic-chip');
  const subjectInput = document.getElementById('contact-subject');

  if (topicChips.length > 0 && subjectInput) {
    topicChips.forEach(chip => {
      chip.addEventListener('click', () => {
        topicChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        subjectInput.value = chip.dataset.topic;
        if (window.audioFx) window.audioFx.playClick();
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email) {
        window.showToast('Please provide your name and email address.');
        return;
      }

      window.showToast(`Thank you, ${name}! Your message has been recorded. Pulkit will reply shortly.`);
      if (window.audioFx) window.audioFx.playSuccess();
      form.reset();
    });
  }
}

// ==========================================================================
// Scroll Reveal Observer
// ==========================================================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

// Navbar Scroll Shadow
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Close modals when clicking backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTypingHeadline();
  initThemeSwitcher();
  initSoundToggle();
  initMobileNav();
  initProjectsFilter();
  initSkillsFilter();
  initContactForm();
  initScrollReveal();
});

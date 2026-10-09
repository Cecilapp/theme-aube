/* Aube theme for Cecil */
(() => {
  'use strict';

  // Color mode: light, dark or auto
  const preferredMode = () => localStorage.getItem('theme') || document.documentElement.dataset.defaultTheme || 'auto';
  const applyMode = (mode) => {
    const dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
  };
  const showActiveMode = (mode) => {
    document.querySelectorAll('[data-bs-theme-value]').forEach((el) => {
      const active = el.getAttribute('data-bs-theme-value') === mode;
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', active);
    });
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (preferredMode() === 'auto') applyMode('auto');
  });

  // "Copy" button on code blocks
  const copyCode = () => {
    const tpl = document.getElementById('copy-button-template');
    if (!tpl || !navigator.clipboard) return;
    document.querySelectorAll('.content pre > code').forEach((code) => {
      const btn = tpl.content.firstElementChild.cloneNode(true);
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.innerText).then(() => {
          btn.classList.add('copied');
          setTimeout(() => btn.classList.remove('copied'), 2000);
        });
      });
      code.parentNode.appendChild(btn);
    });
  };

  // Highlight the current heading in the table of contents
  const tocSpy = () => {
    const links = document.querySelectorAll('.toc a[href*="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map();
    links.forEach((a) => {
      const target = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (target) map.set(target, a);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => a.classList.remove('active'));
          map.get(entry.target).classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -75% 0px' });
    map.forEach((_, target) => observer.observe(target));
  };

  window.addEventListener('DOMContentLoaded', () => {
    showActiveMode(preferredMode());
    document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const mode = toggle.getAttribute('data-bs-theme-value');
        localStorage.setItem('theme', mode);
        applyMode(mode);
        showActiveMode(mode);
      });
    });
    copyCode();
    tocSpy();
  });
})();

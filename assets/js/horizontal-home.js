/* =========================================================
   LAB HOMEPAGE — FULLSCREEN HORIZONTAL SLIDES
   Robust version: does not assume a specific HugoBlox DOM nesting.
   ========================================================= */
(function () {
  'use strict';

  function initHorizontalHome() {
    if (window.__LAB_HORIZONTAL_HOME__) return;

    const pageBody = document.querySelector('.page-body');
    if (!pageBody) return;

    const slides = Array.from(pageBody.querySelectorAll(':scope > .home-section'));
    if (slides.length < 2) return;

    window.__LAB_HORIZONTAL_HOME__ = true;

    const total = slides.length;
    let current = 0;
    let locked = false;
    let startX = 0;
    let startY = 0;

    const track = document.createElement('div');
    track.className = 'horizontal-home-track';
    track.style.width = `${total * 100}vw`;

    slides.forEach((slide) => track.appendChild(slide));
    pageBody.replaceChildren(track);
    pageBody.style.width = '100vw';
    pageBody.style.height = '100vh';
    pageBody.style.minHeight = '100vh';
    pageBody.style.margin = '0';
    pageBody.style.padding = '0';
    pageBody.style.overflow = 'hidden';

    document.documentElement.classList.add('horizontal-home-active');
    document.body.classList.add('horizontal-home-active');

    const dots = document.createElement('div');
    dots.className = 'horizontal-home-dots';
    dots.setAttribute('aria-label', 'Homepage sections');

    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'horizontal-home-arrow prev';
    prev.innerHTML = '&#8249;';
    prev.setAttribute('aria-label', '上一页');

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'horizontal-home-arrow next';
    next.innerHTML = '&#8250;';
    next.setAttribute('aria-label', '下一页');

    function updateUI() {
      dots.querySelectorAll('.horizontal-home-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
        dot.setAttribute('aria-current', i === current ? 'page' : 'false');
      });
      prev.disabled = current === 0;
      next.disabled = current === total - 1;
    }

    function goTo(index, immediate) {
      current = Math.max(0, Math.min(index, total - 1));
      track.style.transitionDuration = immediate ? '0ms' : '720ms';
      track.style.transform = `translate3d(-${current * 100}vw, 0, 0)`;
      updateUI();
    }

    function step(direction) {
      if (locked) return;
      const target = Math.max(0, Math.min(current + direction, total - 1));
      if (target === current) return;
      locked = true;
      goTo(target, false);
      window.setTimeout(() => { locked = false; }, 760);
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'horizontal-home-dot';
      dot.setAttribute('aria-label', `第 ${i + 1} 个页面`);
      dot.addEventListener('click', () => goTo(i, false));
      dots.appendChild(dot);
    });

    prev.addEventListener('click', () => goTo(current - 1, false));
    next.addEventListener('click', () => goTo(current + 1, false));
    document.body.appendChild(dots);
    document.body.appendChild(prev);
    document.body.appendChild(next);

    window.addEventListener('wheel', (event) => {
      if (!document.body.classList.contains('horizontal-home-active')) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (Math.abs(event.deltaY) < 10) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0, false);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(total - 1, false);
      }
    });

    window.addEventListener('touchstart', (event) => {
      if (!event.touches.length) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (event) => {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      step(dx < 0 ? 1 : -1);
    }, { passive: true });

    window.addEventListener('resize', () => {
      track.style.width = `${total * 100}vw`;
      goTo(current, true);
    });

    goTo(0, true);
  }

  function boot() {
    initHorizontalHome();
    if (!window.__LAB_HORIZONTAL_HOME__) {
      window.setTimeout(initHorizontalHome, 250);
      window.setTimeout(initHorizontalHome, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

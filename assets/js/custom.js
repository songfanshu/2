/* =========================================================
   FULLSCREEN HORIZONTAL HOMEPAGE CONTROLLER
   Home -> News -> Vision -> Publications -> Team
   ========================================================= */
(function () {
  'use strict';

  function initHorizontalHomepage() {
    const sections = Array.from(document.querySelectorAll('body.page-wrapper > .page-body > .home-section'));
    const track = document.querySelector('body.page-wrapper > .page-body');

    if (!track || sections.length === 0) return;

    let current = 0;
    let locked = false;
    let touchStartX = 0;
    let touchStartY = 0;

    /* Always derive the number of slides from the actual homepage. */
    const total = sections.length;
    track.style.width = `${total * 100}vw`;

    /* Build slide dots. */
    const dots = document.createElement('div');
    dots.className = 'horizontal-slide-dots';
    dots.setAttribute('aria-label', 'Homepage sections');

    sections.forEach((section, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'horizontal-slide-dot';
      dot.setAttribute('aria-label', `Go to section ${index + 1}`);
      dot.addEventListener('click', () => goTo(index));
      dots.appendChild(dot);
    });
    document.body.appendChild(dots);

    /* Build arrow controls. */
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'horizontal-slide-arrow prev';
    prev.setAttribute('aria-label', 'Previous section');
    prev.innerHTML = '&#8249;';
    prev.addEventListener('click', () => goTo(current - 1));

    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'horizontal-slide-arrow next';
    next.setAttribute('aria-label', 'Next section');
    next.innerHTML = '&#8250;';
    next.addEventListener('click', () => goTo(current + 1));

    document.body.appendChild(prev);
    document.body.appendChild(next);

    function updateUI() {
      dots.querySelectorAll('.horizontal-slide-dot').forEach((dot, i) => {
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
      goTo(target);
      window.setTimeout(() => { locked = false; }, 760);
    }

    /* Mouse wheel: one wheel gesture = one horizontal page. */
    window.addEventListener('wheel', function (event) {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < 12) return;
      step(event.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    /* Keyboard navigation. */
    window.addEventListener('keydown', function (event) {
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
        goTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(total - 1);
      }
    });

    /* Touch swipe navigation. */
    window.addEventListener('touchstart', function (event) {
      if (!event.touches.length) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      step(dx < 0 ? 1 : -1);
    }, { passive: true });

    /* Keep the current slide aligned after viewport resize/orientation changes. */
    window.addEventListener('resize', function () {
      track.style.width = `${total * 100}vw`;
      goTo(current, true);
    });

    updateUI();
    goTo(0, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHorizontalHomepage);
  } else {
    initHorizontalHomepage();
  }
})();

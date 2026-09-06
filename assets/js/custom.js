/* Horizontal homepage navigation for HugoBlox. */
(function () {
  'use strict';

  var state = {
    current: 0,
    locked: false,
    startX: 0,
    startY: 0
  };

  function boot() {
    if (window.__LAB_HORIZONTAL_READY__) return;

    var body = document.body;
    var pageBody = document.querySelector('body.page-wrapper > .page-body') ||
      document.querySelector('.page-body');

    if (!body || !pageBody) return;

    var slides = Array.prototype.slice.call(
      pageBody.querySelectorAll(':scope > .home-section')
    );

    if (slides.length < 2) {
      slides = Array.prototype.slice.call(pageBody.querySelectorAll('.home-section'));
    }

    if (slides.length < 2) return;

    window.__LAB_HORIZONTAL_READY__ = true;

    var track = document.createElement('div');
    track.className = 'lab-horizontal-track';
    slides.forEach(function (slide) {
      slide.classList.add('lab-horizontal-slide');
      track.appendChild(slide);
    });

    pageBody.replaceChildren(track);
    body.classList.add('lab-horizontal-home');
    document.documentElement.classList.add('lab-horizontal-home');

    var total = slides.length;
    var dots = document.createElement('div');
    dots.className = 'lab-slide-dots';
    dots.setAttribute('aria-label', '首页页面导航');

    function update() {
      track.style.width = (total * 100) + 'vw';
      track.style.transform = 'translate3d(-' + (state.current * 100) + 'vw, 0, 0)';
      dots.querySelectorAll('.lab-slide-dot').forEach(function (dot, index) {
        dot.classList.toggle('active', index === state.current);
        dot.setAttribute('aria-current', index === state.current ? 'page' : 'false');
      });
      prev.disabled = state.current === 0;
      next.disabled = state.current === total - 1;
    }

    function goTo(index, immediate) {
      state.current = Math.max(0, Math.min(index, total - 1));
      track.style.transitionDuration = immediate ? '0ms' : '700ms';
      update();
    }

    function step(direction) {
      if (state.locked) return;
      var target = Math.max(0, Math.min(state.current + direction, total - 1));
      if (target === state.current) return;
      state.locked = true;
      goTo(target, false);
      window.setTimeout(function () { state.locked = false; }, 760);
    }

    for (var index = 0; index < total; index += 1) {
      (function (slideIndex) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lab-slide-dot';
        dot.setAttribute('aria-label', '跳转到第 ' + (slideIndex + 1) + ' 页');
        dot.addEventListener('click', function () { goTo(slideIndex, false); });
        dots.appendChild(dot);
      })(index);
    }

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'lab-slide-arrow lab-slide-prev';
    prev.innerHTML = '&#10094;';
    prev.setAttribute('aria-label', '上一页');
    prev.addEventListener('click', function () { step(-1); });

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'lab-slide-arrow lab-slide-next';
    next.innerHTML = '&#10095;';
    next.setAttribute('aria-label', '下一页');
    next.addEventListener('click', function () { step(1); });

    body.appendChild(dots);
    body.appendChild(prev);
    body.appendChild(next);

    window.addEventListener('wheel', function (event) {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
      var tag = document.activeElement && document.activeElement.tagName;
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

    window.addEventListener('touchstart', function (event) {
      if (!event.touches.length) return;
      state.startX = event.touches[0].clientX;
      state.startY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - state.startX;
      var dy = event.changedTouches[0].clientY - state.startY;
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy)) {
        step(dx < 0 ? 1 : -1);
      }
    }, { passive: true });

    window.addEventListener('resize', function () { goTo(state.current, true); });
    goTo(0, true);
  }

  function scheduleBoot() {
    boot();
    window.setTimeout(boot, 300);
    window.setTimeout(boot, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleBoot);
  } else {
    scheduleBoot();
  }
  window.addEventListener('load', scheduleBoot);
})();

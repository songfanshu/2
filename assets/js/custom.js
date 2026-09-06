/* =========================================================
   LAB HOMEPAGE — REAL FULLSCREEN HORIZONTAL SLIDES
   Loaded by HugoBlox as the site's custom JavaScript.
   ========================================================= */
(function () {
  'use strict';

  function boot() {
    if (window.__LAB_HORIZONTAL_READY__) return;

    var body = document.body;
    if (!body) return;

    var pageBody = document.querySelector('.page-body');
    if (!pageBody) return;

    var slides = Array.prototype.slice.call(pageBody.querySelectorAll('.home-section'));
    if (slides.length < 2) return;

    window.__LAB_HORIZONTAL_READY__ = true;

    var track = document.createElement('div');
    track.className = 'lab-horizontal-track';

    slides.forEach(function (slide) {
      slide.classList.add('lab-horizontal-slide');
      track.appendChild(slide);
    });

    pageBody.innerHTML = '';
    pageBody.appendChild(track);

    var total = slides.length;
    var current = 0;
    var locked = false;
    var touchStartX = 0;
    var touchStartY = 0;

    function update() {
      track.style.transform = 'translate3d(-' + (current * 100) + 'vw,0,0)';
      document.querySelectorAll('.lab-slide-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
      prev.disabled = current === 0;
      next.disabled = current === total - 1;
    }

    function go(index) {
      current = Math.max(0, Math.min(index, total - 1));
      track.style.transitionDuration = '700ms';
      update();
    }

    function step(direction) {
      if (locked) return;
      var target = Math.max(0, Math.min(current + direction, total - 1));
      if (target === current) return;
      locked = true;
      go(target);
      window.setTimeout(function () { locked = false; }, 760);
    }

    var dots = document.createElement('div');
    dots.className = 'lab-slide-dots';

    for (var i = 0; i < total; i++) {
      (function (index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'lab-slide-dot';
        dot.setAttribute('aria-label', '第 ' + (index + 1) + ' 页');
        dot.addEventListener('click', function () { go(index); });
        dots.appendChild(dot);
      })(i);
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
    body.classList.add('lab-horizontal-home');
    document.documentElement.classList.add('lab-horizontal-home');

    window.addEventListener('wheel', function (event) {
      if (!document.body.classList.contains('lab-horizontal-home')) return;
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      step(event.deltaY > 0 ? 1 : -1);
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault(); step(1);
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault(); step(-1);
      } else if (event.key === 'Home') {
        event.preventDefault(); go(0);
      } else if (event.key === 'End') {
        event.preventDefault(); go(total - 1);
      }
    });

    window.addEventListener('touchstart', function (event) {
      if (!event.touches.length) return;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - touchStartX;
      var dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      step(dx < 0 ? 1 : -1);
    }, { passive: true });

    window.addEventListener('resize', function () { update(); });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', boot);
})();

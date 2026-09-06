/* Robust fullscreen horizontal homepage controller. */
(function () {
  'use strict';

  function getSlides(pageBody) {
    var selectors = [
      ':scope > .home-section',
      ':scope > section.home-section',
      ':scope > section[class*="wg-"]',
      ':scope > .wg-hero',
      ':scope > .wg-collection',
      ':scope > .wg-markdown',
      ':scope > .wg-people'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var found = Array.prototype.slice.call(pageBody.querySelectorAll(selectors[i]));
      if (found.length >= 2) return found;
    }
    return Array.prototype.slice.call(pageBody.querySelectorAll('.home-section, section[class*="wg-"]'));
  }

  function boot() {
    if (window.__LAB_HORIZONTAL_READY__) return;
    var pageBody = document.querySelector('.page-body');
    if (!pageBody) return;

    var slides = getSlides(pageBody);
    if (slides.length < 2) return;
    window.__LAB_HORIZONTAL_READY__ = true;

    var track = document.createElement('div');
    track.className = 'lab-horizontal-track';
    slides.forEach(function (slide) {
      slide.classList.add('lab-horizontal-slide');
      track.appendChild(slide);
    });
    pageBody.replaceChildren(track);
    document.documentElement.classList.add('lab-horizontal-home');
    document.body.classList.add('lab-horizontal-home');

    var total = slides.length, current = 0, locked = false, startX = 0, startY = 0;
    var dots = document.createElement('div');
    dots.className = 'lab-slide-dots';
    dots.setAttribute('aria-label', '首页页面导航');
    var prev = document.createElement('button');
    prev.type = 'button'; prev.className = 'lab-slide-arrow lab-slide-prev';
    prev.innerHTML = '&#10094;'; prev.setAttribute('aria-label', '上一页');
    var next = document.createElement('button');
    next.type = 'button'; next.className = 'lab-slide-arrow lab-slide-next';
    next.innerHTML = '&#10095;'; next.setAttribute('aria-label', '下一页');

    function update(immediate) {
      track.style.width = (total * 100) + 'vw';
      track.style.transitionDuration = immediate ? '0ms' : '700ms';
      track.style.transform = 'translate3d(-' + (current * 100) + 'vw,0,0)';
      dots.querySelectorAll('.lab-slide-dot').forEach(function (dot, index) {
        dot.classList.toggle('active', index === current);
        dot.setAttribute('aria-current', index === current ? 'page' : 'false');
      });
      prev.disabled = current === 0; next.disabled = current === total - 1;
    }
    function goTo(index, immediate) {
      current = Math.max(0, Math.min(index, total - 1)); update(immediate);
    }
    function step(direction) {
      if (locked) return;
      var target = Math.max(0, Math.min(current + direction, total - 1));
      if (target === current) return;
      locked = true; goTo(target, false);
      window.setTimeout(function () { locked = false; }, 760);
    }
    slides.forEach(function (_, index) {
      var dot = document.createElement('button');
      dot.type = 'button'; dot.className = 'lab-slide-dot';
      dot.setAttribute('aria-label', '跳转到第 ' + (index + 1) + ' 页');
      dot.addEventListener('click', function () { goTo(index, false); });
      dots.appendChild(dot);
    });
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    document.body.appendChild(dots); document.body.appendChild(prev); document.body.appendChild(next);

    window.addEventListener('wheel', function (event) {
      if (Math.abs(event.deltaY) < 8 && Math.abs(event.deltaX) < 8) return;
      event.preventDefault();
      step((Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX) > 0 ? 1 : -1);
    }, { passive: false });

    window.addEventListener('keydown', function (event) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); step(1); }
      else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); step(-1); }
      else if (event.key === 'Home') { event.preventDefault(); goTo(0, false); }
      else if (event.key === 'End') { event.preventDefault(); goTo(total - 1, false); }
    });
    window.addEventListener('touchstart', function (event) {
      if (event.touches.length) { startX = event.touches[0].clientX; startY = event.touches[0].clientY; }
    }, { passive: true });
    window.addEventListener('touchend', function (event) {
      if (!event.changedTouches.length) return;
      var dx = event.changedTouches[0].clientX - startX, dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    }, { passive: true });
    window.addEventListener('resize', function () { update(true); });
    update(true);
  }

  function scheduleBoot() { boot(); window.setTimeout(boot, 200); window.setTimeout(boot, 800); window.setTimeout(boot, 1800); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleBoot); else scheduleBoot();
  window.addEventListener('load', scheduleBoot);
})();

/* Lanzalab-inspired horizontal full-screen navigation */
document.addEventListener('DOMContentLoaded', function () {
  const sections = Array.from(document.querySelectorAll('.home-section'));
  const track = document.querySelector('.page-wrapper') || document.querySelector('.main-container');

  if (!sections.length || !track) return;

  let currentIndex = 0;
  let isAnimating = false;
  let wheelLocked = false;
  let touchStartX = 0;
  let touchStartY = 0;

  /* Create compact slide indicators */
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'scroll-dots';
  const dotsList = document.createElement('ul');

  sections.forEach((section, index) => {
    const li = document.createElement('li');
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'scroll-dot';
    dot.setAttribute('aria-label', `跳转到第 ${index + 1} 屏`);
    dot.addEventListener('click', () => goTo(index));
    li.appendChild(dot);
    dotsList.appendChild(li);
  });

  dotsContainer.appendChild(dotsList);
  document.body.appendChild(dotsContainer);

  /* Arrow navigation */
  const prev = document.createElement('button');
  const next = document.createElement('button');
  prev.type = next.type = 'button';
  prev.className = 'horizontal-arrow prev';
  next.className = 'horizontal-arrow next';
  prev.innerHTML = '&#8592;';
  next.innerHTML = '&#8594;';
  prev.setAttribute('aria-label', '上一屏');
  next.setAttribute('aria-label', '下一屏');
  document.body.appendChild(prev);
  document.body.appendChild(next);

  function updateUI() {
    dotsList.querySelectorAll('.scroll-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === sections.length - 1;
  }

  function goTo(index, immediate = false) {
    const target = Math.max(0, Math.min(index, sections.length - 1));
    if (target === currentIndex && !immediate) return;

    currentIndex = target;
    updateUI();

    const left = sections[target].offsetLeft;
    const duration = immediate ? '0ms' : '650ms';

    track.style.transition = `transform ${duration} cubic-bezier(.22,.61,.36,1)`;
    track.style.transform = `translate3d(${-left}px, 0, 0)`;

    isAnimating = !immediate;
    if (!immediate) {
      window.setTimeout(() => {
        isAnimating = false;
      }, 700);
    }
  }

  function nextSlide() { goTo(currentIndex + 1); }
  function prevSlide() { goTo(currentIndex - 1); }

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);

  /* Mouse wheel -> one horizontal slide at a time */
  window.addEventListener('wheel', function (event) {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();

    if (wheelLocked || isAnimating) return;
    wheelLocked = true;

    if (event.deltaY > 0) nextSlide();
    else prevSlide();

    window.setTimeout(() => {
      wheelLocked = false;
    }, 720);
  }, { passive: false });

  /* Keyboard navigation */
  document.addEventListener('keydown', function (event) {
    if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      nextSlide();
    } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(sections.length - 1);
    }
  });

  /* Touch swipe */
  document.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (event) {
    if (isAnimating) return;
    const touch = event.changedTouches[0];
    const diffX = touchStartX - touch.clientX;
    const diffY = touchStartY - touch.clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 55) {
      if (diffX > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  /* Keep the active slide correct after resize */
  window.addEventListener('resize', function () {
    goTo(currentIndex, true);
  });

  updateUI();
  goTo(0, true);
});

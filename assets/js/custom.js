// 自动水平滚动 + 圆点指示器（每5秒自动切换）
(function() {
    const intervalTime = 5000;      // 5秒
    const pauseAfterManual = 10000; // 手动后暂停10秒

    let currentIndex = 0;
    let autoScrollTimer = null;
    let pauseTimer = null;
    let isAutoScrolling = true;
    let sections = [];
    let dotsContainer = null;
    let dots = [];

    function getScrollContainer() {
        return document.scrollingElement || document.documentElement;
    }

    function getSections() {
        return Array.from(document.querySelectorAll('.home-section'));
    }

    function scrollToIndex(index) {
        if (!sections.length) return;
        index = Math.max(0, Math.min(index, sections.length - 1));
        const target = sections[index];
        if (target) {
            const container = getScrollContainer();
            const targetLeft = target.offsetLeft;
            container.scrollTo({ left: targetLeft, behavior: 'smooth' });
            currentIndex = index;
            updateActiveDot(currentIndex);
        }
    }

    function scrollToNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= sections.length) nextIndex = 0;
        scrollToIndex(nextIndex);
    }

    function startAutoScroll() {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(() => {
            if (isAutoScrolling) scrollToNext();
        }, intervalTime);
    }

    function pauseAutoScroll() {
        if (!isAutoScrolling) return;
        isAutoScrolling = false;
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => {
            isAutoScrolling = true;
        }, pauseAfterManual);
    }

    function updateCurrentIndexFromScroll() {
        const container = getScrollContainer();
        const scrollLeft = container.scrollLeft;
        let newIndex = 0;
        for (let i = 0; i < sections.length; i++) {
            const left = sections[i].offsetLeft;
            if (scrollLeft >= left - 50) newIndex = i;
            else break;
        }
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateActiveDot(currentIndex);
        }
    }

    let scrollTimeout = null;
    function onManualScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        if (isAutoScrolling) pauseAutoScroll();
        scrollTimeout = setTimeout(() => {
            updateCurrentIndexFromScroll();
        }, 150);
    }

    function createDots() {
        if (dotsContainer) return;
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'scroll-dots';
        sections.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'scroll-dot';
            dot.setAttribute('data-index', idx);
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(dot.getAttribute('data-index'));
                if (!isNaN(index)) {
                    if (isAutoScrolling) pauseAutoScroll();
                    scrollToIndex(index);
                }
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
        document.body.appendChild(dotsContainer);
        updateActiveDot(currentIndex);
    }

    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function rebuildDots() {
        if (dotsContainer) dotsContainer.remove();
        dots = [];
        createDots();
    }

    function init() {
        sections = getSections();
        if (sections.length <= 1) return;

        createDots();

        window.addEventListener('resize', () => {
            sections = getSections();
            rebuildDots();
            updateCurrentIndexFromScroll();
        });

        const container = getScrollContainer();
        container.addEventListener('scroll', onManualScroll);

        startAutoScroll();

        setTimeout(() => {
            scrollToIndex(0);
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

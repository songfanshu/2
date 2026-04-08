// 自动水平滚动 + 圆点指示器（完整版，每5秒自动切换）
(function() {
    const intervalTime = 5000;      // 自动滚动间隔：5秒
    const pauseAfterManual = 10000; // 手动滚动后暂停自动滚动的时间：10秒

    let currentIndex = 0;
    let autoScrollTimer = null;
    let pauseTimer = null;
    let isAutoScrolling = true;
    let sections = [];
    let dotsContainer = null;
    let dots = [];

    // 获取滚动容器
    function getScrollContainer() {
        return document.scrollingElement || document.documentElement;
    }

    // 获取所有横向区块
    function getSections() {
        return Array.from(document.querySelectorAll('.home-section'));
    }

    // 滚动到指定索引的区块
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

    // 滚动到下一个区块（循环）
    function scrollToNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= sections.length) nextIndex = 0;
        scrollToIndex(nextIndex);
    }

    // 启动自动滚动定时器
    function startAutoScroll() {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(() => {
            if (isAutoScrolling) scrollToNext();
        }, intervalTime);
    }

    // 暂停自动滚动（临时）
    function pauseAutoScroll() {
        if (!isAutoScrolling) return;
        isAutoScrolling = false;
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => {
            isAutoScrolling = true;
        }, pauseAfterManual);
    }

    // 根据滚动位置更新当前索引和圆点
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

    // 手动滚动时的处理
    let scrollTimeout = null;
    function onManualScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        if (isAutoScrolling) pauseAutoScroll();
        scrollTimeout = setTimeout(() => {
            updateCurrentIndexFromScroll();
        }, 150);
    }

    // 创建圆点指示器
    function createDots() {
        if (dotsContainer) return;
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'scroll-dots';
        dotsContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 12px;
            z-index: 1050;
            pointer-events: none;
        `;
        sections.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'scroll-dot';
            dot.setAttribute('data-index', idx);
            dot.style.cssText = `
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.5);
                border: none;
                cursor: pointer;
                pointer-events: auto;
                transition: all 0.2s ease;
                padding: 0;
                margin: 0;
            `;
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

    // 更新激活圆点
    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.style.backgroundColor = '#ffffff';
                dot.style.transform = 'scale(1.3)';
            } else {
                dot.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                dot.style.transform = 'scale(1)';
            }
        });
    }

    // 重建圆点（窗口大小改变时）
    function rebuildDots() {
        if (dotsContainer) dotsContainer.remove();
        dots = [];
        createDots();
    }

    // 初始化
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

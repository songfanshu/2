// 自动水平滚动功能 + 圆点指示器
(function() {
    const intervalTime = 5000;      // 自动滚动间隔（毫秒），5秒
    const pauseAfterManual = 10000; // 手动滚动后暂停自动滚动的时间（毫秒），10秒

    let currentIndex = 0;
    let autoScrollTimer = null;
    let pauseTimer = null;
    let isAutoScrolling = true;
    let sections = [];
    let dotsContainer = null;
    let dots = [];

    // 获取滚动容器（body 本身就是滚动容器，因为设置了 overflow-x: auto）
    function getScrollContainer() {
        return document.scrollingElement || document.documentElement;
    }

    // 获取所有横向区块（.home-section）
    function getSections() {
        return Array.from(document.querySelectorAll('.home-section'));
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
        // 为了让圆点可点击，每个圆点需要独立的事件层
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
                    // 点击时暂停自动滚动
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

    // 滚动到指定索引的区块
    function scrollToIndex(index) {
        if (!sections.length) return;
        if (index < 0) index = 0;
        if (index >= sections.length) index = 0;
        const target = sections[index];
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            currentIndex = index;
            updateActiveDot(currentIndex);
        }
    }

    // 滚动到下一个区块
    function scrollToNext() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= sections.length) {
            nextIndex = 0; // 循环滚动
        }
        scrollToIndex(nextIndex);
    }

    // 启动自动滚动定时器
    function startAutoScroll() {
        if (autoScrollTimer) clearInterval(autoScrollTimer);
        autoScrollTimer = setInterval(() => {
            if (isAutoScrolling) {
                scrollToNext();
            }
        }, intervalTime);
    }

    // 停止自动滚动（临时）
    function pauseAutoScroll() {
        if (!isAutoScrolling) return;
        isAutoScrolling = false;
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => {
            isAutoScrolling = true;
        }, pauseAfterManual);
    }

    // 监听手动滚动（滚动结束后恢复）
    let scrollTimeout = null;
    function onManualScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        // 手动滚动时暂停自动滚动
        if (isAutoScrolling) {
            pauseAutoScroll();
        }
        // 更新当前索引（根据滚动位置）
        scrollTimeout = setTimeout(() => {
            updateCurrentIndexFromScroll();
        }, 150);
    }

    // 根据滚动位置更新 currentIndex 和圆点
    function updateCurrentIndexFromScroll() {
        const container = getScrollContainer();
        const scrollLeft = container.scrollLeft;
        let newIndex = 0;
        let minOffset = Infinity;
        sections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            const offset = Math.abs(rect.left);
            if (offset < minOffset) {
                minOffset = offset;
                newIndex = idx;
            }
        });
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateActiveDot(currentIndex);
        }
    }

    // 初始化
    function init() {
        sections = getSections();
        if (sections.length <= 1) return; // 只有一个模块时不需要圆点

        // 创建圆点指示器
        createDots();

        // 确保每个模块宽度正确（响应视口变化）
        window.addEventListener('resize', () => {
            sections = getSections();
            // 重建圆点（数量可能变化）
            if (dotsContainer) dotsContainer.remove();
            dots = [];
            createDots();
            updateCurrentIndexFromScroll();
        });

        // 监听滚动事件（手动滚动）
        const container = getScrollContainer();
        container.addEventListener('scroll', onManualScroll);
        container.addEventListener('touchmove', onManualScroll);
        container.addEventListener('wheel', onManualScroll);

        // 启动自动滚动
        startAutoScroll();

        // 初始定位到第一个模块
        setTimeout(() => {
            scrollToIndex(0);
        }, 100);
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

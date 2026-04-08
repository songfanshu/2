// 自动水平滚动功能 + 圆点指示器（优化版）
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

    // 获取滚动容器（body 或 html）
    function getScrollContainer() {
        return document.scrollingElement || document.documentElement;
    }

    // 获取所有横向区块（.home-section）
    function getSections() {
        return Array.from(document.querySelectorAll('.home-section'));
    }

    // 滚动到指定索引的区块（使用 scrollTo 避免与 scroll-snap 冲突）
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

    // 暂停自动滚动（临时）
    function pauseAutoScroll() {
        if (!isAutoScrolling) return;
        isAutoScrolling = false;
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = setTimeout(() => {
            isAutoScrolling = true;
        }, pauseAfterManual);
    }

    // 根据滚动位置更新 currentIndex 和圆点（优化版，避免 getBoundingClientRect）
    function updateCurrentIndexFromScroll() {
        const container = getScrollContainer();
        const scrollLeft = container.scrollLeft;
        let newIndex = 0;
        // 遍历区块，找到最接近滚动位置的那个
        for (let i = 0; i < sections.length; i++) {
            const left = sections[i].offsetLeft;
            if (scrollLeft >= left - 50) { // 阈值50px，允许轻微偏差
                newIndex = i;
            } else {
                break;
            }
        }
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateActiveDot(currentIndex);
        }
    }

    // 监听手动滚动（滚动结束后更新索引并暂停自动滚动）
    let scrollTimeout = null;
    function onManualScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        // 手动滚动时暂停自动滚动
        if (isAutoScrolling) {
            pauseAutoScroll();
        }
        // 延迟更新索引，避免高频计算
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

    // 重建圆点（当窗口大小改变或区块数量变化时）
    function rebuildDots() {
        if (dotsContainer) dotsContainer.remove();
        dots = [];
        createDots();
    }

    // 初始化
    function init() {
        sections = getSections();
        if (sections.length <= 1) return;

        // 创建圆点
        createDots();

        // 监听窗口大小变化，重新计算区块位置并重建圆点
        window.addEventListener('resize', () => {
            sections = getSections();
            rebuildDots();
            updateCurrentIndexFromScroll();
        });

        // 监听滚动事件（手动滚动）
        const container = getScrollContainer();
        container.addEventListener('scroll', onManualScroll);
        // 移动端触摸滚动同样触发 scroll 事件，无需额外监听 touchmove/wheel

        // 启动自动滚动
        startAutoScroll();

        // 初始定位到第一个区块
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

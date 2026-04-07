// 自动水平滚动功能
(function() {
    // 配置参数
    const intervalTime = 5000;      // 自动滚动间隔（毫秒），5秒
    const pauseAfterManual = 10000; // 手动滚动后暂停自动滚动的时间（毫秒），10秒

    let currentIndex = 0;
    let autoScrollTimer = null;
    let pauseTimer = null;
    let isAutoScrolling = true;
    let scrollContainer = null;
    let sections = [];

    // 获取滚动容器（body 本身就是滚动容器，因为设置了 overflow-x: auto）
    function getScrollContainer() {
        return document.scrollingElement || document.documentElement;
    }

    // 获取所有横向区块（.home-section）
    function getSections() {
        return Array.from(document.querySelectorAll('.home-section'));
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

    // 根据滚动位置更新 currentIndex
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
        }
    }

    // 初始化
    function init() {
        sections = getSections();
        if (sections.length <= 1) return; // 只有一个模块时不需要滚动

        // 确保每个模块宽度正确（响应视口变化）
        window.addEventListener('resize', () => {
            // 重新获取 sections 并确保布局正常
            sections = getSections();
            updateCurrentIndexFromScroll();
        });

        // 监听滚动事件（手动滚动）
        const container = getScrollContainer();
        container.addEventListener('scroll', onManualScroll);
        // 触摸屏支持
        container.addEventListener('touchmove', onManualScroll);
        container.addEventListener('wheel', onManualScroll);

        // 启动自动滚动
        startAutoScroll();

        // 初始定位到第一个模块（确保 scroll-snap 正确）
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

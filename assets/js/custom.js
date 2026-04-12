// 横向滚动页面的圆点指示器控制
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有页面和圆点
  const sections = document.querySelectorAll('.home-section');
  const dots = document.querySelectorAll('.scroll-dot');
  
  if (sections.length > 0 && dots.length > 0) {
    // 监听滚动事件，更新活跃的圆点
    const container = document.scrollingElement || document.documentElement;
    
    container.addEventListener('scroll', function() {
      const scrollPosition = container.scrollLeft;
      
      sections.forEach((section, index) => {
        const offsetLeft = section.offsetLeft;
        const offsetWidth = section.offsetWidth;
        
        if (scrollPosition >= offsetLeft - offsetWidth / 2 && 
            scrollPosition < offsetLeft + offsetWidth / 2) {
          // 更新活跃的圆点
          dots.forEach((dot, i) => {
            if (i === index) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
      });
    });
    
    // 为每个圆点添加点击事件
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const targetSection = sections[index];
        if (targetSection) {
          container.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // 自动播放功能
  let currentSlide = 0;
  const totalSlides = sections.length;
  
  if (totalSlides > 1) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      const targetSection = sections[currentSlide];
      const container = document.scrollingElement || document.documentElement;
      
      if (targetSection && container) {
        container.scrollTo({
          left: targetSection.offsetLeft,
          behavior: 'smooth'
        });
      }
    }, 5000); // 每5秒自动切换
  }
  
  // 初始化第一个圆点为活跃状态
  if (dots.length > 0) {
    dots[0].classList.add('active');
  }
});

// 添加触控滑动手势支持
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}, false);

document.addEventListener('touchend', function(event) {
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;
  const diffX = startX - endX;
  const diffY = startY - endY;
  
  // 检查是否主要是水平滑动
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    const container = document.scrollingElement || document.documentElement;
    const currentScroll = container.scrollLeft;
    const screenWidth = window.innerWidth;
    
    if (diffX > 0) {
      // 向左滑动，显示下一个页面
      container.scrollTo({
        left: currentScroll + screenWidth,
        behavior: 'smooth'
      });
    } else {
      // 向右滑动，显示上一个页面
      container.scrollTo({
        left: currentScroll - screenWidth,
        behavior: 'smooth'
      });
    }
  }
}, false);

// 页面加载完成后添加圆点指示器到页面
window.addEventListener('load', function() {
  const sections = document.querySelectorAll('.home-section');
  if (sections.length > 1) {
    // 创建圆点指示器容器
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'scroll-dots';
    
    const ul = document.createElement('ul');
    
    // 为每个section创建一个圆点
    sections.forEach((_, index) => {
      const li = document.createElement('li');
      const dot = document.createElement('button');
      dot.className = 'scroll-dot';
      dot.setAttribute('aria-label', `跳转到第 ${index + 1} 页`);
      
      // 添加点击事件
      dot.addEventListener('click', function() {
        const container = document.scrollingElement || document.documentElement;
        container.scrollTo({
          left: sections[index].offsetLeft,
          behavior: 'smooth'
        });
      });
      
      li.appendChild(dot);
      ul.appendChild(li);
    });
    
    dotsContainer.appendChild(ul);
    document.body.appendChild(dotsContainer);
    
    // 更新第一个圆点为活跃状态
    if (ul.querySelector('.scroll-dot')) {
      ul.querySelector('.scroll-dot').classList.add('active');
    }
  }
});

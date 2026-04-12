---
headless: true
widget: blank
weight: 1
---

<!-- 🔥 全屏横向轮播容器 -->
<div class="fullscreen-slider">

  <!-- 第1页 -->
  <div class="slide-page">
    <section class="home-section wg-hero">
      <div class="hero-body">
        <img src="/uploads/hero1.jpg" class="hero-image" alt="图片1">
        <h1>第一页 标题</h1>
        <p class="hero-subtitle">第一页 副标题</p>
        <p>这里是第一页的内容文字，完美居中</p>
      </div>
    </section>
  </div>

  <!-- 第2页 -->
  <div class="slide-page">
    <section class="home-section wg-hero">
      <div class="hero-body">
        <img src="/uploads/hero2.jpg" class="hero-image" alt="图片2">
        <h1>第二页 标题</h1>
        <p class="hero-subtitle">第二页 副标题</p>
        <p>这里是第二页的内容文字，完美居中</p>
      </div>
    </section>
  </div>

  <!-- 第3页 -->
  <div class="slide-page">
    <section class="home-section wg-hero">
      <div class="hero-body">
        <img src="/uploads/hero3.jpg" class="hero-image" alt="图片3">
        <h1>第三页 标题</h1>
        <p class="hero-subtitle">第三页 副标题</p>
        <p>这里是第三页的内容文字，完美居中</p>
      </div>
    </section>
  </div>

</div>

<!-- 🔥 底部小圆点（有几页就写几个） -->
<ul class="slider-dots">
  <li class="slider-dot active"></li>
  <li class="slider-dot"></li>
  <li class="slider-dot"></li>
</ul>

<!-- 🔥 JS 自动切换代码（直接写在这里，不用找footer文件！） -->
<script>
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.fullscreen-slider');
  const pages = document.querySelectorAll('.slide-page');
  const dots = document.querySelectorAll('.slider-dot');
  const total = pages.length;
  let current = 0;
  const time = 5000; // 5秒自动切换

  function goTo(i) {
    current = i;
    slider.scrollLeft = i * window.innerWidth;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  // 自动轮播
  let auto = setInterval(() => goTo((current + 1) % total), time);

  // 圆点点击
  dots.forEach((d, i) => d.addEventListener('click', () => {
    clearInterval(auto);
    goTo(i);
    auto = setInterval(() => goTo((current + 1) % total), time);
  }));
});
</script>

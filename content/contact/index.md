---
title: 联系我们
date: 2026-04-01

type: landing

sections:
  - block: contact
    content:
      title: 联系我们
      text: |-
        欢迎访问先进集成电路材料与类脑芯片课题组。
        我们位于中山大学广州校区东校园，期待与您开展学术交流与合作。
      email: test@example.org
      phone: 020-31127648
      address:
        street: 广州市番禺区大学城外环东路132号
        city: 广州
        region: 广东省
        postcode: '510006'
        country: 中国
        country_code: CN
      coordinates:
        latitude: '23.07610'
        longitude: '113.38015'
      directions: 中山大学广州校区东校园化学材料综合楼
      office_hours:
        - '周一至周五 09:00–17:30'
      appointment_url: ''

      # 自动链接邮箱和电话
      autolink: true

      # 联系表单
      form:
        provider: netlify
        formspree:
          id:
        netlify:
          captcha: false
    design:
      columns: '1'

  # 学校地图
  - block: markdown
    content:
      title: 校园地图
      subtitle: 中山大学广州校区东校园
      text: |
        <div class="school-map-wrap">
          <iframe
            class="school-map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=113.365%2C23.065%2C113.395%2C23.087&layer=mapnik&marker=23.07610%2C113.38015"
            loading="lazy"
            title="中山大学广州校区东校园地图">
          </iframe>
          <div class="school-map-link">
            <a href="https://www.openstreetmap.org/?mlat=23.07610&mlon=113.38015#map=15/23.07610/113.38015" target="_blank" rel="noopener">
              在地图中查看中山大学广州校区东校园 →
            </a>
          </div>
        </div>
    design:
      columns: '1'
      spacing:
        padding: ['0', '0', '30px', '0']
      css_class: school-map-section

  - block: markdown
    content:
      title:
      subtitle: ''
      text:
    design:
      columns: '1'
      background:
        image:
          filename: contact.jpg
          filters:
            brightness: 1
          parallax: false
          position: center
          size: cover
          text_color_light: true
      spacing:
        padding: ['20px', '0', '20px', '0']
      css_class: fullscreen
---

---
title: ''
date: 2026-03-20
type: landing

sections:
  - block: hero
    content:
      title: ''
      image:
        filename: brain-chip.png
      text: |
        先进集成电路材料与类脑芯片课题组 (Advanced IC Materials & Neuromorphic Chips Lab) 致力于突破后摩尔时代的算力瓶颈，聚焦于新型半导体材料、忆阻器器件、以及具有高能效比的神经形态（类脑）计算架构的研究与应用。
    design:
      background:
        color: '#08172e'
        text_color_light: true

  - block: collection
    content:
      title: '最新动态 (News)'
      subtitle: ''
      text: ''
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'
      background:
        color: '#ffffff'

  - block: markdown
    content:
      title: '课题组愿景'
      subtitle: ''
      text: '我们在新型微电子材料、非易失性存储器和神经形态计算领域不断探索，旨在研发下一代高能效、高集成度的类脑芯片。我们的研究覆盖从底层纳米材料生长、器件微纳加工，到顶层神经网络算法及芯片架构设计的全链条。'
    design:
      columns: '1'
      background:
        color: '#f0f7ff'
      spacing:
        padding: ['80px', '0', '80px', '0']

  - block: collection
    content:
      title: '学术论文'
      text: ''
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article'
    design:
      view: citation
      columns: '1'
      background:
        color: '#ffffff'

  - block: markdown
    content:
      title: '团队成员'
      subtitle: 'Team Members'
      text: |
        <div class="lab-team-grid">
          <article class="lab-team-card">
            <img class="lab-team-photo" src="/images/liuyanghui.jpg" alt="刘阳辉">
            <h3 class="lab-team-name">刘阳辉</h3>
            <p class="lab-team-role">副教授 · 硕士生导师</p>
            <p class="lab-team-bio">主要研究氧化物薄膜晶体管、神经形态器件以及新型生物化学传感器。</p>
          </article>
          <article class="lab-team-card">
            <img class="lab-team-photo" src="/images/wanghong.jpg" alt="汪宏">
            <h3 class="lab-team-name">汪宏</h3>
            <p class="lab-team-role">副教授 · 硕士生导师</p>
            <p class="lab-team-bio">主要研究宽禁带半导体外延与器件、有机半导体材料与器件以及柔性传感器。</p>
          </article>
          <article class="lab-team-card">
            <img class="lab-team-photo" src="/images/zengjianmin.jpg" alt="曾剑敏">
            <h3 class="lab-team-name">曾剑敏</h3>
            <p class="lab-team-role">副教授 · 博士生导师</p>
            <p class="lab-team-bio">主要研究新原理器件、忆阻器与存算一体、光电忆阻器及面向感存算的神经形态计算。</p>
          </article>
        </div>
    design:
      columns: '1'
      background:
        color: '#f4f7fb'
      spacing:
        padding: ['70px', '0', '70px', '0']

  - block: markdown
    content:
      title: ''
      subtitle: ''
      text: '{{% cta cta_link="./people/" cta_text="了解我们的团队 →" %}}'
    design:
      columns: '1'
      background:
        color: '#1a56db'
        text_color_light: true
      spacing:
        padding: ['50px', '0', '50px', '0']
---

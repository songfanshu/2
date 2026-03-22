---
# Leave the homepage title empty to use the site title
title: ''
date: 2026-03-20
type: landing

sections:
  - block: hero
    content:
      title: '先进集成电路材料与类脑芯片课题组'
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
        color: '#15607a'

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

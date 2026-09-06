---
title: ""
type: landing
sections:
  - block: hero
    content:
      title: "先进功能材料与智能器件实验室"
      text: "探索先进材料，构筑智能器件，服务国家战略需求。"
      primary_action:
        text: 了解我们
        url: "#vision"
        icon: "fas fa-arrow-right"
      secondary_action:
        text: 学术论文
        url: "#publications"
        icon: "fas fa-book"
    design:
      background:
        image:
          filename: "hero-bg.jpg"
        text_color_light: true
      spacing:
        padding: ["0", "0", "0", "0"]
  - block: collection
    id: news
    content:
      title: 最新动态
      subtitle: 实验室新闻与科研进展
      text: ""
      count: 6
      filters:
        folders:
          - news
      sort_by: Date
      sort_ascending: false
    design:
      view: card
  - block: markdown
    id: vision
    content:
      title: 实验室愿景
      text: |
        我们致力于先进功能材料、光电智能器件及神经形态系统的研究，面向信息感知、存储与计算融合等前沿方向，推动材料与器件技术协同发展。
    design:
      columns: "1"
  - block: collection
    id: publications
    content:
      title: 学术论文
      subtitle: Recent Publications
      count: 6
      filters:
        folders:
          - publication
      sort_by: Date
      sort_ascending: false
    design:
      view: compact
  - block: markdown
    id: team
    content:
      title: 团队成员
      text: |
        我们拥有来自材料、器件与信息领域的科研人员，围绕先进功能材料与智能器件开展交叉研究。
    design:
      columns: "1"
  - block: markdown
    id: contact
    content:
      title: 加入我们
      text: |
        欢迎对先进功能材料、光电器件和神经形态智能感兴趣的同学与我们联系。
    design:
      columns: "1"
---

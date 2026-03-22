---
# Leave the homepage title empty to use the site title
title: ''
date: 2026-03-20
type: landing

- block: hero
  content:
    title: '先进集成电路材料与类脑芯片课题组'
    image:
      filename: brain-chip.png  # ← 这就是首页大图的设置位置！
    text: |
      先进集成电路材料与类脑芯片课题组 (Advanced IC Materials & Neuromorphic Chips Lab) 致力于突破后摩尔时代的算力瓶颈...
  design:
    background:
      color: '#08172e'        # 深蓝色背景
      text_color_light: true   # 文字使用亮色

  - block: collection
    content:
      title: '最新动态 (News)'    # 区块标题
      subtitle: ''                 # 副标题（留空）
      text: ''                     # 额外说明文字（留空）
      count: 5                     # 显示5条内容
    filters:
  author: ''                   # 按作者筛选（空表示全部）
  category: ''                 # 按分类筛选（空表示全部）
  exclude_featured: false      # 是否排除精选内容（false表示包含）
  publication_type: ''         # 按出版物类型筛选
  tag: ''                      # 按标签筛选
offset: 0                      # 从第0条开始（不跳过任何内容）
order: desc                    # 降序排列（最新的在前）
page_type: post                # 内容类型：post（文章/新闻）
design:
  view: card                   # 显示方式：卡片式
  columns: '1'                 # 单列布局
  background:
    color: '#15607a'           # 背景颜色：蓝色（你修改的）
    
  - block: markdown
  content:
    title: '课题组愿景'
    text: '我们在新型微电子材料、非易失性存储器和神经形态计算领域不断探索...'
  design:
    columns: '1'
    background:
      color: '#f0f7ff'       # 浅蓝色背景
    spacing:
      padding: ['80px', '0', '80px', '0']  # 上下内边距80px

  - block: collection
  content:
    title: '学术论文'
    count: 5
    filters:
      folders:
        - publication        # 从 publication 文件夹获取
      publication_type: 'article'
  design:
    view: citation           # 引用格式显示
    columns: '1'
    background:
      color: '#ffffff'       # 白色背景

- block: markdown
  content:
    title: ''
    subtitle: ''
    text: '{{% cta cta_link="./people/" cta_text="了解我们的团队 →" %}}'
  design:
    columns: '1'
    background:
      color: '#1a56db'       # 蓝色背景
      text_color_light: true
    spacing:
      padding: ['50px', '0', '50px', '0']
---

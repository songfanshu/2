---
# 首页配置文件
# 留空标题以使用网站设置的标题
title: ''
# 页面创建日期
date: 2026-03-20
# 页面类型：landing 表示使用区块式落地页布局
type: landing

# 定义首页的各个区块（按顺序显示）
sections:
  
  # ========== 区块1：英雄横幅区域 ==========
  # 这是页面顶部的欢迎大图区域
  - block: hero
    content:
      # 主标题：课题组名称
      title: '先进集成电路材料与类脑芯片课题组'
      # 图片配置
      image:
        # 图片文件名（需放在 assets/media/ 或 static/media/ 目录）
        filename: brain-chip.png
      # 文字介绍内容（使用 | 保留换行格式）
      text: |
        先进集成电路材料与类脑芯片课题组 (Advanced IC Materials & Neuromorphic Chips Lab) 致力于突破后摩尔时代的算力瓶颈，聚焦于新型半导体材料、忆阻器器件、以及具有高能效比的神经形态（类脑）计算架构的研究与应用。
    # 设计样式配置
    design:
      background:
        # 背景颜色：深蓝色
        color: '#08172e'
        # 文字使用亮色（白色）
        text_color_light: true

  # ========== 区块2：最新动态区域 ==========
  # 显示最新的新闻和公告
  - block: collection
    content:
      # 区块标题
      title: '最新动态 (News)'
      # 副标题（留空不显示）
      subtitle: ''
      # 额外说明文字（留空）
      text: ''
      # 显示的内容数量
      count: 5
      # 内容筛选条件
      filters:
        # 按作者筛选（空表示全部）
        author: ''
        # 按分类筛选（空表示全部）
        category: ''
        # 是否排除精选内容（false表示包含精选内容）
        exclude_featured: false
        # 按出版物类型筛选
        publication_type: ''
        # 按标签筛选
        tag: ''
      # 跳过的内容数量（0表示从第一条开始）
      offset: 0
      # 排序方式：desc降序（最新的在前），asc升序（最旧的在前）
      order: desc
      # 内容类型：post表示从 content/post/ 目录读取文章
      page_type: post
    # 设计样式配置
    design:
      # 显示视图：card卡片式视图
      view: card
      # 列数：1表示单列布局
      columns: '1'
      # 背景配置
      background:
        # 背景颜色：蓝色
        color: '#15607a'

  # ========== 区块3：课题组愿景区域 ==========
  # 使用 Markdown 格式展示课题组的愿景和使命
  - block: markdown
    content:
      # 区块标题
      title: '课题组愿景'
      # 副标题（留空）
      subtitle: ''
      # Markdown 格式的文字内容
      text: '我们在新型微电子材料、非易失性存储器和神经形态计算领域不断探索，旨在研发下一代高能效、高集成度的类脑芯片。我们的研究覆盖从底层纳米材料生长、器件微纳加工，到顶层神经网络算法及芯片架构设计的全链条。'
    # 设计样式配置
    design:
      # 列数：1表示单列
      columns: '1'
      # 背景配置
      background:
        # 背景颜色：浅蓝色
        color: '#f0f7ff'
      # 间距配置
      spacing:
        # 内边距：[上, 右, 下, 左]，这里设置上下各80px
        padding: ['80px', '0', '80px', '0']

  # ========== 区块4：学术论文区域 ==========
  # 显示课题组发表的学术论文
  - block: collection
    content:
      # 区块标题
      title: '学术论文'
      # 额外说明文字（留空）
      text: ''
      # 显示数量：5篇
      count: 5
      # 内容筛选条件
      filters:
        # 指定内容来源文件夹
        folders:
          - publication    # 从 content/publication/ 目录读取
        # 出版物类型：article表示学术论文
        publication_type: 'article'
      # 跳过的数量
      offset: 0
      # 排序：降序（最新的论文在前）
      order: desc
    # 设计样式配置
    design:
      # 显示视图：citation引用格式（作者、期刊、年份等）
      view: citation
      # 列数：单列
      columns: '1'
      # 背景配置
      background:
        # 背景颜色：白色
        color: '#ffffff'

  # ========== 区块5：行动召唤按钮区域 ==========
  # 引导用户查看团队成员
  - block: markdown
    content:
      # 标题留空（不显示）
      title: ''
      # 副标题留空
      subtitle: ''
      # 使用短代码（shortcode）创建按钮
      # cta_link: 链接地址，指向团队成员页面
      # cta_text: 按钮文字
      text: '{{% cta cta_link="./people/" cta_text="了解我们的团队 →" %}}'
    # 设计样式配置
    design:
      # 列数：单列
      columns: '1'
      # 背景配置
      background:
        # 背景颜色：亮蓝色
        color: '#1a56db'
        # 文字使用亮色
        text_color_light: true
      # 间距配置
      spacing:
        # 内边距：上下各50px
        padding: ['50px', '0', '50px', '0']

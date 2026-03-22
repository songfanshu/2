# ============================================================================
# 网站配置文件
# ============================================================================
# 文件位置: config/_default/params.yaml
# 作用: 配置网站的外观、功能、SEO等参数

# ============================================================================
# 外观配置 (Appearance)
# 控制网站的主题、字体、大小等视觉元素
# ============================================================================
appearance:
  # 日间主题: blue (蓝色主题)
  # 可选: minimal, classic, blue, ocean, forest 等
  theme_day: blue
  # 夜间主题: ocean (海洋主题)
  theme_night: ocean
  # 字体: native (使用系统默认字体)
  # 可选: native, custom
  font: native
  # 字体大小: L (大)
  # 可选: XS, S, M, L, XL
  font_size: L

# ============================================================================
# SEO与营销配置 (Marketing)
# 用于搜索引擎优化和网站统计分析
# ============================================================================
marketing:
  # SEO 配置
  seo:
    # 网站类型: Organization (组织)
    site_type: Organization
    # 本地业务类型 (留空)
    local_business_type: ''
    # 组织名称 (留空，使用网站标题)
    org_name: ''
    # 网站描述，会显示在搜索引擎结果中
    description: '先进集成电路材料与类脑芯片课题组 - 致力于突破后摩尔时代的算力瓶颈'
    # Twitter 账号
    twitter: 'GetResearchDev'
  
  # 网站统计分析配置
  analytics:
    # Google Analytics 追踪ID (格式: UA-XXXXX-Y 或 G-XXXXXXX)
    google_analytics: ''
    # 百度统计ID
    baidu_tongji: ''
    # Google Tag Manager ID
    google_tag_manager: ''
    # Microsoft Clarity ID
    microsoft_clarity: ''
  
  # 网站验证配置 (用于搜索引擎站长工具)
  verification:
    # Google Search Console 验证码
    google: ''
    # 百度站长平台验证码
    baidu: ''

# ============================================================================
# 页眉配置 (Header)
# 控制网站顶部导航栏的显示
# ============================================================================
header:
  navbar:
    # 是否启用导航栏
    enable: true
    # 导航栏对齐方式: l(左), r(右), c(中)
    align: r
    # 是否显示网站 Logo
    show_logo: true
    # 是否显示语言切换按钮
    show_language: false
    # 是否显示日/夜间模式切换按钮
    show_day_night: true
    # 是否显示搜索框
    show_search: true
    # 是否高亮当前激活的页面链接
    highlight_active_link: false

# ============================================================================
# 页脚配置 (Footer)
# 控制网站底部的版权信息
# ============================================================================
footer:
  copyright:
    # 版权声明文本
    # {year} 会被替换为当前年份
    # {license} 会被替换为许可证链接
    notice: '© {year} 先进集成电路材料与类脑芯片课题组. 保留所有权利'
    # 许可证配置
    license:
      # 是否启用许可证
      enable: true
      # 是否允许衍生作品
      allow_derivatives: false
      # 是否要求相同方式共享
      share_alike: true
      # 是否允许商业使用
      allow_commercial: false

# ============================================================================
# 本地化配置 (Localization)
# 控制日期、时间、地址的显示格式
# ============================================================================
locale:
  # 日期格式: 中国标准格式
  # Go语言时间格式参考: 2006年1月2日
  date_format: '2006年1月2日'
  # 时间格式: 24小时制
  # 可选: 15:04 (24小时), 3:04 PM (12小时)
  time_format: '15:04'
  # 地址格式: 使用 en-us 避免错误
  # 注意: zh-cn 需要在 data/address_formats.toml 中定义
  # 如需中文地址格式，请创建 data/address_formats.toml 文件
  address_format: en-us

# ============================================================================
# 站点功能配置 (Features)
# 控制网站的各种功能特性
# ============================================================================
features:
  # 代码语法高亮
  syntax_highlighter:
    # 是否启用
    enable: false
    # 额外的语言支持
    extra_languages:
      - r
      - latex
  
  # 数学公式 (LaTeX)
  math:
    enable: false
  
  # 隐私包 (GDPR相关)
  privacy_pack:
    enable: false
  
  # Git 仓库配置
  repository:
    # 仓库地址
    url: 'https://github.com/<username>/<repository>'
    # 内容目录
    content_dir: content
    # 主分支名称
    branch: main
  
  # 头像配置
  avatar:
    # 是否使用 Gravatar 全球头像
    gravatar: false
    # 头像形状: circle (圆形), square (方形)
    shape: circle
  
  # 评论系统配置
  comment:
    # 评论系统提供商: disqus, commento, giscus, 留空表示禁用
    provider: ''
    # Disqus 配置
    disqus:
      shortname: ''
      show_count: true
    # Commento 配置
    commento:
      url: ''
    # Giscus 配置 (GitHub Discussions)
    giscus:
      repo: ''
      repo_id: ''
      category: ''
      category_id: ''
  
  # 搜索功能配置
  search:
    # 搜索提供商: wowchemy (内置), algolia (Algolia搜索)
    provider: wowchemy
    # Algolia 搜索配置
    algolia:
      app_id: ''
      api_key: ''
      index_name: ''
      show_logo: false
  
  # 地图功能配置
  map:
    # 地图提供商: mapnik, google, mapbox
    provider: 'mapnik'
    # API 密钥
    api_key: ''
    # 默认缩放级别
    zoom: 15

# ============================================================================
# 扩展功能 (Extensions)
# 控制第三方扩展的启用
# ============================================================================
extensions:
  # Decap CMS 配置 (原 Netlify CMS)
  decap_cms:
    # 分支名称
    branch: main
    # 是否使用本地后端
    local_backend: false
  # 学术图标库 (支持 Google Scholar, ORCID 等)
  academicons:
    enable: true

# ============================================================================
# 出版物配置 (Publications)
# 控制学术出版物的显示格式
# ============================================================================
publications:
  # 日期格式
  date_format: January 2006
  # 引用样式: apa, mla, chicago
  citation_style: apa

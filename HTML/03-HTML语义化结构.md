# HTML 语义化结构

## 1. 什么是语义化

语义化 = 用正确的标签做正确的事情。

HTML 语义化指的是：根据内容的结构，选择合适的 HTML 标签，让代码结构清晰，易于阅读和维护。

## 2. 为什么要语义化

### 优点：
1. **可读性** - 结构清晰，便于团队开发和维护
2. **可维护性** - 修改时更容易找到对应区域
3. **SEO** - 搜索引擎更容易理解页面结构
4. **可访问性** - 屏幕阅读器等辅助设备更好地工作
5. **无障碍** - 对残障人士更友好
6. **即使没有 CSS，页面也能呈现出良好的结构

### 反面教材：
```html
<!-- 不推荐：全部用 div -->
<div class="header">
  <div class="title">我的网站</div>
</div>
<div class="nav">
  <div class="item">首页</div>
  <div class="item">关于</div>
</div>
<div class="content">
  <div class="article">
    ...
  </div>
</div>
<div class="footer">
  版权信息
</div>
```

### 正确写法（语义化）：
```html
<!-- 推荐：使用语义化标签 -->
<header>
  <h1>我的网站</h1>
</header>
<nav>
  <ul>
    <li><a href="#">首页</a></li>
    <li><a href="#">关于</a></li>
  </ul>
</nav>
<main>
  <article>
    ...
  </article>
</main>
<footer>
  版权信息
</footer>
```

## 3. HTML5 语义化标签大全

| 标签 | 语义 | 使用场景 |
|------|------|----------|
| `<header>` | 页眉/头部 | 页面头部、区块头部 |
| `<nav>` | 导航 | 导航菜单、导航链接区域 |
| `<main>` | 主要内容 | 页面唯一的主要内容区域 |
| `<article>` | 文章/独立内容 | 一篇完整的文章、博客文章、新闻文章 |
| `<section>` | 章节/区块 | 文章中的章节、分组内容 |
| `<aside>` | 侧边栏 | 侧边栏、相关内容链接、广告 |
| `<footer>` | 页脚/底部 | 页面底部、区块底部 |
| `<figure>` | 媒体内容容器 | 图片、图表、视频等容器 |
| `<figcaption>` | 媒体标题 | figure 的标题/说明文字 |
| `<time>` | 时间 | 日期时间 |
| `<mark>` | 标记/高亮 | 需要突出显示的文本 |
| `<details>` | 详情折叠 | 可折叠的详情 |
| `<summary>` | 详情标题 | details 的标题 |
| `<dialog>` | 对话框 | 模态框、对话框 |
| `<data>` | 机器可读数据 | 给机器看的数据 |
| `<address>` | 联系信息 | 联系信息、地址 |

## 4. 典型页面结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>语义化页面示例</title>
</head>
<body>
  <!-- 页面头部 -->
  <header>
    <h1>网站标题</h1>
    <!-- 导航栏 -->
    <nav>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于</a></li>
        <li><a href="/blog">博客</a></li>
        <li><a href="/contact">联系</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要内容区域 -->
  <main>
    <!-- 面包屑导航 -->
    <nav aria-label="面包屑">
      <ol>
        <li><a href="/">首页</a></li>
        <li>博客</li>
      </ol>
    </nav>

    <!-- 一篇文章 -->
    <article>
      <header>
        <h2>文章标题</h2>
        <p>发布于 <time datetime="2024-03-16">2024年3月16日</time></p>
      </header>

      <!-- 文章章节 -->
      <section>
        <h3>第一章</h3>
        <p>章节内容...</p>
      </section>

      <section>
        <h3>第二章</h3>
        <p>章节内容...</p>

        <!-- 图片 -->
        <figure>
          <img src="diagram.png" alt="示意图">
          <figcaption>图 1: 示意图说明文字</figcaption>
        </figure>
      </section>

      <footer>
        <p>作者：张三</p>
        <p>标签：HTML 语义化</p>
      </footer>
    </article>

    <!-- 侧边栏 -->
    <aside>
      <h3>相关文章</h3>
      <ul>
        <li><a href="#">相关文章 1</a></li>
        <li><a href="#">相关文章 2</a></li>
      </ul>
    </aside>
  </main>

  <!-- 页面底部 -->
  <footer>
    <p>&copy; 2024 版权所有</p>
    <address>
      联系邮箱：<a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>
```

## 5. 各标签详解

### 5.1 `<header>` 页眉

- 定义文档或区块的头部区域
- 通常包含标题、logo、导航、搜索框等
- 可以在一个页面中出现多次

```html
<!-- 页面头部 -->
<header>
  <img src="logo.png" alt="网站Logo">
  <h1>网站标题</h1>
  <nav>...</nav>
</header>

<!-- 文章头部 -->
<article>
  <header>
    <h2>文章标题</h2>
    <p>发布日期：...</p>
  </header>
</article>
```

### 5.2 `<nav>` 导航

- 定义导航链接区域
- 不是所有链接都要放在 nav 中，只放主要导航
- 一个页面可以有多个 nav

```html
<!-- 主导航 -->
<nav>
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>

<!-- 侧边导航 -->
<aside>
  <nav aria-label="章节导航">
    <ul>
      <li><a href="#chapter1">第一章</a></li>
      <li><a href="#chapter2">第二章</a></li>
    </ul>
  </nav>
</aside>

<!-- 面包屑导航 -->
<nav aria-label="面包屑">
  <ol>
    <li><a href="/">首页</a></li>
    <li>当前页</li>
  </ol>
</nav>
```

### 5.3 `<main>` 主要内容

- 表示文档的主要内容区域
- **一个页面只能有一个 main**
- main 不应该包含侧边栏、导航栏、页脚等重复出现的内容

```html
<body>
  <header>...</header>
  <main>
    <!-- 这里放页面独有的主要内容 -->
  </main>
  <aside>...</aside>
  <footer>...</footer>
</body>
```

### 5.4 `<article>` 文章

- 表示一篇独立完整的内容，可以独立存在
- 使用场景：
  - 博客文章
  - 新闻文章
  - 论坛帖子
  - 产品卡片
  - 用户评论

```html
<!-- 一篇博客文章 -->
<article>
  <h2>博客标题</h2>
  <p>发布时间...</p>
  <p>正文内容...</p>
</article>

<!-- 多个文章列表（博客列表） -->
<div class="blog-list">
  <article>...</article>
  <article>...</article>
  <article>...</article>
</div>
```

### 5.5 `<section>` 章节

- 把文章分成不同的章节
- 应该有一个标题（h1-h6）
- 如果只是为了样式，用 div 更好

```html
<article>
  <h1>前端入门指南</h1>

  <section>
    <h2>HTML 基础</h2>
    <p>...HTML 内容...</p>
  </section>

  <section>
    <h2>CSS 基础</h2>
    <p>...CSS 内容...</p>
  </section>
</article>
```

**混淆辨析**：
- `article` 强调独立完整
- `section` 强调分段/章节
- `div` 只是容器，无语义

### 5.6 `<aside>` 侧边栏

- 表示与主要内容相关但又相对独立的部分
- 使用场景：
  - 侧边栏
  - 广告区域
  - 相关链接
  - 作者简介

```html
<main>...</main>
<aside>
  <h3>关于作者</h3>
  <p>作者简介...</p>
</aside>
```

### 5.7 `<footer>` 页脚

- 定义文档或区块的底部
- 通常包含：版权信息、作者信息、相关链接
- 一个页面可以有多个 footer

```html
<!-- 页面底部 -->
<footer>
  <p>&copy; 2024 我的博客</p>
</footer>

<!-- 文章底部 -->
<article>
  ...
  <footer>
    <p>作者：张三</p>
    <p>分类：前端</p>
  </footer>
</article>
```

### 5.8 `<figure>` 和 `<figcaption>`

- figure 用来包裹媒体内容
- figcaption 是 figure 的标题/说明

```html
<figure>
  <img src="flowchart.png" alt="流程图">
  <figcaption>图 1: 系统架构流程图</figcaption>
</figure>

<figure>
  <pre><code>
console.log('Hello World');
  </code></pre>
  <figcaption>代码清单 1: Hello World 示例</figcaption>
</figure>
```

### 5.9 `<time>` 时间

- 表示日期时间
- `datetime` 属性给机器看，格式要标准

```html
<!-- 完整日期 -->
发布于 <time datetime="2024-03-16">2024年3月16日</time>

<!-- 带时间 -->
活动时间：<time datetime="2024-03-16T14:30">3月16日 14:30</time>

<!-- 只显示年月 -->
<time datetime="2024-03">2024年3月</time>
```

### 5.10 `<mark>` 标记

- 标记需要高亮显示的文本

```html
<p>在搜索结果中，匹配到的关键词会<mark>高亮显示</mark></p>
```

### 5.11 `<details>` 和 `<summary>`

- 创建一个可折叠的内容区域（原生不需要 JS）

```html
<details>
  <summary>点击展开更多内容</summary>
  <p>这里是折叠起来的内容...</p>
  <ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
  </ul>
</details>

<!-- 默认展开 -->
<details open>
  <summary>展开状态</summary>
  <p>默认就是展开的</p>
</details>
```

### 5.12 `<address>` 联系信息

- 表示文档作者的联系信息
- 不要用来存无关的地址信息

```html
<footer>
  <address>
    作者：张三 <br>
    邮箱：<a href="mailto:zhangsan@example.com">zhangsan@example.com</a><br>
    地址：北京市朝阳区XX街道
  </address>
</footer>
```

## 6. 传统语义化标签

| 标签 | 语义 | 现在用法 |
|------|------|----------|
| `<h1>`-`<h6>` | 标题 | 仍然使用，注意层级 |
| `<p>` | 段落 | 仍然使用 |
| `<ul>`/`<ol>` | 列表 | 仍然使用 |
| `<strong>` | 重要文本 | 推荐代替 `<b>` |
| `<em>` | 强调文本 | 推荐代替 `<i>` |
| `<b>` | 加粗 | 已不推荐（无语义） |
| `<i>` | 斜体 | 已不推荐（无语义） |
| `<u>` | 下划线 | 已不推荐（无语义） |

### `<strong>` vs `<b>`，`<em>` vs `<i>`

```html
<!-- 推荐：语义化 -->
<strong>这是很重要的内容</strong>
<em>需要强调的内容</em>

<!-- 不推荐：只是样式，无语义 -->
<b>加粗</b>
<i>斜体</i>
```

- **`<strong>`** - 表示内容重要，加粗显示，有语义
- **`<b>`** - 只是加粗，无语义
- **`<em>`** - 表示强调，斜体显示，有语义
- **`<i>`** - 只是斜体，无语义

## 7. aria 属性增强语义

有时候 HTML 语义不够，可以用 aria 进一步增强无障碍。

```html
<!-- 地标角色 -->
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>

<!-- 在 HTML5 中，这些 role 其实可以省略，因为标签本身就有语义了 -->

<!-- 标签名已经带语义，不用再加 role： -->
<header>...</header>  <!-- 足够了 -->

<!-- aria-label 提供标签 -->
<nav aria-label="主导航">...</nav>
<nav aria-label="面包屑">...</nav>

<!-- aria-current 表示当前页 -->
<ul>
  <li><a href="/" aria-current="page">首页</a></li>
  <li><a href="/about">关于</a></li>
</ul>

<!-- aria-expanded 表示展开状态 -->
<button aria-expanded="false" aria-controls="menu">菜单</button>
<div id="menu">...</div>
```

## 8. 语义化 vs div 泛滥

### 常见错误：

```html
<!-- ❌ 过度使用 div -->
<div class="header">
  <div class="container">
    <div class="logo">
      <img src="logo.png">
    </div>
    <div class="nav">
      <div class="nav-item">...</div>
    </div>
  </div>
</div>

<!-- ✅ 语义化更清晰 -->
<header>
  <div class="container">
    <a href="/" class="logo">
      <img src="logo.png" alt="首页">
    </a>
    <nav>
      <ul>
        <li>...</li>
      </ul>
    </nav>
  </div>
</header>
```

**原则**：
- 能用语义化标签就不用 div
- 没有合适语义化标签时才用 div
- div 是最后选择，用于纯粹的容器

## 9. SEO 与 语义化

搜索引擎如何理解页面：
- `<h1>` 表示页面主题，一个页面最好一个 h1
- `<h2>`-`<h6>` 表示层级结构
- `<nav>` 告诉搜索引擎哪些是导航链接
- `<main>` 告诉搜索引擎哪里是主要内容
- `<article>` 告诉搜索引擎这是一篇文章
- 结构清晰的页面更容易被正确收录

## 10. 常见问题

### Q1: `<div>` 和 `<section>` 怎么选？

A:
- 如果仅仅是为了加样式方便布局 → 用 `<div>`
- 如果是内容分块，有明确标题 → 用 `<section>`

### Q2: `<article>` 和 `<section>` 怎么选？

A:
- 如果内容可以独立存在、单独复用 → 用 `<article>`
- 如果只是内容分组，依赖上下文 → 用 `<section>`

### Q3: 必须每个地方都用语义化标签吗？

A: 不是。容器还是用 div 没问题，语义化是让关键结构清晰，不是消灭 div。

### Q4: 语义化会影响布局吗？

A: 不会，标签默认样式可以通过 CSS 修改。语义化是结构层面的。

## 总结

核心要点：
1. 用对标签比用对 class 更重要
2. 根据内容选标签，而不是根据样式
3. 结构清晰对人对机器都好
4. 不要滥用 div，该用语义化就用

---

## 相关笔记

- [[01-HTML基础]]
- [[02-HTML元素与属性]]
- [[04-HTML表格与表单]]
- ../CSS/[[03-盒模型与布局]]

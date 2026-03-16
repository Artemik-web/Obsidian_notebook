# HTML 基础

## 1. HTML 简介

HTML（HyperText Markup Language，超文本标记语言）是构建 Web 页面的标准标记语言。HTML 描述了一个网站的结构，使用标记来标识不同的内容元素。

### 1.1 HTML 文档基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 1.2 常用 HTML 标签

| 标签 | 描述 | 示例 |
|------|------|------|
| `<h1>` - `<h6>` | 标题标签 | `<h1>一级标题</h1>` |
| `<p>` | 段落 | `<p>这是一个段落</p>` |
| `<a>` | 链接 | `<a href="https://example.com">链接文本</a>` |
| `<img>` | 图片 | `<img src="image.jpg" alt="描述">` |
| `<div>` | 块级容器 | `<div>内容</div>` |
| `<span>` | 行内容器 | `<span>文本</span>` |
| `<br>` | 换行 | 无需闭合 |
| `<hr>` | 水平线 | 无需闭合 |

## 2. 文本格式化标签

```html
<strong>加粗文本</strong>
<em>斜体文本</em>
<mark>高亮文本</mark>
<del>删除线</del>
<ins>下划线</ins>
<sub>下标</sub>
<sup>上标</sup>
```

## 3. 列表

### 3.1 无序列表

```html
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>
```

### 3.2 有序列表

```html
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>
```

### 3.3 定义列表

```html
<dl>
    <dt>术语</dt>
    <dd>术语的定义描述</dd>
</dl>
```

## 4. 表格

```html
<table>
    <thead>
        <tr>
            <th>表头 1</th>
            <th>表头 2</th>
            <th>表头 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>数据 1</td>
            <td>数据 2</td>
            <td>数据 3</td>
        </tr>
    </tbody>
</table>
```

### 表格属性

| 属性 | 说明 |
|------|------|
| `colspan` | 跨列合并 |
| `rowspan` | 跨行合并 |

## 5. 表单

### 5.1 表单基本结构

```html
<form action="/submit" method="POST">
    <!-- 表单元素 -->
    <button type="submit">提交</button>
</form>
```

### 5.2 常用表单控件

```html
<!-- 文本输入 -->
<input type="text" name="username" placeholder="请输入用户名">

<!-- 密码输入 -->
<input type="password" name="password" placeholder="请输入密码">

<!-- 邮箱输入 -->
<input type="email" name="email" placeholder="请输入邮箱">

<!-- 数字输入 -->
<input type="number" name="age" min="0" max="150">

<!-- 日期选择 -->
<input type="date" name="birthday">

<!-- 单选按钮 -->
<input type="radio" name="gender" value="male"> 男
<input type="radio" name="gender" value="female"> 女

<!-- 复选框 -->
<input type="checkbox" name="hobbies" value="reading"> 阅读
<input type="checkbox" name="hobbies" value="sports"> 运动

<!-- 下拉选择 -->
<select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>

<!-- 文本域 -->
<textarea name="description" rows="4" cols="50" placeholder="请输入描述"></textarea>

<!-- 文件上传 -->
<input type="file" name="avatar" accept="image/*">

<!-- 颜色选择 -->
<input type="color" name="favoriteColor">

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" value="50">

<!-- 搜索框 -->
<input type="search" name="query" placeholder="搜索...">

<!-- 提交按钮 -->
<button type="submit">提交</button>

<!-- 重置按钮 -->
<button type="reset">重置</button>
```

### 5.3 表单属性

| 属性 | 说明 |
|------|------|
| `required` | 必填项 |
| `readonly` | 只读 |
| `disabled` | 禁用 |
| `placeholder` | 提示文本 |
| `pattern` | 正则验证 |
| `min` / `max` | 最小/最大值 |
| `step` | 步长 |
| `autofocus` | 自动聚焦 |
| `autocomplete` | 自动完成 |

## 6. HTML5 新增特性

### 6.1 语义化标签

```html
<header>    <!-- 页眉/头部 -->
<nav>       <!-- 导航 -->
<main>      <!-- 主要内容 -->
<article>   <!-- 文章 -->
<section>   <!-- 区块 -->
<aside>     <!-- 侧边栏 -->
<footer>    <!-- 页脚 -->
<figure>    <!-- 图片/图表容器 -->
<figcaption> <!-- 图片/图表标题 -->
<time>      <!-- 时间 -->
<mark>      <!-- 标记 -->
```

### 6.2 多媒体标签

```html
<!-- 音频 -->
<audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>

<!-- 视频 -->
<video controls width="640" height="360" poster="preview.jpg">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    您的浏览器不支持视频播放。
</video>
```

### 6.3 常用属性

| 属性 | 说明 |
|------|------|
| `controls` | 显示控件 |
| `autoplay` | 自动播放 |
| `loop` | 循环播放 |
| `muted` | 静音 |
| `preload` | 预加载 |
| `poster` | 视频封面 |

## 7. 最佳实践

### 7.1 语义化

- 使用语义化标签代替 `<div>` 和 `<span>`
- 使用正确的标题层级（h1-h6）
- 使用 `alt` 属性描述图片内容

### 7.2 可访问性

```html
<!-- 为表单添加标签 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username">

<!-- 使用 aria 属性 -->
<button aria-label="关闭" onclick="closeModal()">×</button>

<!-- 语义化表格 -->
<table>
    <caption>员工信息表</caption>
    <thead>...</thead>
    <tbody>...</tbody>
</table>
```

### 7.3 SEO 优化

```html
<head>
    <!-- 页面标题（重要） -->
    <title>页面标题 - 网站名称</title>

    <!-- 元描述 -->
    <meta name="description" content="页面描述，显示在搜索结果中">

    <!-- 关键词 -->
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">

    <!-- 作者 -->
    <meta name="author" content="作者名称">

    <!-- 视口设置（移动设备必需） -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- 规范 URL -->
    <link rel="canonical" href="https://example.com/page">

    <!-- Open Graph（社交分享） -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com/page">
</head>
```

### 7.4 性能优化

```html
<!-- 图片懒加载 -->
<img src="placeholder.jpg" data-src="image.jpg" loading="lazy" alt="描述">

<!-- 异步加载 JavaScript -->
<script src="script.js" async></script>

<!-- 延迟加载 JavaScript -->
<script src="script.js" defer></script>

<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

---

## 参考资料

- [MDN HTML 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [W3Schools HTML 教程](https://www.w3schools.com/html/)
- [HTML5 规范](https://html.spec.whatwg.org/)

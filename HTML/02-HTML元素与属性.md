# HTML 元素与属性

## 1. HTML 元素分类

### 1.1 块级元素

块级元素在浏览器中默认占据一整行。

常见块级元素：

- `<div>` - 通用块容器
- `<p>` - 段落
- `<h1>`-`<h6>` - 标题
- `<ul>`-`<ol>`-`<li>` - 列表
- `<table>` - 表格
- `<form>` - 表单
- `<main>` - 主要内容区域
- `<header>` - 页眉
- `<footer>` - 页脚
- `<section>` - 区块
- `<article>` - 文章
- `<nav>` - 导航
- `<aside>` - 侧边栏

### 块级元素特点：
- 默认宽度为父容器的 100%
- 每个块级元素都会另起一行显示
- 可以包含行内元素和其他块级元素
- 可以设置 width 和 height 属性

### 1.1.2 行内元素

行内元素只占据其内容需要的宽度，不会另起一行。

常见行内元素：
- `<span>` - 通用行内容器
- `<a>` - 超链接
- `<strong>` - 加粗
- `<em>` - 斜体
- `<span>` - 行内容器
- `<img>` - 图片
- `<br>` - 换行
- `<label>` - 标签
- `<input>` - 输入框
- `<button>` - 按钮
- `<code>` - 代码片段

行内元素特点：
- 宽度由内容决定，不强制换行
- 不能设置 width 和 height 属性（inline 不可设置，inline-block 可以）
- 只能包含文本和其他行内元素，不能包含块级元素

### 1.1.3 行内块元素

结合了块级和行内的特点：

常见行内块元素：
- `<img>` - 图片
- `<input>` - 输入框
- 通过 CSS `display: inline-block` 设置的元素

行内块元素特点：
- 不强制换行（和行内一样）
- 可以设置 width 和 height（和块级一样）

## 2. HTML 属性

### 2.1 全局属性

所有 HTML 元素都可以使用这些属性：

| 属性 | 说明 | 示例 |
|------|------|------|
| `class` | 为元素指定类名，供 CSS 和 JS 使用 | `<div class="container main">` |
| `id` | 唯一标识符，文档中只能有一个 | `<div id="header">` |
| `style` | 内联 CSS 样式 | `<div style="color: red;">` |
| `title` | 提示信息，鼠标悬停显示 | `<div title="提示内容">` |
| `lang` | 指定元素语言 | `<html lang="zh-CN">` |
| `dir` | 文本方向 | `<div dir="rtl">` |
| `data-*` | 自定义数据属性 | `<div data-id="123">` |
| `hidden` | 隐藏元素 | `<div hidden>` |
| `tabindex` | 聚焦顺序 | `<button tabindex="1">` |
| `accesskey` | 快捷键 | `<button accesskey="s">` |
| `contenteditable` | 是否可编辑 | `<div contenteditable="true">` |
| `draggable` | 是否可拖动 | `<div draggable="true">` |
| `spellcheck` | 拼写检查 | `<input spellcheck="false">` |

### 2.2 常用元素属性

#### 超链接 `<a>` 属性

```html
<!-- href - 链接地址 -->
<a href="https://example.com">外部链接</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到章节1</a>
<div id="section1">章节1</div>

<!-- 邮件链接 -->
<a href="mailto:test@example.com">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:+8613800000000">拨打电话</a>

<!-- target - 打开方式 -->
<a href="https://example.com" target="_blank">在新窗口打开</a>
<!-- target 常用值：
   _blank - 新窗口打开
   _self - 当前窗口打开（默认）
   _parent - 父框架
   _top - 整个窗口
-->

<!-- rel - 关系 -->
<a href="https://example.com" rel="noopener noreferrer">外部链接</a>
<!-- 常用 rel 值：
   nofollow - 告诉搜索引擎不要追踪
   noopener - 防止安全问题
   noreferrer - 不发送来源信息
-->
```

#### 图片 `<img>` 属性

```html
<img
    src="image.jpg"      <!-- 图片地址 -->
    alt="图片描述"       <!-- 替代文字，图片加载失败时显示 -->
    width="300"         <!-- 宽度 -->
    height="200"        <!-- 高度 -->
    loading="lazy"       <!-- 懒加载 -->
    srcset="small.jpg 400w, large.jpg 800w"  <!-- 响应式图片 -->
    sizes="(max-width: 600px) 100vw, 50vw"
>
```

### 2.3 布尔属性

有些属性只有两种状态：存在或不存在：

```html
<!-- 写法一：完整写法 -->
<input required="required">
<button disabled="disabled">

<!-- 写法二：简写（推荐） -->
<input required>
<button disabled>

常用布尔属性：
- `required` - 必填
- `disabled` - 禁用
- `checked` - 选中
- `readonly` - 只读
- `multiple` - 多选
- `autofocus` - 自动聚焦
- `autoplay` - 自动播放
```

## 3. 全局属性实战应用

### 3.1 `class` 和 `id` 的区别

| 区别 | `class` | `id` |
|------|---------|------|
| 唯一性 | 可以多个元素使用同一个 class | 文档中必须唯一 |
| CSS 选择器 | `.class 选择器 | `#id 选择器 |
| 使用场景 | 多个元素样式相同 | 唯一元素、锚点、JS 获取 |
| 举例 | `.card` 可以给多个元素 | `#header` 只给头部用 |

### 3.2 `data-*` 自定义数据属性

在 HTML 中存储自定义数据：

```html
<!-- HTML -->
<div
    data-product-id="123"
    data-product-name="苹果手机"
    data-price="5999"
    data-on-sale="true"
>
    产品卡片
</div>

<!-- JavaScript 获取 -->
<script>
const product = document.querySelector('[data-product-id]');
console.log(product.dataset.productId);      // "123"
console.log(product.dataset.productName);    // "苹果手机"
console.log(product.dataset.price);          // "5999"
</script>

<!-- CSS 使用 -->
<style>
div[data-on-sale="true"] {
    border: 2px solid green;
}
</style>
```

## 4. 实体字符（特殊字符）

在 HTML 中，有些字符需要用实体表示：

| 字符 | 实体名称 | 实体编号 | 说明 |
|------|----------|----------|------|
| `<` | `&lt;` | `&#60;` | 小于号 |
| `>` | `&gt;` | `&#62;` | 大于号 |
| `&` | `&amp;` | `&#38;` | 和号 |
| `"` | `&quot;` | `&#34;` | 双引号 |
| `'` | `&apos;` | `&#39;` | 单引号 |
| 空格 | `&nbsp;` | `&#160;` | 非换行空格 |
| `©` | `&copy;` | `&#169;` | 版权符号 |
| `®` | `&reg;` | `&#174;` | 注册商标 |
| `™` | `&trade;` | `&#8482;` | 商标 |
| `™` | `&trade;` | |
| `€` | `&euro;` | `&#8364;` | 欧元 |
| `¥` | `&yen;` | `&#165;` | 人民币/日元 |
| `£` | `&pound;` | `&#163;` | 英镑 |

### 使用场景：

```html
<!-- 错误写法（会被解析成标签） -->
<p>if a < b 那么 ...</p>

<!-- 正确写法 -->
<p>if a &lt; b 那么 ...</p>

<!-- 多个空格 -->
<!-- HTML 会合并多个空格为一个，使用 &nbsp; 保留空格 -->
<p>hello&nbsp;&nbsp;&nbsp;world</p>
```

## 5. HTML 注释

```html
<!-- 这是单行注释 -->

<!--
这是多行
注释
-->

<!-- 条件注释（仅IE识别，已废弃 -->
<!--[if IE]>
    <p>这只在 IE 中显示
<![endif]-->
```

## 6. 元数据标签 `<meta>`

`<meta>` 标签用于提供页面元数据：

```html
<!-- 字符编码 -->
<meta charset="UTF-8">

<!-- 视口设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 页面描述 -->
<meta name="description" content="页面描述内容">

<!-- 关键词 -->
<meta name="keywords" content="前端, HTML, CSS, JavaScript">

<!-- 作者 -->
<meta name="author" content="作者名称">

<!-- 自动刷新 -->
<meta http-equiv="refresh" content="5; url=https://example.com">
<!-- 5秒后跳转到 example.com -->

<!-- 防止缓存 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

## 7. 链接类型汇总

### 7.1 各种链接写法

```html
<!-- 绝对链接 -->
<a href="https://example.com/path/page.html">绝对路径</a>

<!-- 相对链接 -->
<a href="about.html">同目录文件</a>
<a href="../images/logo.png">上级目录</a>
<a href="https://example.com/path/../../file.html">当前域名下根目录</a>

<!-- 锚点链接（本页跳转） -->
<a href="#section1">跳转到本页的 section1</a>
<div id="section1">...</div>

<!-- 锚点到其他页面 -->
<a href="about.html#team">跳转到 about.html 页面的 team 锚点</a>

<!-- 邮件链接 -->
<a href="mailto:user@example.com">发邮件给我</a>

<!-- 电话链接 -->
<a href="tel:+8613800000000">打电话给我</a>

<!-- 下载链接 -->
<a href="document.pdf" download>下载文件</a>
<a href="document.pdf" download="我的文档.pdf">下载并指定文件名</a>

<!-- JavaScript 链接（不推荐） -->
<a href="javascript:void(0);" onclick="doSomething()">点击</a>
<!-- 更好的写法用 # + 事件监听 -->
<a href="#" onclick="doSomething(); return false;">点击</a>
```

### 7.2 打开方式

- `target="_self` - 在当前窗口打开（默认）
- `target="_blank"` - 在新窗口打开
- `target="_top"` - 在顶层窗口打开
- `target="_parent"` - 在父框架打开

## 8. iframe 嵌入其他页面

```html
<iframe
    src="https://example.com"
    width="100%"
    height="500"
    frameborder="0"
    allowfullscreen
    sandbox
>
    您的浏览器不支持 iframe。
</iframe>
```

安全注意事项：
- 使用 `sandbox` 属性可以限制 iframe 的权限
- 嵌入式 `allow="allow-same-origin allow-scripts` 可以按需开放权限
- `allowfullscreen` 允许全屏

## 9. 最佳实践

1. **属性命名**
   - class 和 id 使用小写字母加连字符：`user-profile`（推荐）
   - 避免使用驼峰 `userProfile` 下划线 `user_profile（不推荐）
   - 使用有语义的命名：`header`、`navigation`、`main-content`

2. **属性顺序**（推荐规范）
   - 推荐顺序：`class` → `id` → `data-*` → 其他属性

3. **属性值使用引号**
   - 使用双引号（推荐）：`class="container"`
   - 也可以使用单引号：`class='container'`

4. **布尔属性简写**
   - `<input required>`（推荐）
   - 不需要：`<input required="required">`（冗余写法）

5. **标签闭合**
   - 所有标签都应该闭合
   - 自闭合标签可以简写：`<img>` 而不是 `<img />`

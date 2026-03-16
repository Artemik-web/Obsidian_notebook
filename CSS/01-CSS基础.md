# CSS 基础

## 1. CSS 简介

CSS（Cascading Style Sheets，层叠样式表）用于描述 HTML 文档的外观和样式。CSS 负责网页的"颜值"，HTML 负责网页的结构。

- HTML：做结构（骨架）
- CSS：做表现（外观）

## 2. CSS 引入方式

### 2.1 内联样式（Inline）

写在标签的 `style` 属性里：

```html
<div style="color: red; font-size: 16px;">
  红色文字
</div>
```

**缺点**：不能复用，结构样式混在一起，不推荐。

### 2.2 内部样式表（Internal）

写在 `<style>` 标签里：

```html
<head>
  <style>
    body {
      margin: 0;
      background: #f5f5f5;
    }
    .title {
      color: red;
      font-size: 24px;
    }
  </style>
</head>
```

适合单个页面的特殊样式。

### 2.3 外部样式表（External）推荐！

写在单独的 `.css` 文件中，通过 `<link>` 引入：

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

`style.css`：
```css
body {
  margin: 0;
  background: #f5f5f5;
}
.title {
  color: red;
  font-size: 24px;
}
```

**优点**：
- 结构样式分离
- 多个页面可以复用
- 浏览器可以缓存

### 2.4 @import 导入

```css
/* 在 CSS 文件中导入其他 CSS 文件 */
@import "reset.css";
@import "components.css";
```

注意：`@import` 会阻塞加载，性能不如多个 `<link>`。

## 3. CSS 语法

```css
选择器 {
  属性: 值;
  属性: 值;
  /* 注释 */
}
```

- **选择器**：选中哪些元素
- **声明块**：给选中的元素设置样式
- **属性**：要设置什么样式（颜色、字体、大小...）
- **值**：设置成什么样

例子：
```css
/* 选择所有 p 标签，设置颜色为红色，字体大小为 16px */
p {
  color: red;
  font-size: 16px;
}
```

## 4. 基本选择器

### 4.1 通用选择器

选中所有元素：

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

常用于清除默认边距。性能一般，大面积使用慎重。

### 4.2 元素选择器（标签选择器）

选中所有该标签的元素：

```css
p {
  color: gray;
}

h1 {
  font-size: 24px;
}
```

### 4.3 class 选择器（最常用！）

选中所有有该 class 的元素：

```css
/* .类名 */
.container {
  width: 1200px;
  margin: 0 auto;
}

.text-red {
  color: red;
}

.text-center {
  text-align: center;
}
```

HTML：
```html
<div class="container">
  <p class="text-red text-center">红色居中文字</p>
</div>
```

**一个元素可以有多个 class，空格分隔。**

**命名规范：小写字母 + 连字符（推荐）**
- ✅ `header-container`
- ❌ `headerContainer`（驼峰）
- ❌ `header_container`（下划线）

### 4.4 id 选择器

选中 id 匹配的元素，id 在页面中唯一：

```css
/* #id */
#header {
  height: 60px;
  background: white;
}
```

HTML：
```html
<div id="header"></div>
```

**注意：** id 一般用于 JS 钩子，不推荐写样式用。class 更适合复用。

### 4.5 基本选择器总结

| 选择器 | 语法 | 优先级 | 使用场景 |
|--------|------|--------|----------|
| 元素选择器 | `p {}` | 最低 | 重置标签默认样式 |
| class | `.box {}` | 中等 | 最常用，写样式 |
| id | `#box {}` | 高 | JS 获取元素，不推荐样式 |
| 通用 | `* {}` | 最低 | 清除默认样式 |

## 5. 复合选择器

### 5.1 后代选择器（空格）

选中祖先元素内部的后代元素：

```css
/* 选中 .nav 里面的所有 li */
.nav li {
  list-style: none;
}

/* 选中 .container 里面的 .title */
.container .title {
  font-size: 24px;
}
```

后代包括儿子、孙子...所有层级。

### 5.2 子选择器 (`>`)

只选直接子元素：

```css
/* 只选直接儿子，不选孙子 */
.nav > ul > li {
  list-style: none;
}
```

### 5.3 并集选择器 (`,`)

多个选择器应用相同样式：

```css
/* h1 和 h2 都设置红色 */
h1, h2 {
  color: red;
}

/* 清除列表默认样式 */
ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

### 5.4 交集选择器

既是这个又是那个：

```css
/* 既是 p 标签，又有类 .text-red */
p.text-red {
  color: red;
}

/* div 且有类 .container */
div.container {
  width: 1200px;
}
```

**注意**：标签写前面，类写后面。

### 5.5 伪类选择器 (`:`)

用于选择元素的特殊状态。

最常用的是 `:hover`（鼠标悬停）：

```css
.button {
  background: gray;
  transition: background 0.3s;
}

.button:hover {
  background: blue;
  color: white;
}

a:hover {
  color: red;
  text-decoration: underline;
}
```

其他常用伪类：

```css
/* 第一个子元素 */
li:first-child {
  border-top: none;
}

/* 最后一个子元素 */
li:last-child {
  border-bottom: none;
}

/* 第 n 个 */
li:nth-child(2n) { /* 偶数行 */
  background: #f5f5f5;
}
li:nth-child(odd) { /* 奇数行 */
  background: white;
}

/* 空元素 */
:empty {
  display: none;
}

/* 聚焦状态（输入框） */
input:focus {
  border-color: blue;
  outline: none;
}

/* 禁用状态 */
input:disabled {
  background: #eee;
  cursor: not-allowed;
}

/* 选中状态（复选框单选） */
input:checked {
  accent-color: blue;
}
```

### 5.6 伪元素 (`::`)

创建虚拟元素，用来装饰：

```css
/* 清除浮动 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 前面添加内容 */
.content::before {
  content: "▶";
  color: blue;
}

/* 选择第一行 */
p::first-line {
  font-weight: bold;
}

/* 选择第一个字 */
p::first-letter {
  font-size: 2em;
  float: left;
  line-height: 1;
  margin-right: 4px;
}
```

**注意：伪元素用双冒号 `::`，伪类用单冒号 `:`。**

## 6. CSS 颜色表示法

### 6.1 关键字

```css
color: red;
color: blue;
color: green;
color: transparent; /* 透明 */
color: currentColor; /* 继承父元素 color */
```

### 6.2 十六进制

```css
color: #ff0000; /* red */
color: #00ff00; /* green */
color: #0000ff; /* blue */
color: #fff; /* 缩写 = #ffffff */
color: #000; /* 缩写 = #000000 */
```

每两位表示 R、G、B（00-FF）。

### 6.3 rgb/rgba

```css
color: rgb(255, 0, 0); /* red 0-255 */
color: rgba(255, 0, 0, 0.5); /* 半透明 alpha 0-1 */

/* 透明度写法 */
background: rgba(0, 0, 0, 0.5); /* 半透黑 */
```

### 6.4 HSL

```css
color: hsl(0, 100%, 50%); /* 色相(0-360), 饱和度, 明度 */
color: hsla(0, 100%, 50%, 0.5);
```

开发中最常用：十六进制 → rgb/rgba → 关键字。

## 7. CSS 优先级（特殊性）

当同一个元素被多个选择器选中时，哪个选择器优先级高，应用哪个样式。

### 优先级从高到低：

1. **`!important`** → 最高（强制覆盖，尽量少用！）
2. **内联样式** `style="..."` → 1000
3. **id 选择器** → 100 每一个
4. **类选择器、伪类、属性选择器** → 10 每一个
5. **元素选择器** → 1 每一个
6. **通用选择器 `*`** → 0

### 计算例子：

```css
div ul li /* 3 个元素 → 3 = 1+1+1 */
.nav li /* 1个类 + 1个元素 = 11 = 10+1 */
#nav .active li /* 1个id + 1个类 + 1个元素 = 100+10+1 = 111 */
```

优先级更高胜出，不是看数量多少，是看权重。

### 口诀：
- 内联 > ID > 类 > 元素
- 同一优先级，后面写的覆盖前面的
- 继承的样式优先级最低，比 0 还低

### 实用建议：
- 不要用 id 写样式，用 class（优先级太高不好覆盖）
- 不要随便用 `!important`
- 保持选择器简洁，不要太深层级：
  - ✅ `.nav-list-item { }`
  - ❌ `.nav .nav-list .item a { }` 没必要嵌套太深

## 8. CSS 继承

哪些属性可以继承？
- `color`、`font-size`、`font-family`、`line-height`... 文字相关的大多可以继承
- `margin`、`padding`、`border`、`background`... 盒模型相关的一般不能继承

```html
<style>
  .parent {
    color: red;
    font-size: 16px;
  }
</style>
<div class="parent">
  <p>这段文字继承了红色和16px</p>
</div>
```

利用继承减少代码。

## 9. 盒模型

每个元素都是一个盒子。

盒模型组成：`content` → `padding` → `border` → `margin`

```css
.box {
  width: 100px;      /* 内容宽度 */
  height: 100px;     /* 内容高度 */
  padding: 10px;     /* 内边距，内容和边框之间 */
  border: 1px solid black; /* 边框 */
  margin: 10px;      /* 外边距，盒子外面和其他盒子之间 */
}
```

### `box-sizing`

```css
/* 默认：content-box */
/* width = content 宽度，padding 和 border 额外加 */
box-sizing: content-box;

/* 推荐：border-box */
/* width = content + padding + border，总宽度就是你写的宽度 */
box-sizing: border-box;
```

**全局重置推荐：**
```css
* {
  box-sizing: border-box;
}
```

这样设置 padding 不会把盒子撑大，更好计算。

## 10. 块级元素 vs 行内元素 CSS 表现

| | 块级 `display: block` | 行内 `display: inline` | 行内块 `display: inline-block` |
|---|-----------------------|-------------------------|---------------------------------|
| 默认宽度 | 父容器 100% | 内容宽度 | 内容宽度 |
| 换行 | 独占一行 | 不换行 | 不换行 |
| width/height | 可以设置 | 不生效 | 可以设置 |
| 可以放块级 | 可以 | 不能（只能放文字行内） | 可以放块级 |

**转换：**
```css
div {
  display: inline; /* 块转行内 */
}

span {
  display: block; /* 行内转块 */
}

a {
  display: inline-block; /* 既可以设置宽高，又不换行 */
}
```

## 11. 居中方法

### 水平居中

```css
/* 块级元素，宽度确定 */
.block {
  margin-left: auto;
  margin-right: auto;
  /* 简写 */
  margin: 0 auto;
}

/* 行内内容文字居中 */
.parent {
  text-align: center;
}

/* Flex 居中（多个盒子水平居中 */
.parent {
  display: flex;
  justify-content: center;
  gap: 10px;
}
```

### 垂直居中

```css
/* 单行文字垂直居中 = line-height 等于高度 */
.item {
  height: 40px;
  line-height: 40px;
}

/* Flex 垂直居中 */
.parent {
  display: flex;
  align-items: center;
  min-height: 100vh;
}

/* Flex 水平垂直都居中 */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 12. 浮动清除

浮动会导致父元素高度塌陷，需要清除浮动。

**推荐清除浮动方法：**
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
```

HTML 给父元素加 class="clearfix" 就好。

## 参考

- [MDN CSS 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS-Tricks](https://css-tricks.com/)

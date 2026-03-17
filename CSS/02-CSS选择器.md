# CSS 选择器全解

## 1. 选择器分类

| 分类 | 选择器 |
|------|--------|
| 基础选择器 | 通用选择器 `*`、元素选择器、class选择器、id选择器 |
| 组合选择器 | 后代 `空格`、子 `>`、兄弟 `+ ~`、并集 `,`、交集 |
| 属性选择器 | `[attr]`, `[attr=value]`, `[attr^=value]`, `[attr$=value]`, `[attr*=value]` |
| 伪类 | `:hover`, `:nth-child()`, `:first-child`, `:focus`... |
| 伪元素 | `::before`, `::after`, `::first-line`, `::first-letter` |

## 2. 基础选择器

```css
/* 1. 通用选择器 - 选中所有 */
* {
  margin: 0;
  padding: 0;
}

/* 2. 元素选择器 - 选中所有该标签 */
p {
  color: #333;
}

/* 3. class 选择器 - 最常用 */
.container {
  max-width: 1200px;
}
.text-red {
  color: red;
}

/* 4. id 选择器 */
#header {
  height: 60px;
}
```

## 3. 组合选择器

### 3.1 后代选择器（空格）

选中所有后代（儿子、孙子...所有层级）：

```css
/* .nav 里面所有的 a 标签 */
.nav a {
  text-decoration: none;
  color: #333;
}

/* article 里面所有的 p */
article p {
  line-height: 1.8;
}
```

### 3.2 子选择器 `>`

只选直接子元素，不选孙子：

```css
/* 只选直接孩子，不选更深层级 */
.nav > ul > li {
  border-bottom: 1px solid #eee;
}
```

对比：
```css
/* 所有后代都选 */
.nav li { color: red; }

/* 只选直接子li */
.nav > li { color: blue; }
```

### 3.3 相邻兄弟选择器 `+`

选中紧邻的下一个兄弟：

```css
/* h2 后面紧邻的 p */
h2 + p {
  margin-top: 10px;
  color: red;
}
```

HTML：
```html
<h2>标题</h2>
<p>这个会被选中 ← 它是h2相邻下一个兄弟</p>
<p>这个不会被选中</p>
```

### 3.4 通用兄弟选择器 `~`

选中后面所有同级兄弟：

```css
/* h2 后面所有同级 p */
h2 ~ p {
  color: red;
}
```

### 3.5 并集选择器 `,`

多个选择器设置相同样式：

```css
/* 多个元素统一样式 */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 1em 0;
  font-weight: bold;
}

ul, ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 多个类 */
.btn-primary, .btn-secondary {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

### 3.6 交集选择器

同时满足多个条件：

```css
/* 既是 p 标签，又有类 text-red */
p.text-red {
  color: red;
}

/* a 标签，类 active */
a.active {
  color: blue;
  font-weight: bold;
}
```

## 4. 属性选择器

根据 HTML 属性选择元素，非常适合表单、自定义属性。

```css
/* 有这个属性就选中 */
[disabled] {
  color: #ccc;
  cursor: not-allowed;
}

/* 属性等于某个值 */
[type="text"] {
  border: 1px solid #ccc;
}

/* 属性以某个值开头 ^= */
[class^="btn-"] {
  /* 所有以 btn- 开头的 class */
  padding: 8px 16px;
  border-radius: 4px;
}

/* 属性以某个值结尾 $= */
[href$=".pdf"] {
  /* 所有链接到 pdf 的 */
  background: url(pdf-icon.png) no-repeat left center;
  padding-left: 20px;
}

/* 属性包含某个值 *= */
[class*="col-"] {
  /* 包含 col- 的类 */
  float: left;
}

/* 属性值是空格分开的列表中包含 ~= */
[class~="active"] {
  /* class 列表里有 active */
  background: blue;
}
```

**实用示例：**
```css
/* 给不同类型的输入框设置样式 */
input[type="text"] { width: 200px; }
input[type="search"] { border-radius: 20px; }
input[type="submit"] { background: blue; }

/* 给外链接加图标 */
a[href^="http"]:not([href^="https://your-domain.com"])::after {
  content: " ↗";
  font-size: 0.8em;
  color: #999;
}
```

## 5. 伪类选择器 `:`

伪类用于选择元素的**特殊状态**或**位置**。

### 5.1 结构伪类（位置相关）

```css
/* 第一个子元素 */
ul li:first-child {
  border-top: none;
}

/* 最后一个子元素 */
ul li:last-child {
  border-bottom: none;
}

/* 第 n 个子元素 */
li:nth-child(2) { /* 第2个 */
  background: yellow;
}
li:nth-child(odd) { /* 奇数 */
  background: #f5f5f5;
}
li:nth-child(even) { /* 偶数 */
  background: white;
}
li:nth-child(3n) { /* 每3个，第3、6、9... */
  background: #eee;
}
li:nth-child(n + 3) { /* 从第3个开始往后 */
  color: red;
}
li:nth-child(-n + 3) { /* 前3个 */
  color: blue;
}

/* 唯一子元素时才选中 */
li:only-child {
  margin: 0;
}

/* 第一个符合类型的子元素 */
article p:first-of-type {
  font-size: 1.2em;
}

/* 空元素（没有内容包括没有文本节点） */
div:empty {
  display: none;
}
```

#### `:nth-child()` vs `:nth-of-type()` 区别：

```html
<div>
  <h1>标题</h1>
  <p>第一段</p> <!-- 这里 → -->
  <p>第二段</p>
</div>
```

```css
p:nth-child(2) {
  /* 选中：第二个子元素恰好是p → 就是第一个p，会选中 ✓ */
  color: red;
}

p:nth-of-type(1) {
  /* 选中：第一个 p 类型的元素 → 就是第一个p，也会选中 ✓ */
  color: red;
}
```

区别：
- `:nth-child(n)` → 数位置的时候所有元素一起数，然后看它是不是p
- `:nth-of-type(n)` → 只在同类型里数，数到第n个

### 5.2 用户交互伪类（状态相关）

```css
/* 鼠标悬停 */
a:hover {
  color: red;
  text-decoration: underline;
}

.button:hover {
  background: darkblue;
}

/* 点击激活瞬间 */
a:active {
  color: green;
}

/* 输入框聚焦 */
input:focus {
  border-color: blue;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* 选中状态（复选框、单选） */
input:checked {
  accent-color: blue;
}

/* 禁用状态 */
input:disabled {
  background: #eee;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 启用状态 */
input:enabled {
  /* ... */
}

/* 必填 */
input:required {
  border-left: 3px solid red;
}

/* 可选 */
input:optional {
  /* ... */
}

/* 验证通过 */
input:valid {
  border-color: green;
}

/* 验证失败 */
input:invalid {
  border-color: red;
}

/* 目标锚点 */
:target {
  /* 用户点击锚点 #section1 后高亮 */
  background: yellow;
}
```

### 5.3 否定伪类 `:not()`

排除某些元素：

```css
/* 所有 p 除了 .special */
p:not(.special) {
  color: gray;
}

/* 除了最后一个 li，都加下边框 */
li:not(:last-child) {
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

/* 不是最后一个孩子的 margin-bottom */
.container > *:not(:last-child) {
  margin-bottom: 20px;
}
```

CSS 选择器可以嵌套:not：
```css
:not(.a):not(.b) { /* 不是a也不是b */ }
```

### 5.4 其他伪类

```css
/* 根元素 <html> */
:root {
  /* 定义CSS变量常用 */
  --primary-color: #007bff;
}

/* 任意元素处于全屏模式 */
:fullscreen {
  background: white;
}
```

## 6. 伪元素 `::`

伪元素创建一个虚拟元素，在 CSS 中添加内容。

| 伪元素 | 作用 |
|--------|------|
| `::before` | 在元素内容**前面**插入内容 |
| `::after` | 在元素内容**后面**插入插入内容 |
| `::first-line` | 选中第一行文本 |
| `::first-letter` | 选中第一个字 |
| `::selection` | 选中被用户高亮选中的部分 |
| `::placeholder` | 输入框占位符样式 |

### 6.1 `::before` 和 `::after`

```css
/* 清除浮动最经典用法 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 添加小箭头 */
.nav > li::after {
  content: " ▼";
  font-size: 0.8em;
  color: #999;
}

/* 添加引号 */
blockquote::before {
  content: "“";
  font-size: 3em;
  color: #ccc;
  line-height: 0;
  vertical-align: middle;
}
```

**要点：**
- 必须写 `content: ""`，哪怕内容为空
- 默认是行内元素，需要块级要设置 `display: block`
- 伪元素里面不能放真实 HTML，只能放 CSS 生成的内容

### 6.2 `::first-line`

选中第一行文本：

```css
p::first-line {
  font-weight: bold;
  color: red;
}
```

只能用跟字体相关的属性：`color` `font` `background` 等，不能用盒模型。

### 6.3 `::first-letter`

选中第一个字：

```css
/* 首字下沉效果 */
p::first-letter {
  font-size: 3em;
  float: left;
  line-height: 1;
  margin-right: 6px;
  font-weight: bold;
}
```

### 6.4 `::selection`

用户选中文字时的高亮样式：

```css
::selection {
  background: yellow;
  color: black;
}

::-moz-selection { /* Firefox 旧版兼容 */
  background: yellow;
}
```

### 6.5 `::placeholder`

输入框占位符样式：

```css
::placeholder {
  color: #999;
  font-style: italic;
  opacity: 1;
}
```

## 7. 选择器优先级计算

优先级用 (a, b, c) 表示：
- **a**: id 选择器个数
- **b**: class 选择器、伪类、属性选择器 个数
- **c**: 元素选择器、伪元素 个数

比较的时候：
- a 大，优先级高
- a 相同，比 b，b 大就高
- a b 都相同，比 c，c 大就高
- 都相同，后面写的覆盖前面的

**权重**：
- `!important` → 最高，不管什么情况都覆盖
- 内联样式 `style=""` → (1, 0, 0)
- id → 每个 +1a
- class / 伪类 / 属性 → 每个 +1b
- 元素 / 伪元素 → 每个 +1c

### 例子计算：

```css
/* 例子 1 */
div #nav .item a {
  /* 1 id (#nav) + 1 class (.item) + 2 元素 (div, a) */
  /* a=1, b=1, c=2 → (1, 1, 2) */
}

/* 例子 2 */
.header .nav .item a {
  /* 3 class + 1 元素 */
  /* a=0, b=3, c=1 → (0, 3, 1) */
}

/* (1, 1, 2) vs (0, 3, 1) → a 大，所以第一个优先级高 */
```

### 口诀

- ！important 是老大，内联百人敌，id 十个兵，class 伪类一个兵，元素伪元素一个兵。

### 优先级常见陷阱

```css
/* 问题：哪个优先级高？ */
#header .nav {
  color: red; /* 1 id + 1 class → (1, 1, 0) */
}

body .container .nav {
  color: blue; /* 0 id + 2 class → (0, 2, 0) */
}

/* 结果：红色生效！因为 1 > 0，哪怕后面加了 100 个 class 也比不过 1 个 id */
```

## 8. 层叠规则

当多个规则选中同一个元素时：
1. 优先级高的胜出
2. 优先级相同，后写的胜出
3. 继承来的样式优先级最低，低于直接选中

## 9. 实用选择器技巧

### 1. 每个项除了最后一个加 margin

```css
.item:not(:last-child) {
  margin-bottom: 10px;
}
```

### 2. 所有项除了第一个加 margin

```css
.item:not(:first-child) {
  margin-top: 10px;
}
```

### 3. 偶数行变色（表格/列表）

```css
tr:nth-child(even) {
  background: #f5f5f5;
}
```

### 4. 给外链加图标

```css
a[href^="http"]:not([href*="your-domain.com"])::after {
  content: " ↗";
}
```

### 5. 清除浮动

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

### 6. 空元素隐藏

```css
p:empty {
  display: none;
}
```

## 10. 选择器性能

一般场景不用太关心性能，优化点：
- 不要写太深层级：`html body .nav ul li a` → 可以简化成 `.nav a`
- 避免用通用选择器做关键选择器：`.box * { color: red; }` 会匹配所有元素
- 多用 class，少用标签嵌套

现代浏览器很快，过度优化没必要，代码可读性更重要。

---

## 相关笔记

- [[01-CSS基础]]
- [[03-盒模型与布局]]
- [[04-文字与排版]]

# Tailwind CSS 基础

## 什么是 Tailwind CSS
Tailwind 是一个 **功能类优先（utility-first）** 的 CSS 框架，它不提供现成的组件，而是提供大量小巧的功能类（比如 `flex`、`pt-4`、`text-center`），你直接在 HTML 里组合这些类来构建页面。

和 Bootstrap 区别：
- Bootstrap 给你现成组件（`btn`、`card`、`navbar`）
- Tailwind 给你工具类，自己组合出任何组件

## 核心思想
**Constraint-based styling**：用功能类约束样式，不用写自定义 CSS，大部分场景不用写 CSS，直接写类。

优点：
- 不用想类名了，直接用工具类，避免 CSS 命名污染
- HTML 和样式在一起，不用来回切文件
- 不用维护 CSS 文件，项目变大 CSS 也不会很臃肿
- 响应式非常方便，内置断点
- 可自定义，颜色、间距、断点都能改

缺点：
- HTML 看起来类很多，比较脏
- 学习成本，要记住很多类名
- 小项目反而比写原生 CSS 慢

## 基本使用

### Vite 项目安装
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js` 配置：
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

入口 CSS 文件引入：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后就可以在 HTML/Vue/React 里用了：

```html
<!-- 一个居中的蓝色卡片 -->
<div class="max-w-md mx-auto p-6 bg-blue-500 rounded-lg shadow-lg">
  <h1 class="text-white text-2xl font-bold mb-4">Hello Tailwind</h1>
  <p class="text-white opacity-90 mb-4">这是一个卡片</p>
  <button class="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
    点击按钮
  </button>
</div>
```

## 常用语法规则

Tailwind 类命名基本遵循规则：`属性-值` 或者 `属性-断点-值`

### 间距
- `m-4` → `margin: 1rem`（1rem = 16px，Tailwind 默认 4 = 1rem）
- `mt-4` → margin-top
- `mb-4` → margin-bottom
- `ml-4` → margin-left
- `mr-4` → margin-right
- `mx-4` → margin-left + margin-right
- `my-4` → margin-top + margin-bottom
- `p-4` → padding，同理 `pt` `pb` `px` `py`

默认间距单位：
- `0` → 0px
- `1` → 0.25rem (4px)
- `2` → 0.5rem (8px)
- `4` → 1rem (16px)
- `8` → 2rem (32px)
- 以此类推

### 宽度高度
- `w-4` → width: 1rem
- `w-full` → width: 100%
- `w-screen` → width: 100vw
- `w-auto` → width: auto
- `max-w-md` → max-width: 28rem
- `h-16` → height: 4rem
- `h-full` → height: 100%
- `h-screen` → height: 100vh

### 颜色
背景色：`bg-red-500`，文字颜色：`text-red-500`，边框颜色：`border-red-500`

Tailwind 颜色是 50 到 900，数字越小越浅，越大越深：
- `bg-red-50` → 最浅
- `bg-red-500` → 中等红色（默认红）
- `bg-red-900` → 最深红色

常用颜色：`slate` `gray` `zinc` `red` `orange` `amber` `yellow` `lime` `green` `emerald` `teal` `cyan` `sky` `blue` `indigo` `violet` `purple` `fuchsia` `pink` `rose`

### 文字
- `text-sm` → 小号字体
- `text-base` → 基础字号（16px）
- `text-lg` → 大一点
- `text-xl` → 更大
- `text-2xl` → 2xl，以此类推
- `font-light` → 字重轻
- `font-normal` → 正常
- `font-medium` → 中等加粗
- `font-bold` → 粗体
- `text-center` → 居中
- `text-left` → 居左
- `text-right` → 居右
- `text-ellipsis` → 超出省略号
- `break-words` → 换行

### Flex 布局
- `flex` → `display: flex`
- `flex-row` → 水平方向
- `flex-col` → 垂直方向
- `justify-start` `justify-center` `justify-between` `justify-end` → 主轴对齐
- `items-start` `items-center` `items-end` `items-stretch` → 交叉轴对齐
- `flex-1` → `flex: 1` 占剩余空间
- `flex-wrap` → 允许换行
- `gap-4` → 子元素间距 1rem（比写margin方便）

### Grid 布局
- `grid` → `display: grid`
- `grid-cols-3` → 三列
- `grid-cols-1 md:grid-cols-3` → 移动端 1 列，中等屏 3 列
- `gap-4` → 格子间距

### 边框圆角阴影
- `border` → `border: 1px solid`
- `border-2` → 2px 边框
- `rounded` → 圆角 0.25rem
- `rounded-md` → 圆角 0.375rem
- `rounded-lg` → 圆角 0.5rem
- `rounded-full` → 完全圆角（药丸圆形）
- `shadow-sm` `shadow` `shadow-md` `shadow-lg` `shadow-xl` → 阴影大小
- `shadow-none` → 无阴影

### 定位
- `static` `relative` `absolute` `fixed` `sticky` → 和 CSS 一样
- `top-0` `right-0` `bottom-0` `left-0` → 偏移

### 透明可见
- `opacity-50` → 透明度 50%
- `opacity-0` → 完全透明
- `hidden` → `display: none`
- `block` `inline-block` `inline` → display

### 交互
- `hover:bg-red-600` →  hover 背景变红
- `focus:outline-none` → focus 去掉默认轮廓
- `focus:ring-2` → focus 显示环
- `disabled:opacity-50` → 禁用时透明度降低
- `cursor-pointer` → 手型指针
- `transition-colors` → 颜色过渡动画
- `transition-all` → 所有属性过渡
- `duration-300` → 过渡 300ms

## 响应式

Tailwind 断点默认：
- `sm` : 640px
- `md` : 768px
- `lg` : 1024px
- `xl` : 1280px
- `2xl`: 1536px

用法：断点前缀就是 `断点:`，比如：
```html
<!-- 移动端一列，md 以上三列 -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- 文字移动端 base，md 以上 xl -->
<h1 class="text-base md:text-xl">标题</h1>
```
默认是从小屏到大屏，小屏规则生效，大屏覆盖小屏。

## @layer 自定义组件

重复用的组件可以用 `@layer components` 提取出来：

```css
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors;
  }
  .card {
    @apply bg-white rounded-lg shadow p-6;
  }
}
```
然后直接用：
```html
<button class="btn-primary">按钮</button>
```

`@layer` 告诉 Tailwind 这个自定义样式属于那一层，会帮你处理打包大小，没用的会 tree-shake 掉。

## 常用技巧

### 任意值
Tailwind 不支持的自定义值，用方括号语法：
```html
<!-- width: 314px -->
<div class="w-[314px]"></div>
<!-- margin-top: 13px -->
<div class="mt-[13px]"></div>
<!-- 自定义颜色 -->
<div class="bg-[#123456]"></div>
```
不用自己写 CSS，直接写任意值，非常方便。

### 暗黑模式
`tailwind.config.js` 开启：
```js
module.exports = {
  darkMode: 'class', // 或者 'media' 跟着系统
  // ...
}
```
用法：
```html
<html class="dark">
  <div class="bg-white dark:bg-black text-gray-900 dark:text-white">
    内容
  </div>
</html>
```

### 清除默认滚动条
```html
<div class="overflow-y-auto scrollbar-hide"></div>
```
Tailwind 自带 `scrollbar-hide` 工具类。

### 伪类
```html
<!-- 第一个子元素 -->
<div class="first:pt-0"></div>
<!-- 最后一个 -->
<div class="last:mb-0"></div>
<!-- 奇数行 -->
<tr class="odd:bg-gray-100"></tr>
<!-- 偶数行 -->
<tr class="even:bg-white"></tr>
```

## 优点缺点

### 优点
- 开发快，不用写 CSS，不用切文件，不用想类名
- CSS 体积可控，JIT 模式只打包你用的，最终很小
- 响应式太方便了，加个前缀就行
- 一致性好，间距、颜色、字体大小都有规范
- 可定制程度高，几乎 everything 都能改配置

### 缺点
- 学习成本，要记很多类名
- HTML 类名会很长，看起来丑（用编辑器插件提示就还好）
- 小项目反而更啰嗦，简单页面写原生 CSS 更快

## 开发技巧

- 用 VSCode 插件 `Tailwind CSS IntelliSense`，自动提示补全
- JIT 模式（Tailwind v3 默认就是）开发快，即时编译
- 重复的组件提取到 `@layer components`，不要重复写一堆类
- 配合 UI 框架用，比如 `shadcn/ui` 就是基于 Tailwind，拿来即用
- 真需要自定义 CSS 时候用 `[任意值]` 语法，实在不行再写自定义 CSS

## 现在推荐吗？
非常推荐，现在前端社区很火，Vue/React 项目用了开发速度提升很多，配合 shadcn/ui 组件库开发起飞。

---

## 相关笔记

- [[01-CSS基础]]
- [[02-CSS选择器]]
- [[03-盒模型与布局]]
- [[04-文字与排版]]
- ../工程化/[[01-ViteWebpack基础]]

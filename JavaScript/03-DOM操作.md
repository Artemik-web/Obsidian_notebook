# DOM 操作

DOM（Document Object Model）文档对象模型，把 HTML 文档解析成树状结构，JS 可以通过 DOM API 操作网页。

## 1. 获取元素

```javascript
// 根据 id 获取（返回单个元素）
let box = document.getElementById('box');

// 根据类名获取（返回 HTMLCollection 集合）
let items = document.getElementsByClassName('item');

// 根据标签名获取（返回集合）
let paras = document.getElementsByTagName('p');

// CSS 选择器选择第一个匹配的（推荐！）
let box = document.querySelector('#box');
let firstItem = document.querySelector('.item');
let firstP = document.querySelector('p');

// CSS 选择器选择所有匹配的，返回 NodeList（推荐！）
let allItems = document.querySelectorAll('.item');
```

**说明：**
- `querySelector` / `querySelectorAll` 支持所有 CSS 选择器，语法一致，好用！
- `querySelectorAll` 返回的是 `NodeList`，可以用 `forEach` 遍历

例子：
```javascript
// 获取所有 a 标签带类 link
let links = document.querySelectorAll('a.link');
links.forEach(function(link) {
  console.log(link);
});
```

## 2. 遍历查找元素

```javascript
let parent = document.getElementById('parent');

// 父元素找子元素（所有子节点）
parent.childNodes; // 所有节点（包括文本节点、注释）
parent.children;    // 只获取元素节点（常用）

parent.firstChild;  // 第一个节点（可能是文本）
parent.firstElementChild; // 第一个元素（常用）

parent.lastChild;
parent.lastElementChild;

// 兄弟节点
let node = document.getElementById('node');
node.nextSibling; // 下一个兄弟节点
node.nextElementSibling; // 下一个兄弟元素（常用）
node.previousSibling;
node.previousElementSibling;

// 找父节点
node.parentNode; // 父节点
node.parentElement; // 父元素（推荐）

// 找祖先元素（匹配选择器）
let closest = element.closest('.container'); // 向上找第一个匹配的祖先，包括自己
```

## 3. 创建添加删除元素

### 创建元素
```javascript
let div = document.createElement('div');
let p = document.createElement('p');
let text = document.createTextNode('我是文本');
```

### 添加元素
```javascript
// 父元素末尾添加
parent.appendChild(child);

// 插到某个元素前面
parent.insertBefore(newNode, beforeNode);

// 替换元素
parent.replaceChild(newNode, oldNode);

// 现代方法 insertAdjacentElement（推荐！）
// 位置: 'beforebegin' 'afterbegin' 'beforeend' 'afterend'
target.insertAdjacentElement('beforebegin', newElement);

// 图解位置：
// <!-- beforebegin -->
// <target>
//   <!-- afterbegin -->
//   content
//   <!-- beforeend -->
// </target>
// <!-- afterend -->
```

### 删除元素
```javascript
// 旧方法：父元素删除
parent.removeChild(child);

// 新方法：自己删自己（推荐！）
element.remove();
```

### 克隆元素
```javascript
let clone = element.cloneNode(false); // false 只克隆节点，不克隆后代
let clone = element.cloneNode(true);  // true 深度克隆，克隆所有后代
```

## 4. 属性操作

### 原生属性操作
```javascript
// 获取属性
element.id;
element.className;
element.src;
element.href;
// ... 所有标准属性都可以直接点访问

// 修改属性
element.id = 'new-id';
element.className = 'container';

// 布尔属性
input.disabled = true; // 禁用
input.disabled = false; // 启用
```

### 自定义属性操作（标准方法）
```javascript
// get set remove
element.getAttribute('data-id');
element.setAttribute('data-id', '123');
element.removeAttribute('data-id');
element.hasAttribute('data-id'); // 返回 true/false
```

### dataset 操作（data-* 属性）
```javascript
// HTML: <div data-id="123" data-user-name="zhangsan">
console.log(element.dataset.id); // "123"
console.log(element.dataset.userName); // "zhangsan" → 驼峰
element.dataset.gender = 'male'; // 添加/修改
```

非常方便，开发中常用在标签存数据。

## 5. 样式操作

### 行内样式
```javascript
// 设置行内样式
element.style.backgroundColor = 'red';
element.style.fontSize = '16px';
element.style.marginTop = '10px';
// 注意：CSS 横杠变驼峰：background-color → backgroundColor

// 获取行内样式
console.log(element.style.backgroundColor);

// 批量设置
element.style.cssText = 'background: red; font-size: 16px; margin: 10px;';
```

### 获取计算后样式

```javascript
// 获取最终生效的样式（包括 CSS 中的）
let style = getComputedStyle(element);
console.log(style.backgroundColor);
console.log(parseInt(style.width)); // 转数字
```

只读，不能用来改样式。

### 操作类名（推荐！改样式优先改类名）

```javascript
// 添加类
element.classList.add('active');
element.classList.add('a', 'b', 'c'); // 加多个

// 删除类
element.classList.remove('active');

// 切换类（有就删，没有就加）
element.classList.toggle('show');

// 检查有没有类
element.classList.contains('active'); // 返回 true/false

// 替换类：old → new
element.classList.replace('old', 'new');
```

比直接改 `element.className` 方便多了！

## 6. 内容操作

```javascript
// 获取/设置 HTML 内容（会解析 HTML）
element.innerHTML;
element.innerHTML = '<p>我是HTML</p>';

// 获取/设置文本内容（纯文本）
element.textContent;
element.textContent = '纯文本';
// innerText 也可以，textContent 是标准，推荐

// 表单元素值
input.value; // 获取
input.value = '新值'; // 设置

// checkbox 选中
checkbox.checked; // true/false
checkbox.checked = true; // 选中

// select 选中值
select.value;
```

## 7. DOM 事件

### 绑定事件

```javascript
// 方法一：onxxx（缺点：只能绑一个）
button.onclick = function() {
  console.log('点击了');
};
// 解绑
button.onclick = null;

// 方法二：addEventListener 推荐！可以绑多个
button.addEventListener('click', function(e) {
  console.log('点击了');
});

// 解绑需要函数是同一个引用
function handler() {
  console.log('click');
}
button.addEventListener('click', handler);
button.removeEventListener('click', handler);
```

### 事件对象 e

```javascript
button.addEventListener('click', function(e) {
  // e 就是事件对象，包含事件信息
  e.target;      // 触发事件的元素（实际点击的）
  e.currentTarget; // 绑定事件的元素（this 一般就是它）
  e.preventDefault(); // 阻止默认行为（比如 a 跳转，form 提交）
  e.stopPropagation(); // 阻止冒泡
  // 鼠标位置
  e.clientX; // 视口
  e.pageX;   // 页面
});
```

### 事件冒泡

事件会从触发元素向上冒泡到父元素。

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    <button onclick="console.log('button')">点击</button>
  </p>
</div>
```

点击按钮 → 先 button → 再 p → 再 div → 一直到 document。

利用冒泡：**事件委托**，把子元素事件委托给父元素处理。

### 事件委托

给父元素绑定一次事件，就能处理所有子元素事件：

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

不用每个 li 绑，委托给 ul：

```javascript
document.getElementById('list').addEventListener('click', function(e) {
  // 判断点击的是不是 li
  if (e.target.matches('li')) {
    console.log('点击了li', e.target.textContent);
  }
});
```

优点：
- 新添加的子元素不用重新绑事件，自动生效
- 减少事件绑定数量，性能更好

## 8. 常见事件

### 鼠标事件
```
click → 点击
dblclick → 双击
mousedown → 按下
mouseup → 抬起
mousemove → 移动
mouseover → 进入（会冒泡）
mouseout → 离开（会冒泡）
mouseenter → 进入（不冒泡）
mouseleave → 离开（不冒泡）
contextmenu → 右键菜单
wheel → 滚轮
```

### 键盘事件
```
keydown → 按下
keyup → 抬起
keypress → 按下字符（已废弃，用 keydown）
```

获取键：
```javascript
input.addEventListener('keydown', function(e) {
  console.log(e.key); // 键名 'Enter' 'ArrowUp' 'a'...
  console.log(e.keyCode); // 键码（已废弃，但兼容性好）
});
```

### 表单事件
```
submit → 表单提交
change → 表单元素改变（失去焦点后触发）
input → 输入时实时触发
focus → 获得焦点
blur → 失去焦点
reset → 表单重置
```

### 页面/窗口事件
```
load → 页面所有资源加载完
DOMContentLoaded → DOM 树加载完，不用等图片等资源
resize → 窗口大小改变
scroll → 滚动
beforeunload → 页面关闭前
```

## 9. 阻止默认行为和冒泡

```javascript
// 阻止 a 跳转
a.addEventListener('click', function(e) {
  e.preventDefault(); // 阻止默认跳转
  // 自己处理跳转逻辑
});

// 阻止冒泡
child.addEventListener('click', function(e) {
  e.stopPropagation(); // 不往上冒泡了
});
```

## 10.  offset client scroll 相关属性

这些都是只读，获取元素尺寸位置：

| 属性 | 说明 |
|------|------|
| `element.offsetLeft` / `offsetTop` | 相对于父元素偏移 |
| `element.offsetWidth` / `offsetHeight` | 元素占据大小，包括 border + padding + content，不包含 margin |
| `element.clientWidth` / `clientHeight` | 可视区域大小，包括 padding，不含 border margin |
| `element.scrollWidth` / `scrollHeight` | 整个内容大小，包括滚动看不见的部分 |
| `element.scrollLeft` / `scrollTop` | 滚动出去的距离，可写 |

**获取元素在页面的绝对偏移：**
```javascript
function getOffset(el) {
  let left = 0;
  let top = 0;
  while (el) {
    left += el.offsetLeft;
    top += el.offsetTop;
    el = el.offsetParent;
  }
  return { left, top };
}
```

## 11. 懒加载原理

图片进入可视区域再加载：

```javascript
// HTML 先把真实地址放 data-src，src 放占位图
<img data-src="https://example.com/real.jpg" src="placeholder.jpg">

// 滚动的时候判断，进入可视区就替换 src
function lazyLoad() {
  let images = document.querySelectorAll('img[data-src]');
  let viewHeight = window.innerHeight;
  images.forEach(img => {
    let { top } = img.getBoundingClientRect();
    if (top < viewHeight) { // 进入可视区
      img.src = img.dataset.src;
      img.removeAttribute('data-src'); // 加载完删掉
    }
  });
}

// 初始加载 + 滚动触发
lazyLoad();
window.addEventListener('scroll', lazyLoad);
```

现在也可以用原生 `loading="lazy"`：
```html
<img src="..." loading="lazy">
```

## 12. 事件冒泡、捕获、委托总结

1. 事件流三个阶段：捕获 → 目标 → 冒泡
2. 绑定的时候第三个参数 `true` 就是捕获阶段触发，`false` 默认冒泡
3. 实际开发几乎只用冒泡，很少用捕获
4. 事件委托利用冒泡，把事件绑到父元素，处理子元素事件

## 最佳实践

- 获取元素用 `querySelector` / `querySelectorAll`
- 修改样式优先操作 `classList`，不是直接改 `style`
- 动态元素用事件委托
- 自定义数据放 `data-*` 属性，用 `dataset` 读
- 事件绑定用 `addEventListener`

---

## 相关笔记

- [[01-JavaScript基础]]
- [[02-对象与函数进阶]]
- [[04-异步与AJAX]]
- ../HTML/[[01-HTML基础]]

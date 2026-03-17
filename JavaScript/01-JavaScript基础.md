# JavaScript 基础

## 1. JavaScript 简介

JavaScript 是运行在浏览器上的脚本语言，让网页动起来，实现交互。

- JS = ECMAScript（语法标准） + DOM（文档对象模型） + BOM（浏览器对象模型）
- 现在也可以运行在服务器端（Node.js）

## 2. JS 引入方式

### 2.1 内部脚本

```html
<script>
  // 这里写 JS 代码
  console.log('Hello World');
</script>
```

### 2.2 外部脚本

```html
<script src="script.js"></script>
```

**特点：**
- `script` 标签写在 `</body>` 前，等 DOM 加载完再执行
- 如果放在 `head` 里，需要加 `DOMContentLoaded` 监听
- `defer` 属性：异步下载，DOM 加载完再执行
- `async` 属性：异步下载，下载完立即执行

```html
<script src="script.js" defer></script>
```

## 3. 输出方式

```javascript
// 控制台输出（开发调试最常用）
console.log('Hello');
console.warn('警告');
console.error('错误');
console.table([{a: 1, b: 2}, {a: 3, b: 4}]);

// 弹出框
alert('Hello'); // 弹提示
confirm('确定吗？'); // 确定取消，返回 true/false
prompt('请输入姓名：'); // 用户输入，返回输入的字符串

// 写入页面
document.write('<h1>Hello</h1>');

// 开发者工具打断点调试
debugger;
```

## 4. 变量

变量就是用来存东西的盒子。

### 4.1 声明变量

```javascript
// let （ES6 推荐）
let age = 18;
let name = '张三';
let isStudent = true;

// 可以先声明后赋值
let score;
score = 99;

// 同时声明多个
let a = 1, b = 2, c = 3;

// const 声明常量（不能修改）
const PI = 3.14159;
const URL = 'https://api.example.com';

// var （旧语法，不推荐现在用了）
var old = 10;
```

### 4.2 let vs const vs var

| | let | const | var |
|---|-----|-------|-----|
| 块级作用域 | ✅ | ✅ | ❌ |
| 变量提升 | ❌ | ❌ | ✅ |
| 能否修改 | 可以 | 不能（引用类型属性可以改） | 可以 |
| 推荐使用 | 变量用 | 常量用 | 不推荐 |

**最佳实践：** 默认用 `const`，需要改的时候用 `let`，不用 `var`。

## 5. 数据类型

JS 是**动态类型**语言，变量的类型跟着值走。

```javascript
let x = 10; // 现在是 number
x = 'hello'; // 现在变成 string，允许
```

### 5.1 基本数据类型（5种 + 1种 ES6）

1. **number** - 数字（整数、小数都是）
2. **string** - 字符串
3. **boolean** - 布尔 `true` `false`
4. **undefined** - 未定义（声明了没赋值）
5. **null** - 空值（表示空对象）
6. **symbol** - 唯一标识符（ES6）

### 5.2 引用数据类型

- **object** - 对象
- **array** - 数组（特殊对象）
- **function** - 函数（特殊对象）

### 5.3 typeof 运算符

检测类型：

```javascript
typeof 123;      // "number"
typeof 'abc';     // "string"
typeof true;      // "boolean"
typeof undefined; // "undefined"
typeof null;      // "object"（历史遗留bug，记住就好）
typeof NaN;       // "number"
typeof {};        // "object"
typeof [];        // "object"
typeof function(){}; // "function"
```

### 5.4 各类型详解

**number：**
```javascript
let age = 18;
let price = 9.9;
let infinity = Infinity; // 无穷大
let nan = NaN; // Not a Number，表示非数字

// 进制
let dec = 10;      // 十进制
let hex = 0xA;     // 十六进制 10
let bin = 0b1010;  // 二进制
let oct = 0o12;    // 八进制

// 浮点数精度问题
console.log(0.1 + 0.2); // 不是 0.3，是 0.30000000000000004
// 解决：比较的时候允许误差
console.log(Math.abs(0.1 + 0.2 - 0.3) < 1e-10); // true
```

**string：**
```javascript
// 引号（单双都可以，注意配对）
let str1 = "hello";
let str2 = 'world';

// 模板字符串（ES6 推荐，支持换行和插值）
let name = '张三';
let age = 18;
let msg = `我叫${name}，今年${age}岁`;
// 支持换行
let html = `
<div>
  <h1>${name}</h1>
</div>
`;

// 转义字符
let str = '他说："你好"';
let str2 = '换行\n第二行';
let path = 'C:\\Users\\name'; // 路径要转义反斜杠

// 字符串长度
console.log(str.length);

// 获取字符
console.log(str[0]); // 第一个字符
```

**boolean：**
```javascript
let isLogin = true;
let isEmpty = false;

// 哪些值转成 boolean 是 false？
// false, 0, '', NaN, null, undefined → 都是 false
// 其他都是 true
Boolean(''); // false
Boolean(0); // false
Boolean('hello'); // true
Boolean(123); // true
Boolean([]); // true 数组空也是 true！
Boolean({}); // true 对象空也是 true！
```

**undefined 和 null：**
```javascript
// undefined：声明了但没赋值
let x;
console.log(x); // undefined

// null：空对象，表示故意赋值为空
let obj = null;

// 区别：
// undefined 是系统给的默认空
// null 是程序员主动设置的空
```

## 6. 运算符

### 6.1 算术运算符

```javascript
+ - * / % ++ -- **
```

```javascript
1 + 2;    // 3
5 - 2;    // 3
2 * 3;    // 6
6 / 2;    // 3
7 % 3;    // 1 → 取余
2 ** 3;   // 8 → 2 的 3 次方（ES7）

// ++ --
let a = 1;
let b = a++; // b = 1, a = 2 → 先用后加
let c = ++a; // a = 3, c = 3 → 先加后用
```

### 6.2 字符串 + 数字

```javascript
// + 遇到字符串就是拼接
console.log('1' + 2); // "12"
console.log(1 + 2 + '3'); // "33" → 1+2=3，然后拼 "3" → "33"
console.log('1' + 2 + 3); // "123" → 从左到右一直拼
```

### 6.3 比较运算符

```javascript
> < >= <= == != === !==
```

```javascript
5 > 3; // true

// == 只比较值，会自动转换类型
// === 全等，既比较值也比较类型（推荐用全等！）
5 == '5';  // true
5 === '5'; // false
true == 1; // true
true === 1; // false
null == undefined; // true
null === undefined; // false

NaN 不等于任何东西，包括自己！
NaN === NaN; // false
// 判断 NaN：
Number.isNaN(NaN); // true
```

### 6.4 逻辑运算符

```javascript
&& 与（并且）
|| 或（或者）
!  非（取反）
```

```javascript
true && false; // false
true && true;  // true

true || false; // true
false || false; // false

!true; // false
!false; // true

// 短路求值
// && 第一个 false，就不再看后面了
// || 第一个 true，就不再看后面了
let a = 0;
1 && a; // a → 1真，所以结果是a
0 && a; // 0 → 0假，结果是0
1 || a; // 1真，结果是1，a不执行
0 || a; // 0假，结果是a
```

### 6.5 三元运算符

```javascript
条件 ? 结果1 : 结果2
```

```javascript
let age = 18;
let type = age >= 18 ? '成年人' : '未成年人';
console.log(type); // "成年人"
```

## 7. 流程控制

### 7.1 if 判断

```javascript
if (条件1) {
  // 条件1满足执行
} else if (条件2) {
  // 条件1不满足，条件2满足执行
} else {
  // 都不满足执行
}
```

例子：
```javascript
let score = 85;
if (score >= 90) {
  console.log('优秀');
} else if (score >= 80) {
  console.log('良好'); // 走到这里
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}
```

### 7.2 三元表达式

简单的二选一，用三元比 if 简洁：

```javascript
let max = a > b ? a : b;
```

### 7.3 switch 语句

全等匹配，适合固定值匹配：

```javascript
switch (fruit) {
  case 'apple':
    console.log('苹果');
    break; // 一定要 break，不然会继续往下走
  case 'banana':
    console.log('香蕉');
    break;
  default:
    console.log('其他水果');
}
```

### 7.4 循环

**for 循环** - 知道循环次数用：

```javascript
for (初始化; 条件; 变量更新) {
  // 循环体
}

// 例子：打印 1-10
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 遍历数组
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

**while 循环** - 不知道次数用：

```javascript
while (条件) {
  // 循环体
}

// 例子：猜数字游戏，直到猜对才结束
while (!isRight) {
  // 继续猜
}
```

**do while 循环** - 至少执行一次：

```javascript
do {
  // 循环体
} while (条件);
```

**循环控制：**
```javascript
break; // 跳出整个循环
continue; // 跳过本次，继续下一次
```

## 8. 数组

数组就是一组数据的有序集合。

### 8.1 创建数组

```javascript
// 字面量方式（推荐）
let arr = [1, 2, 3, 4, 5];
let names = ['张三', '李四', '王五'];
let mixed = [1, 'hello', true, null, {a: 1}]; // 可以放任意类型

// 构造函数方式
let arr2 = new Array(1, 2, 3);
let arr3 = new Array(5); // 创建长度为 5 的空数组
```

### 8.2 访问数组

```javascript
// 索引从 0 开始
console.log(arr[0]); // 第一个元素
arr[2] = 100; // 修改第三个元素

// 长度
console.log(arr.length);

// 遍历数组
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// forEach 遍历（ES5）
arr.forEach(function(item, index) {
  console.log(index, item);
});

// for...of 遍历（ES6，推荐）
for (let item of arr) {
  console.log(item);
}
```

### 8.3 数组增删改查

```javascript
let arr = [1, 2, 3];

// 尾部添加
arr.push(4); // arr → [1,2,3,4] 返回新长度

// 头部添加
arr.unshift(0); // → [0,1,2,3,4] 返回新长度

// 尾部删除
arr.pop(); // 删除最后一个，返回被删的 4

// 头部删除
arr.shift(); // 删除第一个，返回被删的 0

// splice 删除 / 插入 / 替换
arr.splice(startIndex, deleteCount);
// 例子：从索引 1 删除 2 个
let arr = ['a', 'b', 'c', 'd'];
arr.splice(1, 2); // → ['a', 'd']

// 插入：从索引 1，删 0 个，插入 x, y
arr.splice(1, 0, 'x', 'y');

// 替换：从索引 1，删 1 个，替换成新的
arr.splice(1, 1, 'new');
```

### 8.4 常用数组方法

```javascript
// 反转数组
arr.reverse();

// 排序
arr.sort(); // 默认按字符排序
arr.sort((a, b) => a - b); // 数字升序排列
arr.sort((a, b) => b - a); // 数字降序排列

// 拼接数组
let newArr = arr1.concat(arr2);

// 切片截取
let sub = arr.slice(start, end); // 包 start 不包 end，不修改原数组

// 查找索引
let index = arr.indexOf(item); // 找到返回索引，找不到返回 -1
arr.includes(item); // 返回 true/false 是否存在

// find 找第一个满足条件的
let result = arr.find(item => item.id === 1);

// filter 过滤，返回满足条件的新数组
let arr = [1, 2, 3, 4, 5];
let evens = arr.filter(x => x % 2 === 0); // [2, 4]

// map 映射，每个元素处理后返回新数组
let doubled = arr.map(x => x * 2); // [2, 4, 6, 8, 10]

// reduce 累加
let sum = arr.reduce((acc, curr) => acc + curr, 0);
// acc 累加器，curr 当前值，0 初始值

// join 转字符串
let str = arr.join('-'); // 1-2-3-4-5

// some 是否至少有一个满足
arr.some(x => x > 0); // true

// every 是否所有都满足
arr.every(x => x > 0);
```

## 9. 函数

函数就是封装一段可重复执行的代码。

### 9.1 声明函数

```javascript
// 函数声明（有提升）
function add(a, b) {
  return a + b;
}

// 函数表达式（匿名函数，赋值给变量，没有提升）
const add = function(a, b) {
  return a + b;
};

// 箭头函数（ES6 推荐，简洁，this 继承外层）
const add = (a, b) => {
  return a + b;
};
// 只有一句话可以省略大括号和 return
const add = (a, b) => a + b;
// 只有一个参数可以省略括号
const double = n => n * 2;
```

### 9.2 形参实参

```javascript
// a, b 是形参（形式上的参数，定义的时候占位置）
function add(a, b) {
  return a + b;
}

// 1, 2 是实参（实际传进去的值）
let result = add(1, 2);
console.log(result); // 3
```

- JS 不检查参数个数：
```javascript
function add(a, b) {
  return a + b;
}
add(1); // 1 + undefined = NaN
add(1, 2, 3); // 只加前两个，第三个忽略
```

- 可以给形参默认值（ES6）：
```javascript
function greet(name = '访客') {
  console.log(`你好，${name}`);
}
greet(); // "你好，访客"
```

### 9.3 return

- return 就是把结果返回出去
- 函数执行遇到 return 就结束了
- 没有 return 函数返回 `undefined`

```javascript
function add(a, b) {
  return a + b; // 返回结果，函数结束
  console.log('这句不会执行');
}
```

### 9.4 arguments 伪数组

所有函数都有 `arguments`，存了所有传进来的实参：

```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4)); // 10
```

现在用剩余参数更优雅：
```javascript
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
```

### 9.5 立即执行函数 IIFE

```javascript
(function() {
  // 执行完就没了，独立作用域，不会污染全局
})();

// 现在用 IIFE 少了，用模块就好了
```

### 9.6 函数表达式 vs 函数声明

- 函数声明：`function name() {}` 会提升，可以在声明前调用
- 函数表达式：`const fn = function() {}` 不会提升，必须定义完才能调用

## 10. 作用域

- **全局作用域**：整个页面都能访问
- **函数作用域**：函数内部，外面不能访问
- **块级作用域**（ES6）：`{}` 里面 `let` `const` 声明的，外面不能访问 → if for 都是块级

```javascript
// 全局变量，哪里都能访问
let global = '我是全局';

function test() {
  // 局部变量，只能函数内部用
  let local = '我是局部';
  console.log(global); // 能访问全局
}
console.log(local); // 报错，访问不到

// 块级作用域
if (true) {
  let x = 10;
  const y = 20;
  var z = 30;
}
console.log(z); // 30 → var 没有块级，能出来
console.log(x); // 报错 → let 有块级，访问不到
```

### 作用域链

内层函数可以访问外层变量，一层一层往外找，这就是作用域链。

```javascript
let a = 1;
function outer() {
  let b = 2;
  function inner() {
    let c = 3;
    console.log(a); // 1 → 找得到外层a
    console.log(b); // 2 → 找得到outer的b
    console.log(c); // 3
  }
  inner();
}
outer();
```

### 预解析（变量提升）

JS 执行前先预解析，把 `var` 声明和 `function` 声明提升到当前作用域最前面，赋值留在原地。

```javascript
console.log(a); // undefined，不是报错
var a = 10;
// 预解析后相当于：
// var a;
// console.log(a);
// a = 10;

// 函数声明也会提升
foo(); // 能调用，因为提升了
function foo() {
  console.log('hello');
}
```

`let` `const` 不会提升，所以声明前用会报错（暂时性死区），这其实更合理。

## 11. 总结

核心要点：
1. 变量声明：`const` 优先，需要修改用 `let`，不用 `var`
2. 数据类型：基本类型存值，引用类型存地址
3. 比较的时候用 `===` 不要用 `==`
4. 函数：封装复用，箭头函数简洁
5. 作用域：`let` `const` 有块级作用域，更安全

下一步继续看：对象 → DOM → BOM → 事件 → ES6+...

---

## 相关笔记

- [[02-对象与函数进阶]]
- [[03-DOM操作]]
- [[04-异步与AJAX]]

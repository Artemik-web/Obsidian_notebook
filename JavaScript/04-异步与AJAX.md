# JavaScript 异步与 AJAX

## 1. JS 是单线程

JavaScript 语言设计上就是**单线程**，同一时间只能做一件事。

为什么？因为设计给浏览器做交互，要是多线程，同时改 DOM 就乱了。

## 2. 同步异步

### 同步
- 代码一步步执行，前面不执行完，后面等着
- 阻塞执行

### 异步
- 不等待异步任务完成，先执行后面，任务完成了再回调
- 不阻塞

例子：
```javascript
console.log(1);
setTimeout(() => {
  console.log(2); // 异步，放到任务队列等主线程空了才执行
}, 0);
console.log(3);
// 输出：1 3 2
```

## 3. 事件循环（Event Loop）

执行顺序：
1. 同步代码直接执行，进调用栈
2. 异步任务放到任务队列，等待
3. 调用栈空了，事件循环从任务队列拿过来执行
4. 一直循环 → 所以叫事件循环

任务分类：
- **宏任务（macrotask）**：`setTimeout` `setInterval` `setImmediate` `I/O` `DOM事件` `requestAnimationFrame`
- **微任务（microtask）**：`Promise.then/catch/finally` `async/await` `process.nextTick` `MutationObserver`

执行顺序：
1. 执行所有同步代码，直到调用栈空
2. 执行所有**微任务**
3. 执行一个宏任务
4. 再执行所有当前产生的微任务
5. 重复...

题目练习：
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
});

console.log('5');

// 输出顺序：
// 1 → 5 → 4 → 2 → 3
```

解释：
- 先打 1，同步
- setTimeout 是宏任务，等
- Promise.then 微任务，等
- 打 5，同步完了
- 执行微任务 → 打 4
- 执行宏任务 setTimeout → 打 2，然后 then 是微任务 → 打 3
- 结束

## 4. Promise 异步处理

Promise 解决回调地狱问题。

### 基本用法

```javascript
// 创建 Promise
let p = new Promise(function(resolve, reject) {
  // 异步操作
  setTimeout(() => {
    if (成功) {
      resolve(data); // 成功了，把数据传出去
    } else {
      reject(error); // 失败了，把错误传出去
    }
  }, 1000);
});

// 使用
p.then(data => {
  // 成功拿到数据
  console.log(data);
}).catch(error => {
  // 出错了
  console.error(error);
}).finally(() => {
  // 不管成功失败都执行
  console.log('完成');
});
```

### 链式调用

```javascript
// then 返回新的 Promise，可以一直 then
fetchData()
  .then(res => res.json()) // 处理完返回
  .then(json => {
    // 处理下一个
    return getDetail(json.id);
  })
  .then(detail => {
    console.log(detail);
  })
  .catch(err => {
    // 任何一步错，都走到这，统一处理
    console.error(err);
  });
```

比多层嵌套回调（回调地狱）清晰太多。

### Promise 静态方法

```javascript
// 全部成功才成功，一个失败就失败
Promise.all([p1, p2, p3]).then(results => {
  // results 是所有结果数组
});

// 第一个完成就返回，不管成败
Promise.race([p1, p2, p3]).then(result => {
  // 第一个完成的结果
});

// 全部都完成，不管成败，返回每个结果
Promise.allSettled([p1, p2]).then(results => {
  // results 每个有 status
});

// 立刻返回一个成功的 Promise
Promise.resolve(value);

// 立刻返回一个失败的 Promise
Promise.reject(error);
```

## 5. async / await（ES2017 推荐！）

基于 Promise 的语法糖，写异步像同步一样。

```javascript
// 声明函数加 async，函数里可以用 await
async function getData() {
  try {
    // await 后面跟 Promise
    let response = await fetch('/api/data');
    let data = await response.json();
    console.log(data);
    return data; // 返回值就是 Promise.resolve(data)
  } catch (err) {
    console.error(err); // catch 错误
    throw err;
  }
}

// 使用
getData().then(data => {
  console.log(data);
});

// 或者在另一个 async 里
let data = await getData();
```

**对比 Promise then 链式：**
- async/await 更简洁，流程看起来像同步，好理解
- Promise 适合链式处理多个异步

## 6. AJAX 请求

AJAX = Asynchronous JavaScript And XML，异步请求，不刷新页面拿到数据。

现在常用 JSON 代替 XML。

### 原生 XMLHttpRequest 写法（老写法）

```javascript
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      console.error('请求失败');
    }
  }
};
xhr.send();
```

### 现代 fetch API（推荐原生）

```javascript
// GET 请求
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json(); // 解析 JSON
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// POST JSON
fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: '张三',
    age: 18
  })
}).then(res => res.json())
  .then(data => console.log(data));

// async/await 写法
async function getData() {
  try {
    let response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error(response.statusText);
    let data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
```

fetch 优点：
- 原生浏览器支持，不用引入库
- 基于 Promise，配合 async/await 非常干净

缺点：
- 只有网络错误才会 reject，HTTP 错误（404、500）也算成功，要自己判断 `response.ok`
- 不支持超时（可以自己包装）

### 第三方库 axios（项目常用）

```javascript
import axios from 'axios';

// GET
axios.get('/api/data', { params: { id: 1 } })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });

// POST
axios.post('/api/user', { name: '张三', age: 18 })
  .then(res => console.log(res.data));

// async/await
async function getData() {
  try {
    let res = await axios.get('/api/data');
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
```

优点：
- 自动转换 JSON
- 错误处理方便，4xx 5xx 都会进 catch
- 支持拦截请求响应，取消请求等

项目开发一般用 axios。详细教程请看：[[05-Axios接口对接]]

## 7. JSON 处理

JSON 是前后端交换数据的格式。

```javascript
// JS 对象转 JSON 字符串
let json = JSON.stringify(obj);

// JSON 字符串转 JS 对象
let obj = JSON.parse(json);

// 注意：JSON 里不能放函数、undefined，只有对象数组字符串数字布尔null
```

## 8. 同源策略与跨域

### 同源策略
浏览器安全策略，只有**同源**（协议 + 域名 + 端口都相同）才能互相访问。

如果不同源，AJAX 默认不能请求。

### 解决跨域方案

1. **CORS（跨域资源共享）** → 推荐
   - 后端设置响应头 `Access-Control-Allow-Origin`
   - 浏览器自动处理，前端不用做什么

2. **JSONP**
   - 利用 script 标签不受同源限制，前端传一个 callback 参数给后端，后端返回回调调用
   - 只能 GET，不推荐了
   ```html
   <script src="http://example.com/api?callback=handleData"></script>
   <script>
     function handleData(data) {
       console.log(data);
     }
   </script>
   ```

3. **代理**
   - 开发环境：webpack-dev-server / vite 配置代理
   - 生产环境：Nginx 反向代理
   - 前端开发常用，解决开发跨域

## 9. 防抖节流

高频触发事件（scroll、resize、input 输入），控制执行次数，优化性能。

### 防抖 debounce
- 等停止触发 n 秒后才执行一次
- 比如搜索框输入，停止输入再发请求

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用
let search = debounce(function(value) {
  // 发请求搜索
  console.log('搜索', value);
}, 300);

input.addEventListener('input', e => {
  search(e.target.value);
});
```

### 节流 throttle
- 指定时间间隔内只执行一次
- 比如 scroll 事件，每 100ms 执行一次，不会一直触发

```javascript
function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    let now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// 使用
window.addEventListener('resize', throttle(() => {
  console.log('窗口大小改变', window.innerWidth);
}, 100));
```

**区别：**
- 防抖：你一直触发，我不执行，停下来才执行一次
- 节流：你一直触发，我每隔一段时间执行一次

## 10. localStorage / sessionStorage

本地存储，存数据到浏览器：

```javascript
// localStorage 持久存储，关闭浏览器还在
localStorage.setItem('key', 'value');
localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear(); // 清空全部

// sessionStorage 页面会话，关闭标签页就没了
sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key');
sessionStorage.removeItem('key');

// 存对象要转 JSON
localStorage.setItem('user', JSON.stringify({name: '张三', age: 18}));
let user = JSON.parse(localStorage.getItem('user'));
```

区别：
| | localStorage | sessionStorage | cookie |
|---|--------------|----------------|--------|
| 存储大小 | ~5MB | ~5MB | ~4KB |
| 过期时间 | 永不过期（除非手动删 | 页面关闭就没 | 可以设置过期 |
| 发送到服务器 | 不会自动发 | 不会自动发 | 每次请求都会带在 Cookie |

## 总结

核心要点：
1. JS 单线程，事件循环，先同步后异步，先微任务后宏任务
2. Promise 解决回调地狱，async/await 让异步代码更简洁
3. AJAX 请求，原生用 fetch，项目常用 axios
4. 跨域主要方案 CORS（后端处理）
5. 防抖节流优化高频事件
6. 本地存储用 localStorage/sessionStorage

下一步：可以看 ES6+ 新特性，框架使用了。

---

## 相关笔记

- [[01-JavaScript基础]]
- [[02-对象与函数进阶]]
- [[03-DOM操作]]
- ../HTTP/[[01-HTTP基础]]
- ../安全/[[01-Web安全基础]]

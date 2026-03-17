# Node.js 基础

## Node 是什么
- 基于 Chrome V8 引擎的 JavaScript 运行环境
- 让 JS 可以运行在服务器端，不是语言，是运行环境
- 特点：单线程、非阻塞IO、事件驱动，适合高并发IO密集型场景

## 核心模块

### fs 文件模块
读写文件：

```javascript
const fs = require('fs');
const path = require('path');

// 异步读取
fs.readFile(path.join(__dirname, 'file.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 同步读取
const data = fs.readFileSync(path.join(__dirname, 'file.txt'), 'utf8');
console.log(data);

// 写入文件
fs.writeFile('output.txt', '内容', err => {
  if (err) throw err;
});

// 判断文件是否存在
fs.existsSync('file.txt');
```

### path 路径模块
处理路径：
```javascript
path.join(__dirname, 'file.txt'); // 拼接路径
path.resolve('file.txt'); // 转绝对路径
path.extname('index.js'); // 获取后缀 .js
path.basename('/a/b/c.js'); // c.js
path.dirname('/a/b/c.js'); // /a/b
```

### http 模块
创建 Web 服务器：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // req 请求对象，res 响应对象
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('Hello Node!');
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

处理路由：
```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end('首页');
  } else if (req.url === '/api/user' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ name: 'zhangsan' }));
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});
```

### events 事件模块
Node 本身就是事件驱动，所有异步操作都发事件：

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 监听事件
emitter.on('login', data => {
  console.log('登录了', data);
});

// 触发事件
emitter.emit('login', { name: 'zhangsan' });

// 只监听一次
emitter.once('some', () => {});
```

### CommonJS 模块化
Node 默认用 CommonJS 模块：

```javascript
// 导出 module.exports
module.exports = {
  add: (a, b) => a + b,
  name: 'zhangsan',
};

// 或者
exports.add = (a, b) => a + b;

// 导入 require
const utils = require('./utils.js');
console.log(utils.add(1, 2));
```

特点：
- 加载是同步的
- 每个模块都是作用域隔离的
- 缓存，第一次加载后缓存，第二次直接用缓存

## npm 包管理

### 常用命令
```bash
npm init # 初始化 package.json
npm install # 安装所有依赖
npm i package-name # 安装生产依赖
npm i -D package-name # 安装开发依赖
npm uninstall package-name # 卸载
npm update # 更新
npm list # 查看已安装
npm root -g # 查看全局安装路径
```

### package.json 主要字段
- `name`：包名
- `version`：版本号，语义化版本 `大版本.小版本.修复`
- `main`：入口文件
- `dependencies`：生产依赖
- `devDependencies`：开发依赖
- `scripts`：脚本命令

### 语义化版本
- `^1.2.3`：允许更新 1.x.x，不更新到 2.0.0
- `~1.2.3`：只允许更新 1.2.x，不更新到 1.3.0
- `1.2.3`：固定版本，只装这个版本

### npx
直接运行本地安装的包，不用全局装：
```bash
npx create-react-app my-app
```

## 异步编程对比

Node 早期回调，现在推荐 Promise/async-await：

```javascript
// 回调地狱
fs.readFile('a.txt', 'utf8', (err, a) => {
  fs.readFile('b.txt', 'utf8', (err, b) => {
    fs.readFile('c.txt', 'utf8', (err, c) => {
      // 嵌套越来越深，难维护
    });
  });
});

// Promise 链式
const fs = require('fs/promises');
fs.readFile('a.txt', 'utf8')
  .then(a => fs.readFile('b.txt', 'utf8'))
  .then(b => fs.readFile('c.txt', 'utf8'))
  .then(c => {})
  .catch(err => {});

// async/await 最好
async function read() {
  try {
    const a = await fs.readFile('a.txt', 'utf8');
    const b = await fs.readFile('b.txt', 'utf8');
    const c = await fs.readFile('c.txt', 'utf8');
    return [a, b, c];
  } catch (err) {
    console.error(err);
  }
}
```

## 模块加载机制

### 模块分类
- 核心模块：Node 自带，`fs`、`path`、`http`，直接名字加载
- 文件模块：自定义模块，按路径加载
- 第三方模块：`node_modules` 里面找，向上递归找

### 缓存
模块第一次加载后会缓存，下次加载直接取缓存，所以不会重复加载。

## 常见面试题

### Node 单线程为什么能处理高并发？
- JS 执行是单线程，Node 本身是多线程的，IO 操作（文件读写、网络请求）内核线程处理，JS 只负责回调
- 非阻塞 IO，不用等 IO 完成，继续处理下一个请求，IO 完了回调
- 适合 IO 密集型，不适合 CPU 密集型（因为单线程，CPU 计算会阻塞）

### 什么是事件循环 Node 版
Node 事件循环和浏览器不一样：
1. 执行同步任务
2. 处理所有微任务（nextTick, Promise）
3. 每个宏任务阶段执行：timers → I/O callbacks → idle/prepare → poll → check → close callbacks
4. 执行完一个阶段所有任务，再走下一个阶段

`process.nextTick` 比 `Promise` 优先级更高，在下一个事件循环之前立即执行。

### 集群 cluster
Node 单线程只能用一个 CPU，多核服务器可以开多个进程：
```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // 衍生工作进程
  }
} else {
  // 工作进程监听端口
  http.createServer(...).listen(3000);
}
```

现在 PM2 帮你做了，不用自己写。

## Express 简单示例
Express 是 Node 最常用 Web 框架：

```bash
npm install express
```

```javascript
const express = require('express');
const app = express();
const port = 3000;

// 解析 json
app.use(express.json());

// 静态文件
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/user/:id', (req, res) => {
  res.json({ id: req.params.id });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ username });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
```

## Koa 简单示例
Koa 是 Express 团队做的下一代，更轻量，支持 async/await：

```bash
npm install koa koa-router
```

```javascript
const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'Hello Koa';
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

## 总结
Node 让 JS 可以运行在后端，现在全栈开发常用：
- 核心模块：fs/path/http/events
- CommonJS 模块化
- npm 包管理
- 异步编程：从回调到 Promise/async-await
- Web 框架：Express / Koa

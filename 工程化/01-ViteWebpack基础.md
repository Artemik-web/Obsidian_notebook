# Vite vs Webpack 基础

## 什么是构建工具

把开发写的源代码转换成浏览器能跑的代码：

- 代码转换（TypeScript → JavaScript，SCSS → CSS）
- 文件合并打包
- 代码压缩
- 代码分割
- 开发服务器，热更新
- 编译区分开发环境生产环境

## Vite

### 特点

- 基于 ESBuild 预构建，快很多
- 原生 ESM 开发，不用打包就能跑，冷启动快
- 按需编译，你打开页面才编译
- 热更新快，改了只更新改的模块

### 基本使用

```bash
# 创建项目
npm create vite@latest my-project -- --template vue
# 或者
npm create vite@latest my-project -- --template react

cd my-project
npm install
npm run dev # 开发服务器
npm run build # 生产打包
```

### 配置 `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
```

### 环境变量

```
# .env.development
VITE_APP_TITLE=开发环境
VITE_APP_API=http://dev-api.example.com

# .env.production
VITE_APP_TITLE=生产环境
VITE_APP_API=https://api.example.com
```

代码中使用：
```javascript
console.log(import.meta.env.VITE_APP_API);
```

必须以 `VITE_` 开头，才能被识别。

## Webpack

### 核心概念

- **entry** 入口：从哪个文件开始打包
- **output** 输出：打包完放哪，叫什么名字
- **loader** 加载器：webpack 只能处理 JS，其他文件要 loader 转换
- **plugins** 插件：做更多事情，打包优化，压缩，注入变量
- **mode** 模式：development / production

### 基本配置 `webpack.config.js`

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js', // contenthash 文件名加hash，缓存
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};
```

## loader vs plugin 区别

- **loader** - 文件转换，把不同文件转换成 webpack 能处理的模块，比如 `babel-loader` 转 ES6+ → ES5，`css-loader` 处理 CSS
- **plugin** - 插件扩展功能，在打包生命周期插入点做事情，比如 `HtmlWebpackPlugin` 生成 HTML 文件，`CleanWebpackPlugin` 清空 dist 目录

## 常见概念

### 文件哈希

- `[contenthash]` - 根据文件内容生成 hash，内容变 hash 变，内容不变 hash 不变，方便缓存
- 浏览器缓存静态资源，内容变了 hash 变了才会请求新的，不变一直用缓存

### 代码分割

- 入口分割：多个入口文件分开打包
- 路由懒加载：路由组件按需加载，首屏更快
- 第三方库分割：把 react/vue 这些第三方分开打包，利用浏览器缓存

### Tree Shaking

- 摇掉没用的代码，只打包用到的代码
- 依赖 ES module 静态分析，开发生产都开
- 没用的代码不会打包进去，体积更小

### Hot Module Replacement 热更新

- 修改模块代码，不用刷新整个页面，只替换这个模块，保存状态，开发更快
- Vite 默认开，webpack 配置开了就行

## 开发环境 vs 生产环境

|  | 开发环境 | 生产环境 |
|------|----------|----------|
| 调试 | 需要SourceMap，方便调试 | 压缩代码，去掉调试信息 |
| 热更新 | 需要 | 不需要 |
| 代码压缩 | 不压缩 | 压缩 |
| 打包体积 | 不关心体积 | 尽量小 |

## 总结

现在开发推荐 **Vite**，更快更好用，配置简单。Webpack 现在老项目用的多，新项目基本 Vite 就好了。

### Vite 优点

- 冷启动快，不用打包整个项目就能跑
- 热更新快，改完马上看效果
- 配置简单
- 天生支持 TypeScript

### 什么时候用 Webpack

- 老项目维护
- 非常复杂需要定制配置
- 生态更成熟，有些 loader plugin Vite 还没有

---

## 相关笔记

- ../Vue/[[08-Vue性能优化]]
- ../项目相关文档/[[规划进度]]

# 前端技术知识笔记

> 分类整理的完整前端技术学习笔记，Obsidian 维护，带双向链接知识图谱 + Canvas 脑图。
>
> 🤖 **已升级为 LLM 知识库系统** - 支持智能问答、自动索引、健康检查等功能

---

## 🤖 LLM 知识库系统

本知识库已按照 [LLM Knowledge Bases](https://news.ycombinator.com/item?id=40840111) 方法升级，具有以下特性：

- **自动索引**：扫描知识库并构建搜索索引
- **智能搜索**：快速查找相关文档
- **问答系统**：基于知识库内容回答问题
- **健康检查**：自动检测断裂链接和问题
- **摘要生成**：自动生成文档和主题摘要
- **增量更新**：LLM 维护知识，无需手动编辑

### 快速开始

```bash
# 查看知识库健康状态
node tools/health-check.js

# 搜索内容
node tools/search.js "Vue3 响应式"

# 问答系统
node tools/qa-system.js "什么是 React Hooks？"

# 生成主题摘要
node tools/summary-generator.js --topic Vue

# 更新索引（添加新笔记后）
node tools/indexer.js
```

详细指南请查看：[[quick-start]]

---

## 📚 知识库结构

按大类分文件夹，每个知识点一篇笔记：

### 基础前端
- **HTML** → 基础语法、元素属性、语义化、表格表单
- **CSS** → 基础、选择器、盒模型布局、文字排版、Tailwind
- **JavaScript** → 基础语法、对象函数进阶、DOM操作、异步 AJAX
- **TypeScript** → 基础、接口类型、泛型、高级类型、实际场景用法

### 框架
- **Vue** → Vue3 基础、响应式、组件API、路由 Pinia、自定义指令、动画、性能优化、常用 Hooks、交互动画
- **React** → 基础、Hooks、组件通信、路由状态管理、性能优化

### 计算机基础 & 网络
- **HTTP** → HTTP 基础、缓存、跨域、HTTPS
- **浏览器** → 浏览器原理、渲染流程、事件循环
- **安全** → Web 安全基础（XSS、CSRF、SQL注入）

### 进阶
- **算法** → 常见算法题、数据结构、手写题
- **设计模式** → 前端常用设计模式
- **移动端** → 移动端适配方案
- **微前端** → 微前端基础概念、qiankun 方案

### 工程化 & 部署
- **工程化** → Vite vs Webpack 基础
- **Git** → 常用命令、协作流程
- **Node.js** → 后端基础、常用 API
- **Docker** → Docker 基础、常用命令
- **Linux** → 服务器常用命令

### 项目
- **项目相关文档** → 商业项目开发规划、进度管理

## 📖 学习顺序建议

按这个顺序渐进学习，由浅入深：

```
HTML/CSS → JavaScript → TypeScript → 选择框架（Vue/React）→ HTTP → 浏览器 → 设计模式 → 算法 → 工程化 → 部署/Docker/Linux
```

### 阶段划分

**阶段一：基础** ✅
- 掌握 HTML 语义化
- 掌握 CSS 布局（Flex/Grid）
- 掌握 JavaScript 核心语法、异步、DOM
- 掌握 TypeScript 类型系统

**阶段二：框架** ✅
- 选择一个框架深入（Vue3 或 React）
- 掌握状态管理、路由
- 掌握性能优化技巧
- 掌握常用交互效果、自定义 Hooks

**阶段三：原理** ✅
- 理解 HTTP 缓存、跨域、HTTPS
- 理解浏览器渲染、事件循环
- 理解常见安全问题防御
- 理解设计模式思想

**阶段四：工程化 & 部署** ✅
- 理解构建工具（Vite/Webpack）
- 会使用 Git 协作
- 会用 Docker 部署
- 会用 Linux 服务器维护

## 🧭 Obsidian 功能使用

- **双向链接**：每篇笔记末尾只保留**真正相关**的链接，点击可以跳转，自动构建知识图谱
- **JSON Canvas**：`前端知识体系.canvas` 是整张知识脑图，可以拖拽导航
- **obsidian-skills**：可以用 ````skills ``` 块生成技能雷达图
- **所有笔记** 都是 Markdown 格式，纯文本，跨平台可用

### ⚙️ 推荐插件配置

#### Obsidian Git 插件（自动备份笔记到 Git）

安装后推荐配置：
```json
{
  "autoPullOnBoot": true,
  "disablePush": false,
  "pullOnSave": false,
  "pushOnSave": true,
  "commitMessage": "vault backup: {{date}}",
  "autoCommitMessage": "vault backup: {{date}}"
}
```
- 每次保存笔记自动 commit + push
- 启动自动 pull 最新变更
- 你的笔记会自动备份到 GitHub/GitLab，不怕丢

#### 粘贴图片自动保存到 assets

设置 → 启用 **"Auto link attachment"** 插件 或者用 Obsidian 自带设置：
- 设置 → 文件 & 链接 → 新 attachment 位置：`assets/`
- 设置 → 文件 & 链接 → 粘贴图片时自动保存到 attachment 文件夹
- 这样你截图粘贴进来，图片自动保存到 `assets/` 目录，路径正确

推荐设置：
```
Attachment location path: assets/{{filename}}/
```
图片按笔记文件名分类存放，干净整洁

## 🎯 特点

- ✅ 内容简洁，都是干货，适合快速复习
- ✅ 按学习顺序组织，新手可以顺着看
- ✅ 每个知识点都配代码示例，复制就能用
- ✅ Obsidian 双向链接关联，形成知识网络

---

*整体结构已经整理完成，所有双向链接都已经修正，只关联真正相关的文档。*

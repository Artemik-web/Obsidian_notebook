# 快速开始指南 - LLM 前端知识库

基于 LLM Knowledge Bases 方法构建的智能前端开发知识库。

## 🚀 快速启动

### 1. 查看当前状态

首先运行健康检查：

```bash
node tools/health-check.js
```

### 2. 搜索和查询

```bash
# 搜索内容
node tools/search.js "Vue3 响应式"

# 问答系统
node tools/qa-system.js "JavaScript 异步编程"
```

### 3. 生成摘要

```bash
# 生成 Vue 主题的摘要
node tools/summary-generator.js --topic Vue

# 生成整个知识库的摘要
node tools/summary-generator.js --all
```

### 4. 更新索引

当添加或修改笔记时，更新索引：

```bash
node tools/indexer.js
```

## 📁 目录结构

```
.
├── .llm-kb/              # LLM 知识库元数据
│   ├── index.json        # 知识库索引
│   ├── config.json       # 配置
│   └── README.md         # 说明文档
├── tools/                # 辅助工具
│   ├── indexer.js        # 索引生成器
│   ├── search.js         # 搜索工具
│   ├── health-check.js   # 健康检查
│   ├── qa-system.js      # 问答系统
│   └── summary-generator.js  # 摘要生成器
├── outputs/              # LLM 生成的输出
│   ├── answers/          # 问答结果
│   ├── summaries/        # 摘要
│   ├── slides/           # 幻灯片
│   └── visualizations/   # 可视化
└── 原有的笔记目录...      # 你的知识库内容
```

## 📚 知识库统计

- **文档总数**: 53 篇
- **总字数**: 285,568 字
- **主题分布**: HTML、CSS、JavaScript、TypeScript、Vue、React、算法等
- **平均文档长度**: 5,388 字

## 🔧 常用工具

### 搜索工具

```bash
node tools/search.js "搜索关键词"
# 例如搜索 JavaScript 相关文档
node tools/search.js "JavaScript 数组方法"
```

### 问答系统

```bash
node tools/qa-system.js "问题"
# 例如
node tools/qa-system.js "什么是 React Hooks？"
node tools/qa-system.js "Vue3 的响应式原理是什么？"
```

### 健康检查

```bash
node tools/health-check.js
```

## 💡 最佳实践

### 数据摄入流程

1. 将原始资料放入 `raw/` 目录
2. 运行索引器 `node tools/indexer.js`
3. 使用健康检查工具 `node tools/health-check.js`
4. 使用搜索和问答系统查询信息

### 维护建议

- 定期运行 `node tools/health-check.js` 检查健康状态
- 当添加新笔记时，运行 `node tools/indexer.js` 更新索引
- 定期查看搜索结果和问答，优化内容质量

### 使用 LLM 增强

可以使用 LLM 来：
- 生成文档摘要
- 创建问题解答
- 发现知识之间的关联
- 建议缺失的内容

## 🐛 常见问题

### 索引过时

```bash
node tools/indexer.js
```

### 链接断开

```bash
node tools/health-check.js
```

### 搜索结果不理想

1. 检查搜索关键词是否准确
2. 查看是否有相关文档缺失
3. 运行健康检查

---

## 相关资源

- [README.md](README.md) - 知识库完整介绍
- [.llm-kb/README.md](.llm-kb/README.md) - LLM 知识库系统说明
- [前端知识体系.canvas](前端知识体系.canvas) - 知识图谱

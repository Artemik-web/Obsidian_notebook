# Raw 资料使用指南

这是一个完整的使用示例，展示 LLM 知识库系统的工作流程。

## 📋 完整流程示例

### 1️⃣ 收集原始资料 → raw/

```bash
# 把文章、论文、网页截图等放入 raw/
raw/
├── articles/      # 文章和博客
├── papers/        # 技术论文
├── repos/         # 仓库文档
├── datasets/      # 数据集
└── images/        # 原始图片和截图
```

### 2️⃣ LLM 编译 → wiki/

LLM 会：
- 阅读 raw/ 中的原始资料
- 提取核心概念
- 整理成结构化的 Markdown
- 自动关联其他相关笔记
- 生成 [[Vue/11-Vue3性能优化-LLM编译.md]] 这样的笔记

### 3️⃣ 更新索引

```bash
node tools/indexer.js
```

- 扫描 wiki/ 目录
- 提取元数据（标题、摘要、标签、链接）
- 更新 .llm-kb/index.json

### 4️⃣ 使用搜索和问答

```bash
# 搜索
node tools/search.js "Vue3 性能优化"

# 问答
node tools/qa-system.js "Vue3 有哪些性能优化方法"
```

## 📊 本次演示结果

✅ **新增资料**：raw/articles/vue3-performance-optimization.md
✅ **编译笔记**：Vue/11-Vue3性能优化-LLM编译.md
✅ **索引更新**：知识库从 57 篇 → 58 篇
✅ **搜索可用**：新内容已可搜索
✅ **问答可用**：可以查询新内容

## 📝 使用场景示例

### 场景 1：学习新主题

1. 找到几篇关于新主题的文章
2. 放入 raw/articles/
3. 运行 LLM 编译生成 wiki 笔记
4. 使用搜索和问答快速学习

### 场景 2：面试复习

1. 收集面试相关的文章和资料
2. 让 LLM 整理成复习笔记
3. 使用问答系统模拟面试

### 场景 3：技术调研

1. 收集多个技术方案的对比文章
2. 让 LLM 整理成对比笔记
3. 发现不同技术的关联

## 🔧 工具说明

| 工具 | 用途 |
|------|------|
| `node tools/indexer.js` | 更新索引 |
| `node tools/search.js "关键词"` | 搜索内容 |
| `node tools/qa-system.js "问题"` | 问答系统 |
| `node tools/health-check.js` | 健康检查 |
| `node tools/summary-generator.js` | 摘要生成 |

## 💡 提示

- raw/ 是**原始资料**，不要直接编辑
- wiki/ 是**编译后的知识库**，LLM 会自动维护
- 索引会自动跟踪笔记间的关联
- 定期运行 `health-check.js` 保持知识库健康

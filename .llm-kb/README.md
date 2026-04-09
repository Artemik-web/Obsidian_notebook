# LLM 知识库系统 - 前端开发知识

基于 LLM Knowledge Bases 方法构建的智能前端开发知识库。

## 目录结构

```
.
├── raw/                    # 原始数据/源文件
│   ├── articles/           # 原始文章
│   ├── papers/             # 技术论文
│   ├── repos/              # 仓库文档
│   ├── datasets/           # 数据集
│   └── images/             # 原始图片
├── wiki/                   # LLM 编译后的知识库（就是当前笔记）
│   ├── HTML/               # 现有知识库文件夹
│   ├── CSS/
│   ├── JavaScript/
│   └── ...
├── outputs/                # LLM 生成的输出
│   ├── answers/            # Q&A 回答
│   ├── slides/             # 幻灯片（Marp 格式）
│   ├── visualizations/     # 可视化图表
│   └── summaries/          # 摘要
├── tools/                  # 辅助工具脚本
│   ├── indexer.js          # 索引生成器
│   ├── search.js           # 搜索工具
│   └── health-check.js     # 健康检查工具
└── .llm-kb/                # LLM 知识库元数据
    ├── index.json          # 知识库索引
    ├── summaries.json      # 笔记摘要
    └── stats.json          # 统计信息
```

## 使用指南

### 1. 数据摄入

将原始资料放入 `raw/` 目录，然后运行索引工具：

```bash
node tools/indexer.js
```

### 2. Q&A 查询

使用搜索工具查找知识：

```bash
node tools/search.js "Vue3 响应式原理"
```

### 3. 健康检查

检查知识库的完整性和一致性：

```bash
node tools/health-check.js
```

### 4. 生成输出

让 LLM 生成摘要、幻灯片或可视化：

```bash
# 生成某个主题的摘要
node tools/generate-summary.js "JavaScript 异步编程"

# 生成幻灯片
node tools/generate-slides.js "React Hooks"
```

## 工作流

1. **数据收集** → `raw/` 目录
2. **LLM 编译** → 生成/更新 `wiki/` 笔记
3. **索引构建** → 更新 `.llm-kb/index.json`
4. **Q&A 查询** → 基于索引回答问题
5. **输出归档** → 将有用的输出存回 `wiki/`
6. **健康维护** → 定期检查和优化

## 特点

- ✅ **增量更新**：LLM 自动维护知识，无需手动编辑
- ✅ **双向链接**：自动发现和创建笔记间的关联
- ✅ **智能问答**：基于完整知识库回答复杂问题
- ✅ **可视化输出**：生成 Markdown、幻灯片、图表等
- ✅ **自我优化**：定期检查一致性，补全缺失信息

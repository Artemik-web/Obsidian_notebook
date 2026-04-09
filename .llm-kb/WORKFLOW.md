# 知识库整理工作流

## 🗓️ 建议的整理频率

**每周整理 1 次（推荐周五晚上）

## 📋 完整的整理流程

### 第 1 步：收集阶段（日常）

```
周一到周五：
  - 看到好的网页 → 一键 Clipper 保存到 raw/articles/
  - 看到好的文章 → 一键 Clipper 保存到 raw/articles/
  - 不用马上整理，先放着
```

### 第 2 步：整理阶段（周五晚上）

#### 2.1 查看新增内容

```bash
# 1. 查看新增了什么
ls -la raw/articles/

# 2. 在 Obsidian 中查看新保存的
```

#### 2.2 快速浏览和分类

- 浏览 raw/articles/ 中的新内容：
  - ✅ 值得整理 → 标记为待编译
  - ❌ 不太重要 → 可以移动到 raw/archive/
  - ⏸️ 以后再看 → 先留着

#### 2.3 LLM 编译（如果有新内容）

```bash
# 运行编译器（需要实现真正的 LLM）
node tools/compiler.js

# 或者手动整理到 wiki/
```

#### 2.4 更新索引

```bash
node tools/indexer.js
```

#### 2.5 健康检查

```bash
node tools/health-check.js
```

#### 2.6 清理 raw/ 归档

```bash
# 整理过的移动到 raw/archive/
mkdir -p raw/archive
mv raw/articles/已整理.md raw/archive/
```

### 第 3 步：使用阶段（随时）

```bash
# 搜索
node tools/search.js "关键词"

# 问答
node tools/qa-system.js "问题"
```

## 📁 目录结构

```
raw/
├── articles/         # 新保存的网页
│   ├── 新文章1.md  # 待整理
│   └── 新文章2.md
├── archive/          # 已整理的归档
├── papers/           # 技术论文
├── images/           # 图片
└── USAGE-GUIDE.md   # 使用指南

wiki/               # 整理好的知识库（就是你的现有笔记）
├── HTML/
├── CSS/
├── JavaScript/
└── ...
```

## 🎯 快速检查清单

- [ ] 查看 raw/articles/ 有什么新内容
- [ ] 快速浏览新文章
- [ ] 决定哪些要整理，哪些要归档
- [ ] 编译到 wiki/
- [ ] 运行 indexer
- [ ] 运行 health-check
- [ ] 归档已整理的内容
- [ ] 用搜索试试新内容

## 💡 自动化建议

### 方案 1：手动整理（适合你现在的情况

你现在的知识库已经整理得很好了！可以：
- raw/ 只放**全新的主题**
- 已有主题的更新直接编辑 wiki/

### 方案 2：完全 LLM 自动化（适合科研）

- 所有东西都放 raw/
- 完全靠 LLM 编译到 wiki/
- 很少手动编辑 wiki/

## 📝 笔记

你的前端知识库已经整理得很好了，raw/ 主要放**全新的、未整理的资料

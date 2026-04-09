---
title: Obsidian × Claudian × Skills：打造真正会“思考”的个人知识库-阿里云开发者社区
source: https://developer.aliyun.com/article/1712715
author:
published:
created: 2026-04-09
description: 本文介绍如何通过Claudian插件将Claude Code（支持Skills）深度接入Obsidian，实现AI原生协作：无需切换窗口，直接在笔记中内联编辑、重构内容、调用技能，让AI真正参与知识整理与思考。本地友好，兼容多平台Anthropic API。
tags:
  - clippings
---
在上一篇文章 **《Obsidian 使用指南：从零开始搭建你的个人知识库》** 中，我们介绍了 Obsidian 的基础使用方式：  
如何用 Markdown 记录知识、用双链组织思路、逐步搭建属于自己的知识体系。

但问题也随之而来：

> **当笔记越来越多，它们真的“活”起来了吗？**

最近一段时间， **Claude Code + Skills** 在开发者圈子里非常火🔥  
它不仅是一个 AI 聊天工具，而是一个 **可以理解上下文、执行技能、参与协作的 AI 编程与思考助手** 。

那么问题来了：

> **Obsidian 能不能接入 Claude Code？  
> 让 AI 不只是“帮你写”，而是真正参与“思考”和“整理知识”？**

答案是： **可以，而且体验非常好。**

本文将带你一步步完成：

- 在 Obsidian 中接入 **Claude Code**
- 通过 **Claudian 插件** ，把 Claude 变成你的 **AI 协作助手**
- 利用 **Skills** ，让 AI 直接参与笔记编辑、重构与思考

---

## 为什么要把 Claude 接入 Obsidian？

在开始之前，先说清楚 **这套组合解决什么问题** 。

传统 AI + 笔记的方式，通常是：

- 复制一段内容
- 打开网页 / Chat 客户端
- 让 AI 帮你改写 / 总结
- 再粘贴回来

而 **Obsidian × Claude Code × Skills** 的核心价值在于：

## ✅ AI 就在你的知识库里工作

- 不需要来回切换窗口
- 直接理解你当前笔记内容
- 在 **原地进行内联编辑**

## ✅ Claude Code + Skills ≠ 普通聊天

- 能调用 **Skill（技能）**
- 能执行复杂指令（重写、拆解、结构化、补充）
- 更像一个「 **协作伙伴** 」，而不是问答机器人

## ✅ 非侵入式、完全本地友好

- Obsidian 仍然是你的本地 Markdown
- Claude 只是“参与编辑”，不劫持你的数据结构

---

## Claudian 插件介绍

实现这一切的关键，就是 **Claudian 插件** 。

> GitHub：  
> [https://github.com/YishenTu/claudian](https://github.com/YishenTu/claudian?spm=a2c6h.12873639.article-detail.4.1976330b9CkbTu)

**Claudian 是什么？**

- 一个 Obsidian 桌面端插件
- 用于连接 **Claude Code CLI**
- 支持 **Claude Code 的 Skills 体系**
- 可在 Obsidian 内直接与 Claude 交互、编辑文本

一句话总结：

> **Claudian = 把 Claude Code 搬进 Obsidian。**

---

## 使用前的要求

在安装前，请确保你的环境满足以下条件：

- ✅ 已安装 [Claude Code CLI](https://code.claude.com/docs/en/overview)  
	👉 **强烈建议使用 Native Install**
- ✅ Obsidian **v1.8.9+**
- ✅ 拥有支持 **Anthropic API 格式** 的 Claude 订阅 / API Key  
	或使用以下兼容平台之一：
	- [OpenRouter](https://openrouter.ai/docs/guides/guides/claude-code-integration)
		- [Kimi（月之暗面）](https://platform.moonshot.ai/docs/guide/agent-support)
		- [GLM（智谱 BigModel）](https://docs.z.ai/devpack/tool/claude)
		- [DeepSeek](https://api-docs.deepseek.com/guides/anthropic_api)
- ✅ **仅支持桌面端** （macOS / Linux / Windows）

> 如果你对 Claude Code、Skills、或智谱模型的接入还不熟悉，可以先参考我之前的两篇文章：
> 
> - 《Claude Code × 智谱 BigModel 实战集成指南》
> - 《Claude Code 支持重磅扩展 Skills》

---

## Claudian 插件安装（手动）

目前 Claudian **尚未上架 Obsidian 社区市场** ，需要手动安装。

## 1️⃣ 下载插件文件

前往 GitHub Releases 页面，下载最新版本：

👉 [https://github.com/YishenTu/claudian/releases/latest](https://github.com/YishenTu/claudian/releases/latest)

需要以下三个文件：

- `main.js`
- `manifest.json`
- `styles.css`

---

## 2️⃣ 创建插件目录

在你的 Obsidian Vault 中，创建插件目录：

```
/path/to/vault/.obsidian/plugins/claudian/

        
          
        
        
        
          
          AI 代码解读
```

---

## 3️⃣ 拷贝文件

将下载的三个文件复制到 `claudian` 文件夹中。

---

## 4️⃣ 在 Obsidian 中启用插件

路径如下：

- **设置 → 社区插件**
- 启用 **Claudian**

![PixPin_2026-02-01_18-40-08.png](https://ucc.alicdn.com/pic/developer-ecology/txywncudc7k7m_328628d493cb485f86aee3e6bc27a705.png?x-oss-process=image/resize,w_1400/format,webp)

---

## 启用 Claudian 插件

如果插件没有立刻显示，可以：

- 设置 → 第三方插件
- 点击 **刷新**
- 启用 **Claudian**

![PixPin_2026-02-01_18-41-08.png](https://ucc.alicdn.com/pic/developer-ecology/txywncudc7k7m_1b0c5469d50244ffb4dcda69ef7505a9.png)

---

## 配置 Claude / 模型环境

进入插件设置：

**设置 → Claudian → Environment（环境）**

这里可以配置 Claude API，也可以配置你在前文中使用过的 **智谱 BigModel（GLM）** 。

示例配置如下：

```
ANTHROPIC_API_KEY=your api key
ANTHROPIC_BASE_URL=https://open.bigmodel.cn/api/anthropic
ANTHROPIC_MODEL=glm-4.7

        
          
        
        
        
          
          AI 代码解读
```

![PixPin_2026-02-01_19-14-11.png](https://ucc.alicdn.com/pic/developer-ecology/txywncudc7k7m_f21529b5b3344584a72803684f0dc671.png)

> 💡 Claudian 的优势之一就在于：  
> **它不限定官方 Claude，只要兼容 Anthropic API 即可。**

---

## 在 Obsidian 中使用 Claude

完成配置后，就可以正式开始使用了。

## 基础使用方式

1. 点击 Obsidian 左侧功能区的 🤖 机器人图标  
	或使用 **命令面板** 打开 Claude 聊天窗口
2. 在笔记中 **选中一段文本**
3. 使用快捷键，让 Claude **直接进行内联编辑**

![PixPin_2026-02-01_19-18-15.png](https://ucc.alicdn.com/pic/developer-ecology/txywncudc7k7m_93932f6ac0c24210b2270b2c4ad040b9.png)

这一步的体验非常关键：

> **AI 不再是“给你建议”，而是“直接帮你改文档”。**

---

## Skills：让 Claude 真正“会干活”

Claudian 最大的亮点之一，就是 **完整支持 Claude Code 的 Skills** 。

在输入框中输入 `/` ，即可弹出：

![PixPin_2026-02-01_19-28-15.png](https://ucc.alicdn.com/pic/developer-ecology/txywncudc7k7m_2ca81e080afb492a8c5c271024f94a0d.png)

这意味着什么？

你可以在 Obsidian 里直接让 Claude：

- 重构一篇技术文章
- 拆解复杂概念
- 生成大纲 / TODO / 知识卡片
- 统一文档风格
- 把“零散笔记”整理成“系统知识”

**这已经不是简单的 AI 辅助写作，而是 AI 协作编辑。**

---

## 写在最后

如果说：

- **Obsidian** 解决的是「 **知识如何存储与连接** 」
- 那么 **Claude Code + Skills** 解决的就是「 **知识如何被持续加工与进化** 」

而 **Claudian 插件** ，正好把这两件事无缝连接在一起。

> 从此你的 Obsidian 不只是笔记库，而是一个  
> **可以被 AI 参与思考、不断演化的个人知识系统。**

如果你觉得这篇文章有帮助，欢迎 **点赞 / 转发 / 收藏** 。  
我们下篇见。 👋
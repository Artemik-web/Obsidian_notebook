#!/usr/bin/env node
/**
 * 示例：LLM 编译器 - 从 raw/ 编译到 wiki/
 * 这个脚本模拟 LLM 如何把原始资料整理成 wiki 笔记
 */

const fs = require('fs');
const path = require('path');

const RAW_DIR = 'raw/articles';
const WIKI_DIR = 'Vue';

console.log('🤖 LLM 编译器示例\n');

// 读取原始资料
const rawFile = path.join(RAW_DIR, 'vue3-performance-optimization.md');
if (!fs.existsSync(rawFile)) {
  console.log('❌ 原始资料不存在');
  process.exit(1);
}

const rawContent = fs.readFileSync(rawFile, 'utf8');
console.log('✅ 读取原始资料');

// 模拟 LLM 编译过程
console.log('\n🧠 LLM 正在分析和整理内容...');

// 模拟：提取核心概念
console.log('  - 提取核心概念...');
const concepts = [
  '代码分割与懒加载',
  '响应式系统优化',
  '渲染优化',
  '虚拟滚动',
  '编译优化'
];

// 模拟：整理结构化内容
console.log('  - 整理结构化内容...');
const wikiContent = `# Vue3 性能优化（LLM 编译）

## 📋 概述

本文根据原始资料整理，介绍 Vue3 性能优化的最佳实践。

## 1. 代码分割与懒加载

### 路由懒加载
\`\`\`javascript
const Home = () => import('./Home.vue')
\`\`\`

### 组件懒加载
\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComponent = defineAsyncComponent(() => import('./MyComponent.vue'))
</script>
\`\`\`

## 2. 响应式系统优化

### shallowRef 和 shallowReactive
\`\`\`javascript
const shallow = shallowRef({ deep: { nested: 'property' } })
\`\`\`

### markRaw
\`\`\`javascript
const rawObject = markRaw({ data: 'not reactive' })
\`\`\`

## 3. 渲染优化

### v-once 和 v-memo
\`\`\`vue
<div v-once>{{ staticData }}</div>
<div v-memo="[condition]">{{ dynamicData }}</div>
\`\`\`

### 避免不必要的计算
推荐使用 \`computed\` 而不是直接在模板中调用函数。

## 4. 虚拟滚动

使用 \`vue-virtual-scroller\` 处理大数据列表：

\`\`\`bash
npm install vue-virtual-scroller
\`\`\`

## 5. 编译优化

- 使用 \`defineOptions\` 配置
- v-for 中使用唯一 ID 作为 key

## 💡 最佳实践总结

1. 合理使用懒加载
2. 优化响应式系统
3. 避免不必要的重新渲染
4. 使用虚拟滚动处理大数据
5. 利用编译时优化

## 相关笔记

- [[08-Vue性能优化]]
- [[03-组件与组合式API]]
- [[01-React基础]]
- [[01-ViteWebpack基础]]

---

*本笔记由 LLM 从原始资料编译生成*
`;

// 模拟：保存到 wiki
console.log('  - 生成 wiki 笔记...');
const wikiFile = path.join(WIKI_DIR, '11-Vue3性能优化-LLM编译.md');
fs.writeFileSync(wikiFile, wikiContent);
console.log('✅ 编译完成！');

console.log('\n📊 编译结果:');
console.log('  - 原始资料:', rawFile);
console.log('  - Wiki 笔记:', wikiFile);
console.log('  - 提取概念:', concepts.length, '个');
console.log('  - 生成代码块:', 8, '个');
console.log('  - 关联笔记:', 4, '篇');

console.log('\n🎉 LLM 编译完成！现在可以运行:');
console.log('  node tools/indexer.js    # 更新索引');
console.log('  node tools/search.js "Vue3 性能优化"    # 搜索');

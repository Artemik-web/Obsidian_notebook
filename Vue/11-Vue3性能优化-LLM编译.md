# Vue3 性能优化（LLM 编译）

## 📋 概述

本文根据原始资料整理，介绍 Vue3 性能优化的最佳实践。

## 1. 代码分割与懒加载

### 路由懒加载
```javascript
const Home = () => import('./Home.vue')
```

### 组件懒加载
```vue
<script setup>
import { defineAsyncComponent } from 'vue'
const AsyncComponent = defineAsyncComponent(() => import('./MyComponent.vue'))
</script>
```

## 2. 响应式系统优化

### shallowRef 和 shallowReactive
```javascript
const shallow = shallowRef({ deep: { nested: 'property' } })
```

### markRaw
```javascript
const rawObject = markRaw({ data: 'not reactive' })
```

## 3. 渲染优化

### v-once 和 v-memo
```vue
<div v-once>{{ staticData }}</div>
<div v-memo="[condition]">{{ dynamicData }}</div>
```

### 避免不必要的计算
推荐使用 `computed` 而不是直接在模板中调用函数。

## 4. 虚拟滚动

使用 `vue-virtual-scroller` 处理大数据列表：

```bash
npm install vue-virtual-scroller
```

## 5. 编译优化

- 使用 `defineOptions` 配置
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

# Vue3 性能优化最佳实践 - 原始资料

## 1. 代码分割与懒加载

### 路由懒加载
```javascript
// 使用 import 动态导入
const Home = () => import('./Home.vue')
```

### 组件懒加载
```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./MyComponent.vue')
)
</script>
```

## 2. 响应式系统优化

### 使用 shallowRef 和 shallowReactive
```javascript
// 只监听引用变化，不监听内部属性
const shallow = shallowRef({
  deep: { nested: 'property' }
})

// 修改 shallow.value 会触发更新
shallow.value = { ...shallow.value, newProp: 'value' }
```

### 使用 markRaw
```javascript
// 标记对象为不可响应
const rawObject = markRaw({
  data: 'not reactive'
})
```

## 3. 渲染优化

### 使用 v-once 和 v-memo
```vue
<!-- 只渲染一次 -->
<div v-once>{{ staticData }}</div>

<!-- 依赖变化才更新 -->
<div v-memo="[condition]">
  {{ dynamicData }}
</div>
```

### 避免不必要的计算
```javascript
// 避免在模板中直接调用函数
// 推荐使用 computed
const computedValue = computed(() => {
  return expensiveOperation(data)
})
```

## 4. 虚拟滚动

### 使用 vue-virtual-scroller
```bash
npm install vue-virtual-scroller
```

```vue
<script setup>
import { useVirtualList } from 'vue-virtual-scroller'
import items from './large-data-set'
</script>

<template>
  <virtual-list :items="items" :item-height="100">
    <template v-slot="{ item }">
      <div>{{ item }}</div>
    </template>
  </virtual-list>
</template>
```

## 5. 编译优化

### 使用 defineOptions 配置
```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: true
})
</script>
```

### 使用 v-for 的 key 优化
```vue
<!-- 推荐：使用唯一 ID -->
<div v-for="item in items" :key="item.id">
  {{ item.name }}
</div>
```

## 总结

Vue3 性能优化要点：
1. 合理使用懒加载
2. 优化响应式系统
3. 避免不必要的重新渲染
4. 使用虚拟滚动处理大数据
5. 利用编译时优化

# Vue2 vs Vue3 区别

## 1. 架构

### Vue2
- 基于 Options API，按选项分割代码（data、methods、computed...）
- 用 Object.defineProperty 实现响应式
- 所有逻辑混合在一起，大组件难维护，复用不方便

### Vue3
- 推荐 Composition API，按逻辑分割代码，相同逻辑放一起
- 用 Proxy 实现响应式，解决了 Vue2 响应式问题
- 更好的 TypeScript 支持
- 更小的包体积，更快的性能

## 2. 响应式区别

### Vue2 Object.defineProperty
```javascript
Object.defineProperty(obj, 'name', {
  get() {},
  set() {}
})
```

**问题：**
- 不能监听新增属性、删除属性，需要用 `$set` `$delete`
- 不能监听数组索引变化，数组修改索引不会触发更新
- 递归遍历所有属性，一次性遍历，性能差

### Vue3 Proxy
```javascript
const proxy = new Proxy(obj, {
  get(target, key) {},
  set(target, key, value) {},
  deleteProperty(target, key) {}
})
```

**优点：**
- 可以监听新增属性、删除属性
- 可以监听数组索引变化
- 懒代理，访问到才代理，性能更好
- 不污染原对象

## 3. API 区别

### 创建实例
```javascript
// Vue2
new Vue(options);

// Vue3
createApp(options).mount('#app');
```

### 根节点
Vue2 要求模板有且只有一个根节点
Vue3 允许多个根节点

### 选项式 vs 组合式
- Vue2 默认 Options API
- Vue3 推荐 Composition API + `<script setup>`，更简洁

## 4. 生命周期对比

| Vue2 | Vue3 组合式 |
|------|-------------|
| beforeCreate | 不需要，代码直接写 |
| created | 不需要，代码直接写 |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |
| activated | onActivated |
| deactivated | onDeactivated |
| errorCaptured | onErrorCaptured |

## 5. 全局 API 变化

### Vue2 挂载在原型
```javascript
// Vue2
import Vue from 'vue'
Vue.prototype.$http = axios
```

### Vue3 改为挂载在 app 实例
```javascript
// Vue3
const app = createApp(App)
app.config.globalProperties.$http = axios
```

### 注册组件
```javascript
// Vue2
Vue.component('MyComponent', MyComponent)

// Vue3
app.component('MyComponent', MyComponent)
```

## 6. 新特性

Vue3 有这些 Vue2 没有的新特性：
- Composition API
- `<script setup>` 语法糖
- `ref/reactive/computed/watch/watchEffect`
- Teleport 传送组件
- Suspense 异步组件加载
- 更好的 Tree-shaking，编译后更小
- 自定义渲染API
- 多根节点模板

## 7. 打包体积

Vue2 打包约 `~33KB`（gzip）
Vue3 打包约 `~10KB`（gzip）小很多

## 8. TypeScript 支持

Vue2 对 TS 支持一般，需要额外插件
Vue3 原生用 TS 写，支持非常好，类型推断更好

## 9. 总结对比表

| 点 | Vue2 | Vue3 |
|----|------|------|
| 架构 | Options API | Composition API |
| 响应式 | Object.defineProperty | Proxy |
| 包大小 | 较大 | 小约 1/3 |
| TS支持 | 一般 | 原生优秀支持 |
| 逻辑复用 | mixin（有命名冲突，不清晰）| 自定义Hook（清晰好用）|
| 新增属性 | 需要 $set | 直接赋值就能响应 |
| 数组监听 | 索引变化监听不了 | 可以监听 |
| 多根节点 | 不支持 | 支持 |
| `<script setup>` | 没有 | 有，语法简洁 |
| Teleport | 没有 | 有 |
| Suspense | 没有 | 有 |

## 开发推荐

现在开发新项目直接用 Vue3 + `<script setup>` + Pinia + Vue Router 4。

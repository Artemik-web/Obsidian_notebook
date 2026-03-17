# Vue 性能优化

## 1. 打包构建优化

### 路由懒加载

```javascript
// 不推荐：一开始全部加载
import Home from './views/Home.vue'
import About from './views/About.vue'

// 推荐：动态导入，按需打包，按需加载
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]
```

这样每个页面打包成独立 chunk，访问的时候才加载，首屏更快。

### 第三方库 CDN 引入

不要把大的第三方库打包进去，用 CDN：

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'axios', 'lodash'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios'
        }
      }
    }
  }
})
```

index.html：
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

利用浏览器缓存，首屏加载更快。

### 开启 gzip / brotli 压缩

nginx 开启压缩，传输体积更小：

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

vite 可以用插件生成 `.gz` 文件：
```bash
npm install vite-plugin-compression -D
```

### 生产环境 sourcemap 关掉

开发需要，生产不需要，减小打包体积：

```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: false,
  }
})
```

## 2. 组件级别优化

### v-if vs v-show 按需用

- v-if：不满足条件根本不渲染 DOM，切换开销大 → 适合很少切换
- v-show：始终渲染，只是 display none，切换开销小 → 适合频繁切换

```vue
<!-- 频繁切换用 v-show -->
<div v-show="show">内容</div>

<!-- 不经常切换用 v-if -->
<div v-if="type === 'A'">A</div>
```

### v-for 一定要加 key

Vue 复用 DOM 靠 key diff，不加 key 可能出错，性能更差

```vue
<!-- 好，用唯一id -->
<li v-for="item in list" :key="item.id">{{ item.name }}</li>

<!-- 不好，不要用index -->
<li v-for="item, index in list" :key="index">...</li>
```

### 长期缓存组件keep-alive

如果不需要每次重新渲染，缓存起来：

```vue
<keep-alive>
  <router-view />
</keep-alive>
```

include/exclude 缓存哪些：
```vue
<keep-alive include="Home,About">
  <router-view />
</keep-alive>
```

缓存之后生命周期会触发 `onActivated` / `onDeactivated`。

### 事件销毁

绑定了自定义事件、定时器，卸载要清理：

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

const timer = setInterval(() => {
  // ...
}, 1000);

window.addEventListener('resize', handleResize);

onUnmounted(() => {
  clearInterval(timer);
  window.removeEventListener('resize', handleResize);
});
</script>
```

不然会内存泄漏。

## 3. 大数据列表优化

### 虚拟滚动（只渲染可视区）

如果几千上万条数据，不要全部渲染，只渲染可见区域。

用库：`vue-virtual-scroller`

```bash
npm install vue-virtual-scroller
```

```vue
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="item">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>
```

不管多少数据都流畅。

### 分片加载

大数据分批次加载，每次加载一部分，点击加载更多或者滚动加载下一页。

## 4.  computed 优化

- 不要在 computed 做太复杂计算，太消耗性能
- 不改变的数据只会缓存，依赖不变不会重新计算，好好利用缓存
- 不要滥用，简单表达式模板直接写就行，没必要放 computed

## 5. watch 优化

```javascript
// 不要深度监听整个大对象，尽量监听具体属性
watch(() => obj.name, ...) // 好
watch(obj, ..., { deep: true }) // 不好，除非必要

// 大数据用 watchEffect，自动收集依赖，更高效
watchEffect(() => {
  // 只用到 name，只监听 name
  console.log(obj.name);
})
```

## 6. 防抖节流

频繁触发的事件（scroll resize input）做防抖节流：

```javascript
import { debounce } from 'lodash-es';

const handleSearch = debounce((value) => {
  // 发请求
}, 300);

input.addEventListener('input', (e) => {
  handleSearch(e.target.value);
});
```

减少触发次数，提升性能。

## 7. 无用代码 tree-shaking

- 按需引入：
```javascript
// 不好，全引入
import _ from 'lodash';

// 好，按需引入
import debounce from 'lodash/debounce';
```

- vite/webpack 原生支持 tree-shaking，不用的代码不会打包
- 开发环境不要引入调试工具，生产自动去掉

## 8. 图片优化

- 用 webp 格式，更小体积
- 懒加载：`<img loading="lazy">` 进入可视区再加载
- 小图用 base64
- 根据屏幕密度加载不同尺寸，2x 屏加载 2x 图

## 9. 异步组件

大组件异步加载，不阻塞首屏：

```vue
<script setup>
// 异步组件，webpack/vite 自动分包
const BigModal = defineAsyncComponent(() =>
  import('./BigModal.vue')
);
</script>

<template>
  <Suspense>
    <BigModal />
    <template #fallback>
      加载中...
    </template>
  </Suspense>
</template>
```

## 10. Pinia 状态持久化只存需要的

不要把整个 state 都存 localStorage，只存需要的（比如 token、用户信息）：

```javascript
persist: {
  paths: ['token', 'userInfo']
}
```

不要存太大，不然读取也慢。

## 11. 函数式组件/无状态组件

只接收 props 渲染的组件，可以写成函数式，性能更好一点（开发环境其实差不多，生产会优化）

## 12. SSR / 预渲染

SEO 要求高、首屏慢，用 SSR（Nuxt.js）或者预渲染，首屏更快，SEO更好。

## 总结优化 checklist

✅ 路由懒加载
✅ 第三方库 CDN
✅ v-for 加 key
✅ keep-alive 缓存不需要重复渲染的页面
✅ 卸载清理事件定时器
✅ 大数据列表虚拟滚动
✅ 防抖节流优化高频事件
✅ 不要深度监听大对象
✅ 开启 gzip 压缩
✅ 关掉生产 sourcemap
✅ 图片懒加载、webp

按这个检查一遍，性能基本就没问题了。

---

## 相关笔记

- [[01-Vue3基础]]
- [[02-响应式系统]]
- [[04-路由与Pinia]]
- ../React/[[05-React性能优化]]
- ../JavaScript/[[04-异步与AJAX]]
- ../工程化/[[01-ViteWebpack基础]]

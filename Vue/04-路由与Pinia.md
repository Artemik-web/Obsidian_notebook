# Vue 路由与 Pinia

## 1. Vue Router 路由

Vue Router 是 Vue 官方路由管理器，用来做 SPA（单页应用）页面切换。

### 1.1 安装

```bash
npm install vue-router@4
```

### 1.2 基本配置

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import User from '../views/User.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id', // 动态路由，参数在 :id
    name: 'User',
    component: User
    // 可以加 props: true，这样组件可以用 props 接收参数，更干净
    props: true
  }
];

const router = createRouter({
  // history 模式，地址好看，没有 #
  history: createWebHistory(import.meta.env.BASE_URL),
  // hash 模式，有 #，兼容性好
  // history: createWebHashHistory(),
  routes
});

export default router;
```

入口引入：

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

App.vue 放出口：

```vue
<template>
  <!-- 路由出口，匹配的组件渲染在这里 -->
  <router-view />
</template>
```

### 1.3 导航

**声明式导航（模板里用）：**

```vue
<template>
  <router-link to="/">首页</router-link>
  <router-link to="/about">关于</router-link>

  <!-- 动态路由 -->
  <router-link :to="`/user/${userId}`">用户</router-link>

  <!-- 对象写法 -->
  <router-link :to="{ name: 'User', params: { id: 123 } }">用户</router-link>
</template>
```

**编程式导航（JS 里导航）：**

```javascript
import { useRouter } from 'vue-router';

const router = useRouter();

// 跳转到路径
router.push('/about');

// 对象写法
router.push({ name: 'User', params: { id: 123 } });

// 返回
router.back();
router.go(-1);

// 前进
router.forward();

// 替换当前路由，不留下历史记录
router.replace('/about');
```

### 1.4 获取路由参数

**动态路由参数：**

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// 参数在 params
console.log(route.params.id); // 动态路由 /user/:id → id在这里

// 查询参数 ?name=张三
console.log(route.query.name);
</script>
```

如果路由配置了 `props: true`，可以直接用 props 拿：

```vue
<script setup>
defineProps(['id']);
console.log(id); // 就是 params.id，更简洁 ✓
</script>
```

### 1.5 嵌套路由

有多层出口：

```javascript
const routes = [
  {
    path: '/user',
    component: User,
    children: [
      // /user/profile → 匹配到这里，渲染到 User 里的 <router-view>
      { path: 'profile', component: UserProfile },
      // /user/posts → 匹配到这里
      { path: 'posts', component: UserPosts }
    ]
  }
];
```

User.vue 里要有 `<router-view>`：

```vue
<template>
  <h1>用户页</h1>
  <router-view />
</template>
```

### 1.6 导航守卫

路由变化前后拦截，比如做权限验证：

**全局前置守卫：**

```javascript
router.beforeEach((to, from, next) => {
  // to 要去的路由
  // from 从哪来
  // next 放行
  if (isLogin) {
    next(); // 放行
  } else {
    next('/login'); // 跳登录
  }
});
```

**组件内守卫：**

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';

// 离开当前组件前
onBeforeRouteLeave((to, from, next) => {
  if (有未保存内容) {
    if (confirm('确定离开吗？修改未保存')) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

// 当前路由更新，参数变了
onBeforeRouteUpdate((to, from, next) => {
  // 更新数据
  next();
});
</script>
```

## 2. Pinia 状态管理

Pinia 是 Vue 官方推荐的状态管理库，代替 Vuex，更简单更好用。

### 2.1 安装

```bash
npm install pinia
```

### 2.2 引入

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

### 2.3 定义 Store

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// defineStore(storeId, 配置)
export const useCounterStore = defineStore('counter', () => {
  // 状态，ref 就是响应式
  const count = ref(0);

  // actions，就是函数，可以改状态
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  // getters 就是 computed，缓存
  const doubleCount = computed(() => count.value * 2);

  return { count, doubleCount, increment, decrement };
});
```

**选项式写法也支持（类似 Vuex）：**

```javascript
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    }
  }
});
```

推荐 setup 写法，和组合式API风格一致，更好。

### 2.4 使用 Store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();

// 直接用
console.log(counter.count);
counter.increment();

// 解构要加 storeToRefs 保持响应性！
import { storeToRefs } from 'pinia';
const { count, doubleCount } = storeToRefs(counter);
// 现在 count 和 doubleCount 都是响应式 ref ✓
// 方法不用包，直接拿：const { increment } = counter;
</script>

<template>
  <p>count: {{ count }}</p>
  <p>double: {{ doubleCount }}</p>
  <button @click="counter.increment">+1</button>
</template>
```

**重要：直接解构出来会丢响应式，一定要用 `storeToRefs`。**

### 2.5 修改状态

方式1：直接改：

```javascript
const counter = useCounterStore();
counter.count++;
// 直接改就行，简单！
```

方式2：在 store 里定义方法改：

```javascript
// store 里
function increment() {
  count.value++;
}
// 组件里
counter.increment();
```

方式3：`$patch` 批量改多个：

```javascript
counter.$patch({
  count: 100,
  name: '张三'
});
```

### 2.6 多个 store 互相使用

```javascript
// storeA.js
import { useCounterStore } from './counter';

export const useUserStore = defineStore('user', () => {
  // ...
  function doSomething() {
    const counter = useCounterStore();
    // 直接用就好了
    console.log(counter.count);
  }

  return { doSomething };
});
```

### 2.7 持久化存储

刷新页面状态不丢失，可以用插件 `pinia-plugin-persistedstate`：

```bash
npm install pinia-plugin-persistedstate
```

配置：

```javascript
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

使用：

```javascript
export const useUserStore = defineStore('user', {
  state: () => ({ ... }),
  persist: true // 开启持久化，存在 localStorage
});
```

或者自定义：

```javascript
persist: {
  key: 'my-user', // 存的key
  storage: sessionStorage, // 存在 sessionStorage
  paths: ['name', 'token'], // 只持久化这些属性
}
```

### 2.8 在组件外使用

比如在路由守卫里用：

```javascript
const userStore = useUserStore(router);
// 只要 pinia 已经安装了，直接拿就能用
```

## 3. 常见场景

### 用户登录状态管理

```javascript
// stores/user.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref(null);

  const isLogin = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function logout() {
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
  }

  return { token, userInfo, isLogin, setToken, logout };
}, {
  persist: true // 持久化
});
```

路由守卫判断登录：

```javascript
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isLogin) {
    next('/login');
  } else {
    next();
  }
});
```

## 最佳实践

### 路由
- 用 history 模式，需要后端配置 fallback，不然刷新404
- 动态路由参数用 `props: true` 更干净
- 路由懒加载：`() => import('../views/About.vue')` 分包加载更快
  ```javascript
  const routes = [
    {
      path: '/about',
      component: () => import('../views/About.vue')
    }
  ];
  ```

### Pinia
- 按功能拆分 store，一个功能一个 store
- 解构用 `storeToRefs` 保持响应性
- 修改状态推荐在 store 里写方法，方便跟踪和复用
- 需要持久化开 persist 插件就行
- Pinia 比 Vuex 简单太多，默认推荐用 Pinia

## 总结

- Vue Router 做单页应用路由，`router-link` 导航，`router-view` 出口
- 动态路由 `:id`，参数 `useRoute().params` 拿
- Pinia 是新一代状态管理，`defineStore` 定义，`storeToRefs` 解构保持响应
- 直接修改状态就可以，不用 mutations，简单多了
- 持久化用插件非常方便

---

## 相关笔记

- [[01-Vue3基础]]
- [[08-Vue性能优化]]
- ../React/[[04-React路由与状态管理]]

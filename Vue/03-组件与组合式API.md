# Vue3 组件与组合式 API

## 1. 组件注册

### 全局注册

在入口注册，所有组件都能用：

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import MyButton from './components/MyButton.vue';

const app = createApp(App);
app.component('MyButton', MyButton);
app.mount('#app');
```

缺点：没用的组件打包不会tree-shaking，会打进去。

### 局部注册（推荐）

在使用的组件里面引入注册：

```vue
<script setup>
import MyButton from './MyButton.vue';
// 引入了就能用，不用components选项了，因为script setup自动注册
</script>

<template>
  <MyButton />
</template>
```

优点：用才引入，打包能tree-shake，更好。

## 2. Props 父传子

父组件给子组件传数据用 props。

### 父组件

```vue
<template>
  <Child :count="count" title="标题" :user="user" />
</template>

<script setup>
import Child from './Child.vue';
import { ref } from 'vue';
const count = ref(0);
const user = ref({ name: '张三' });
</script>
```

### 子组件

用 `defineProps` 声明：

```vue
<script setup>
// 数组写法，简单情况
const props = defineProps(['count', 'title', 'user']);

// 对象写法，可以加类型、默认值（推荐）
const props = defineProps({
  count: {
    type: Number, // 类型
    required: true, // 必填
    default: 0 // 默认值
  },
  title: {
    type: String,
    default: '默认标题'
  }
});

// 使用 props
console.log(props.count);
</script>

<template>
  <div>{{ count }}</div>
</template>
```

**注意：**
- `defineProps` 不需要导入，`<script setup>` 里自动可用
- props 是只读的，子组件不能修改父组件传过来的 props，要改让父组件改

**默认值写法：**
- 基本类型直接写默认值
- 对象/数组默认值要函数返回：
```javascript
const props = defineProps({
  user: {
    type: Object,
    default: () => ({ name: '张三' })
  },
  list: {
    type: Array,
    default: () => []
  }
});
```

## 3. Emits 子传父

子组件触发事件给父组件，父组件监听。

### 子组件

```vue
<script setup>
// 声明 emits
const emit = defineEmits(['update', 'delete']);

// 触发事件，传参数
const handleClick = () => {
  emit('update', 123); // 事件名，参数
};
</script>

<template>
  <button @click="handleClick">点击通知父组件</button>
</template>
```

### 父组件监听

```vue
<template>
  <Child @update="handleUpdate" @delete="handleDelete" />
</template>

<script setup>
import Child from './Child.vue';

const handleUpdate = (id) => {
  console.log('收到id', id);
};
</script>
```

## 4. v-model 双向绑定（组件上）

Vue3 支持在组件上用 v-model，语法糖。

### 子组件

```vue
<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
};
</script>

<template>
  <input :value="modelValue" @input="handleChange" />
</template>
```

### 父组件用

```vue
<template>
  <MyInput v-model="value" />
  <!-- 等价于： -->
  <MyInput :modelValue="value" @update:modelValue="value = $event" />
</template>

<script setup>
import { ref } from 'vue';
import MyInput from './MyInput.vue';
const value = ref('');
</script>
```

**多个 v-model：**
```vue
<template>
  <MyComponent v-model:title="title" v-model:content="content" />
</template>
```

子组件：
```javascript
const props = defineProps(['title', 'content']);
const emit = defineEmits(['update:title', 'update:content']);
```

## 5. 插槽 slot

插槽让父组件可以往子组件插入内容，更灵活。

### 默认插槽

子组件：
```vue
<template>
  <div class="container">
    <slot> <!-- 插槽出口，这里放父组件内容 -->
      默认内容，如果父不传就显示这个
    </slot>
  </div>
</template>
```

父组件：
```vue
<template>
  <MyContainer>
    <p>我是父组件插进来的内容</p>
  </MyContainer>
</template>
```

### 具名插槽

多个插槽，给名字：

子组件：
```vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot> <!-- 没名字就是默认 -->
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

父组件：
```vue
<template>
  <MyCard>
    <template #header>
      <h3>卡片标题</h3>
    </template>

    <p>卡片内容，这里默认插槽</p>

    <template #footer>
      <button>按钮</button>
    </template>
  </MyCard>
</template>
```

`v-slot:header` 缩写 `#header`。

### 作用域插槽

子组件数据让父组件用插槽渲染的时候用：

子组件：
```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <slot :item="item"></slot> <!-- 把 item 传出去 -->
    </li>
  </ul>
</template>

<script setup>
defineProps(['list']);
</script>
```

父组件：
```vue
<template>
  <MyList :list="list">
    <!-- 拿到 item 自定义渲染 -->
    <template #default="{ item }">
      <span style="color: red;">{{ item.name }}</span>
    </template>
  </MyList>
</template>
```

非常灵活，适合做列表、表格这种容器组件，让用户自定义单元格渲染。

## 6. 生命周期

每个组件创建更新销毁过程会触发这些钩子。

| Vue2 选项式 | `<script setup>` 组合式 | 说明 |
|-------------|--------------------------|------|
| `beforeCreate` | 不需要 | 实例创建前，组合式不需要 |
| `created` | 不需要 | 创建后，组合式不需要，代码直接执行就是了 |
| `beforeMount` | `onBeforeMount` | DOM 挂载前 |
| `mounted` | `onMounted` | DOM 挂载完成 |
| `beforeUpdate` | `onBeforeUpdate` | 准备更新 |
| `updated` | `onUpdated` | 更新完成 |
| `beforeUnmount` | `onBeforeUnmount` | 卸载前 |
| `unmounted` | `onUnmounted` | 卸载完成 |
| `errorCaptured` | `onErrorCaptured` | 捕获后代组件错误 |
| `renderTracked` | `onRenderTracked` | 调试用 |
| `renderTriggered` | `onRenderTriggered` | 调试用 |
| `activated` | `onActivated` | keep-alive 缓存激活 |
| `deactivated` | `onDeactivated` | keep-alive 缓存失活 |

例子：
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  console.log('DOM 挂载好了，可以操作 DOM 了');
  // 比如绑定事件
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // 卸载清理事件
  window.removeEventListener('resize', handleResize);
});
</script>
```

**组合式里，beforeCreate 和 created 不用写了，代码直接写就行。**

## 7. 自定义 Hooks（组合式函数）

Composition API 最大好处就是把逻辑抽出来复用，比 mixin 清晰。

例子：封装鼠标位置：

```javascript
// hooks/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function handleMove(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMove);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMove);
  });

  return { x, y };
}
```

组件里用：

```vue
<script setup>
import { useMouse } from './hooks/useMouse.js';
const { x, y } = useMouse();
</script>

<template>
  <p>鼠标位置：{{ x }}, {{ y }}</p>
</template>
```

太干净了！逻辑抽出去，多个组件都能用。

再例子：封装定时器：

```javascript
// hooks/useInterval.js
import { onUnmounted } from 'vue';

export function useInterval(callback, delay) {
  const timer = setInterval(callback, delay);

  onUnmounted(() => {
    clearInterval(timer);
  });
}
```

用：
```javascript
useInterval(() => {
  count.value++;
}, 1000);
```

**最佳实践：**
- 命名：useXxx 开头，约定俗成
- 返回 ref，组件解构也能保持响应性（用 toRefs）
- 把相关逻辑聚在一起，一个 hook 做一件事

## 8. provide / inject 依赖注入

跨层级传数据，不用一级一级透传 props。

### 祖先组件 provide

```vue
<script setup>
import { provide, ref } from 'vue';

// provide(键, 值)
provide('theme', 'dark');

// 响应式数据也能传
const count = ref(0);
provide('count', count);

// 可以改，后代也能收到更新
</script>
```

### 后代组件 inject

```vue
<script setup>
import { inject } from 'vue';

// 注入，第二个参数默认值
const theme = inject('theme', 'light');
const count = inject('count');

console.log(theme); // dark
</script>
```

非常适合：全局主题、用户信息、路由参数、大项目跨组件传值，不用 vuex/pinia 也能搞定。

## 9. 常见高级用法

### 动态组件

根据变量切换不同组件：

```vue
<template>
  <component :is="currentComponent"></component>
</template>

<script setup>
import Home from './Home.vue';
import About from './About.vue';
import { ref } from 'vue';

const currentComponent = ref(Home);
// 点击切换
const switchToAbout = () => {
  currentComponent.value = About;
};
</script>
```

### keep-alive 缓存组件

缓存失活的组件，不会重新创建：

```vue
<template>
  <keep-alive>
    <component :is="currentView"></component>
  </keep-alive>
</template>
```

配合路由：
```vue
<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>
```

缓存后生命周期会触发 `onActivated` / `onDeactivated`。

### Teleport 传送组件

把组件内容渲染到指定 DOM 节点，比如 body：

```vue
<template>
  <button @click="open = true">打开弹框</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        弹框内容
      </div>
    </div>
  </Teleport>
</template>
```

解决了 z-index 层级问题，弹框真的在 body 根节点，不受父元素 overflow 影响。

## 总结

- 组件 props 父传子，defineProps 声明，emits 子传父 defineEmits 声明
- 插槽：默认、具名、作用域插槽，灵活定制内容
- 生命周期钩子从 vue 导入，onXxx 这样用
- 自定义 Hooks 抽逻辑复用，非常好用，useXxx 命名
- provide/inject 解决跨层级传值
- Teleport、keep-alive、动态组件都是常用高级技巧

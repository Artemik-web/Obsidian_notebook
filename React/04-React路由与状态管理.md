# React 路由与状态管理

## 一、React Router 路由

React 官方路由库，用于 SPA 单页应用路由。

### 安装

```bash
npm install react-router-dom
```

### 基本使用

```jsx
// App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 获取参数

```jsx
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <div>User id: {id}</div>;
}
```

### 导航

```jsx
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/about');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={goToAbout}>去关于</button>
      <button onClick={goBack}>返回</button>
    </div>
  );
}
```

### 嵌套路由

```jsx
<Route path="/user" element={<UserLayout />}>
  <Route index element={<UserList />} /> {/* 默认 index 路由 */}
  <Route path=":id" element={<UserDetail />} />
</Route>
```

### 路由懒加载

```jsx
// 打包分包，按需加载，首屏更快
const About = React.lazy(() => import('./pages/About'));

// 使用
<Suspense fallback={<div>加载中...</div>}>
  <Route path="/about" element={<About />} />
</Suspense>
```

## 二、Zustand 轻量状态管理（推荐现在用）

Zustand 是现在最受欢迎的 React 状态管理，轻量、简单、不用写很多模板代码。

### 安装

```bash
npm install zustand
```

### 基本使用

```js
// stores/counter.js
import { create } from 'zustand';

interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
}));

export default useCounterStore;
```

### 组件使用

```jsx
import useCounterStore from './stores/counter';

function Counter() {
  // 只取需要的，只在依赖变了才重新渲染
  const count = useCounterStore(state => state.count);
  const increase = useCounterStore(state => state.increase);

  return (
    <div>
      <p>{count}</p>
>      <button onClick={increase}>+1</button>
    </div>
  );
}
```

###  computed 自动合并

```js
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: { name: string } | null;
  isLogin: boolean;
  setUser: (user) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLogin: false,
        setUser: (user) => set({ user, isLogin: true }),
        logout: () => set({ user: null, isLogin: false }),
      }),
      {
        name: 'user-storage', // localStorage 存储key
      }
    )
  )
);
```

`devtools` 中间件支持 Redux DevTools 调试，`persist` 自动持久化到 localStorage，非常方便。

### 优点对比 Redux

- 代码量少很多，没有大量样板代码（actions/reducers/action-types 一堆文件）
- 默认就是局部更新，只有你订阅的 state 变了才重新渲染，性能好
- 不用 combine 一堆 reducer，简单直接
- 类型推断友好

**推荐现在新项目用 Zustand 代替 Redux**，简单够用。

## 三、Redux 传统状态管理

Redux 是老牌状态管理，适合大型项目，现在新项目比较少用了，但是老项目很多。

### 核心原则

1. **单一数据源**：整个应用 state 存在一个 store 里
2. **state 是只读的**：不能直接改，只能发 action 修改
3. **纯函数修改**：reducer 纯函数根据 action 计算新 state

### 基本使用

```bash
npm install @reduxjs/toolkit react-redux
```

```js
// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Immer 让你可以直接改 state，自动生成新 state
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

```js
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

```jsx
// entry
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```jsx
// 组件使用
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
```

## 总结

| 状态管理 | 适合场景 | 推荐度 |
|----------|----------|--------|
| Zustand | 中小项目，简单灵活 | ⭐⭐⭐⭐⭐ |
| Redux Toolkit | 大型项目需要时间旅行、调试工具 | ⭐⭐⭐⭐ |
| Context | 简单全局状态 | ⭐⭐⭐ |

现在推荐：**中小项目用 Zustand，大型项目用 Redux Toolkit**，不要老一套原始 Redux 了，RTK 已经简化很多。

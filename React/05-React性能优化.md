# React 性能优化

## 常用性能优化手段

### 1. 不要不必要重新渲染

#### React.memo 缓存组件

如果组件 props 没变，跳过重新渲染：

```jsx
const Component = React.memo(props => {
  // 组件
});
```

默认浅比较 props，也可以自定义比较函数：

```jsx
function areEqual(prevProps, nextProps) {
  // return true 相等 → 不渲染
  // return false 不等 → 重新渲染
  return prevProps.id === nextProps.id;
}

const Component = React.memo(Component, areEqual);
```

#### useMemo 缓存计算结果

```jsx
function Component({ a, b }) {
  // 只有依赖变了重新计算，缓存结果
  const result = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);

  return <div>{result}</div>;
}
```

不要乱用，只有计算真的很慢才用，不然反而浪费。

#### useCallback 缓存函数

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // 依赖不变，函数引用不变，子组件不用重新渲染
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <Child onClick={handleClick} />;
}
```

### 2. 拆分组件

- 把大组件拆成小组件，只更新变化的部分
- 把不变部分抽出去，变化了不会影响不变部分

### 3. 路由懒加载

```jsx
// 打包分包，按需加载，首屏加载更快
const About = React.lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}
```

### 4. 虚拟化长列表

如果几千上万条数据，不要全部渲染，只渲染可见区域：

推荐用库：
- [`react-window`](https://github.com/bvaughn/react-window) → 轻量推荐
- [`react-virtualized`](https://github.com/bvaughn/react-virtualized) → 功能全，更大

```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>row {index}</div>
);

function VirtualList() {
  return (
    <List
      height={500}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {Row}
    </List>
  );
}
```

### 5. 避免内联对象/函数

```jsx
// ❌ 不好：每次渲染都是新对象，导致 memo 失效
<Component style={{ width: 100 }} />

// ✅ 好：提出来
const style = { width: 100 };
<Component style={style} />
```

函数同理：
```jsx
// ❌ 每次都是新函数
<button onClick={() => { handleClick(id) }} />

// ✅ 用 useCallback 缓存
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<button onClick={handleClick} />
```

### 6. Context 拆分

Context 一变所有用 Consumer 都重新渲染，拆分多个 Context：

```jsx
// ❌ 不要一个大 Context 放所有状态
<AppContext.Provider value={state}>
  <App />
</AppContext.Provider>

// ✅ 拆分成多个
<ThemeContext.Provider value={theme}>
  <UserContext.Provider value={user}>
    <App />
  </UserContext.Provider>
</ThemeContext.Provider>
```

### 7. 使用 production build

开发环境打包文件大，慢，生产要打 production 包：

```bash
npm run build
```

### 8. 正确使用 key

列表渲染 key 尽量用唯一 id 不要 index：

```jsx
// ❌ 不好，增删顺序变了diff 不对
items.map((item, index) => <div key={index}>{item.name}</div>)

// ✅ 好
items.map(item => <div key={item.id}>{item.name}</div>)
```

### 9. 避免匿名函数在 render

```jsx
// ❌ 每次渲染都是新函数，导致 memo 失效
<button onClick={() => doSomething(id)} />

// ✅ 用 useCallback 或者直接把 id 绑上去
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

<button onClick={handleClick} />
```

### 10. 图片懒加载

```jsx
import lazyLoad from 'react-lazyload';

// 使用
<LazyLoad>
  <img src="..." alt="..." />
</LazyLoad>
```

浏览器原生也支持：
```html
<img src="..." loading="lazy" alt="..." />
```

### 11. SSR / 静态站点生成

- SSR：Next.js 服务端渲染，首屏更快，SEO 更好
- SSG：Gatsby / Next.js Static Export，生成静态HTML，访问更快

### 12. 使用 React DevTools 分析

- 用 Profiler 看哪个组件渲染慢
- 找出瓶颈再优化，不要提前优化

## 总结优化 checklist

✅ 路由懒加载
✅ 长列表虚拟滚动
✅ memo / useMemo / useCallback 缓存
✅ 拆分组件，只更新需要更新
✅ key 用 id 不用 index
✅ Context 拆分，避免大范围重渲染
✅ 图片懒加载
✅ 生产环境打包
✅ 分析性能找到瓶颈再优化

大部分项目做好这几点就够了。

---

## 相关笔记

- [[01-React基础]]
- [[02-ReactHooks]]
- [[03-组件通信]]
- [[04-React路由与状态管理]]
- ../Vue/[[08-Vue性能优化]]

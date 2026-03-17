# React Hooks

Hooks 是 React 16.8 新增，让你在函数组件里用状态和其他 React 特性。

## 常用基础 Hooks

### 1. useState

保存组件状态，状态改变自动重新渲染：

```jsx
import { useState } from 'react';

function Counter() {
  // [状态, 修改方法]
  const [count, setCount] = useState(0);

  // 惰性初始 state
  // 只会执行一次
  const [state, setState] = useState(() => {
    return { count: props.initialCount };
  });

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**注意：** 如果你修改对象/数组，需要新对象才能触发更新，不能直接改旧对象：

```jsx
// ❌ 错
state.obj.name = 'new name';
setState(state);

// ✅ 对
setState({
  ...state,
  obj: {
    ...state.obj,
    name: 'new name'
  }
});
```

### 2. useEffect

处理副作用：数据获取、订阅、手动修改 DOM...

```jsx
useEffect(() => {
  // 执行副作用
  document.title = `count: ${count}`;

  // 可选返回清理函数
  return () => {
    // 清理，比如清除定时器取消订阅
  };
}, [count]); // 依赖数组
```

依赖数组规则：
- 空数组 `[]` → 只执行一次（相当于 componentDidMount）
- 不写数组 → 每次渲染都执行
- 写上依赖 → 依赖变了才执行

### 3. useContext

获取上下文数据，跨组件传值不用一层层传 props：

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme }}>按钮</button>;
}
```

### 4. useReducer

复杂状态逻辑用 useReducer，类似 redux：

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}
```

适合状态逻辑复杂，包含多个子值，或者下一个 state 依赖之前的 state。

### 5. useCallback

缓存函数，防止每次渲染重新创建：

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // 依赖不变，缓存函数
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <Child onClick={handleClick} />;
}
```

给子组件传递回调，子组件可以用 memo 跳过不必要的渲染，优化性能。

### 6. useMemo

缓存计算结果：

```jsx
function MyComponent({ a, b }) {
  // 只有依赖变了才重新计算，缓存结果
  const memoizedValue = useMemo(() => {
    return computeExpensiveValue(a, b);
  }, [a, b]);

  return <div>{memoizedValue}</div>;
}
```

**不要乱用**：没性能问题不用加，反而增加开销。

### 7. useRef

保存可变引用，保存 DOM 节点：

```jsx
function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 拿到 DOM 节点
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

可以保存任何可变值，类似 class 实例字段：

```jsx
function Timer() {
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
}
```

**注意**：改 `ref.current` 不会触发重新渲染。

### 8. useImperativeHandle

自定义暴露给父组件的实例值，配合 forwardRef：

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});

// 父组件用
function Parent() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <FancyInput ref={inputRef} />;
}
```

## 自定义 Hook

把组件里面复用的状态逻辑抽出来自己写 Hook：

例子：写一个获取鼠标位置的 Hook：

```jsx
import { useState, useEffect } from 'react';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}

// 组件里用
function Mouse() {
  const { x, y } = useMousePosition();
  return (
    <div>
      {x}, {y}
    </div>
  );
}
```

**自定义 Hook 规则：**
- 名字必须用 `use` 开头，比如 `useXXX`
- 只能在组件最顶层调用，不能在循环条件里面调用
- 只能在 React 函数组件和自定义 Hook 里面调用

## Hooks 规则

✅ **只能在最顶层调用 Hooks**，不能在循环、条件、嵌套函数里面调用。

✅ **只能在 React 函数组件和自定义 Hook 里面调用 Hooks**。

## 常用自定义 Hook 推荐

- [ahooks](https://ahooks.js.org/) - 阿里开源，一大堆常用 Hook 直接用
- [react-use](https://github.com/streamich/react-use) - 社区维护，也是超多有用 Hook

直接装了用就行不用自己写。

## 总结

- Hooks 让你不用写 class 就能用状态和其他 React 特性
- 基础：`useState` `useEffect` `useContext` `useReducer` `useRef`
- 优化：`useCallback` `useMemo`
- 抽逻辑：自定义 Hook，复用状态逻辑比 mixin 高阶组件清晰多了
- 遵守规则：只在顶层调用，use 开头命名

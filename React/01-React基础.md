# React 基础

## 1. React 是什么

React 是一个用于构建用户界面的 **JavaScript 库**，由 Facebook 开发维护。

- **组件化**：把页面拆成多个组件，复用、维护方便
- **声明式**：你只需要说想要什么效果，DOM 怎么更你不用管
- **虚拟 DOM**：React 在内存里维护一棵 DOM 树，diff 算法最小化 DOM 操作，性能好
- **一次学习，随处编写**：可以写 web、React Native 写 App、SSR、静态站点生成

## 2. 创建 React 项目

### Vite 创建（推荐）

```bash
# npm
npm create vite@latest my-react-app -- --template react

# yarn
yarn create vite my-react-app --template react

# pnpm
pnpm create vite my-react-app --template react

cd my-react-app
npm install
npm run dev
```

### Create React App（官方旧工具）

```bash
npx create-react-app my-app
cd my-app
npm start
```

## 3. JSX 语法

JSX 是 JavaScript 的语法扩展，在 JS 里面写 HTML 结构：

```jsx
const name = 'zhangsan';
const element = <h1>Hello, {name}</h1>;

// 嵌入表达式
const sum = <p>{1 + 2}</p>;

// 属性
const img = <img src={imageUrl} alt="photo" />;

// 条件渲染
const content = isLoggedIn ? <UserPanel /> : <LoginButton />;

// 列表渲染
const list = items.map(item => (
  <li key={item.id}>{item.name}</li>
));

// 片段，不需要额外父标签
const fragments = (
  <>
    <td>1</td>
    <td>2</td>
  </>
);
```

**JSX 本质**：不是模板，最终编译成 `React.createElement` 调用，返回 JS 对象描述 DOM。

```jsx
// 你写：
<h1 className="title">Hello</h1>

// 编译成：
React.createElement('h1', { className: 'title' }, 'Hello');
```

## 4. 组件

### 函数组件（推荐，现在都用这个）

```jsx
// 接收 props 返回 React 元素
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// ES6 箭头函数
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// 使用
<Welcome name="zhangsan" />
```

### 类组件（老写法，现在新项目很少用）

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 5. Props

父组件给子组件传数据：

```jsx
// 父组件
function App() {
  return <Child name="zhangsan" age={18} />;
}

// 子组件
function Child(props) {
  // props 只读，不能改
  return (
    <div>
      <p>name: {props.name}</p>
      <p>age: {props.age}</p>
    </div>
  );
}

// 解构默认值
function Child({ name = '默认', age = 0 }) {
  // ...
}
```

**Props** 是单向数据流：父改子跟着变，子不能改父的 props。

## 6. State & 生命周期（函数组件）

用 `useState` 保存组件状态，状态变了自动重新渲染：

```jsx
import { useState } from 'react';

function Counter() {
  // [状态, 设置状态的方法]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击加一
      </button>
    </div>
  );
}
```

### useEffect 处理副作用

给函数组件增加执行副作用的能力：获取数据、订阅事件、操作 DOM...

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 每次渲染都执行
  useEffect(() => {
    document.title = `点击了 ${count} 次`;
  });

  // 只执行一次（类似 componentDidMount）
  useEffect(() => {
    // 相当于 didMount
    fetchData();
  }, []);

  // count 变了才执行
  useEffect(() => {
    console.log('count 变了: ', count);
  }, [count]);

  // 清理副作用（componentWillUnmount）
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => {
      // 组件卸载清理定时器
      clearInterval(timer);
    };
  }, []);
}
```

**依赖数组规则：**
- 省略：每次渲染都执行
- 空数组 `[]`：只执行一次
- 有依赖：依赖变了就执行

## 7. 事件处理

```jsx
function handleClick(e) {
  // e 是合成事件对象，兼容所有浏览器
  console.log('点击', e.target);
  e.preventDefault();
}

<button onClick={handleClick}>点击</button>
```

**注意**：事件绑定命名驼峰：`onClick` 不是 `onclick`。

不能通过返回 `false` 阻止默认行为，必须调用 `e.preventDefault()`。

## 8. 条件渲染

```jsx
// 方法一：if else
let content;
if (isLoggedIn) {
  content = <UserPanel />;
} else {
  content = <GuestPanel />;
}
return <div>{content}</div>;

// 方法二：三元表达式
return (
  <div>
    {isLoggedIn ? <UserPanel /> : <GuestPanel />}
  </div>
);

// 方法三：与运算
return (
  <div>
    {unreadMessages.length > 0 && (
      <h2>你有 {unreadMessages.length} 条未读</h2>

}
    }
  </div>
);

// 方法四：null 不渲染
return (
  <div>
    {shouldRender && <Component />}
  </div>
);
```

## 9. 列表渲染

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => (
  <li key={number.toString()}>{number}</li>
));

return <ul>{listItems}</ul>;
```

**key 要点**：
- key 要唯一，尽量用数据 id 不要用 index
- key 帮助 React 识别哪些元素变了，提高 diff 性能

## 10. 组件组合

### .children 插槽

```jsx
function Card(props) {
  return (
    <div className="card">
      {/* 父组件传进来的内容放在这 */}
      {props.children}
    </div>
  );
}

// 使用
<Card>
  <h1>标题</h1>
  <p>内容</p>
</Card>
```

### Containment （包含）
### Specialization （特殊化）

就是把通用抽出来，特殊的传进去，复用逻辑。

## 总结

React 核心：
- JSX 在 JS 里面写 UI
- 组件化，props 传数据，state 保存状态
- useEffect 处理副作用
- 状态变了，组件自动重新渲染
- diff 算法最小化 DOM 操作，性能好

---

## 相关笔记

- [[02-ReactHooks]]
- [[03-组件通信]]
- [[04-React路由与状态管理]]
- [[05-React性能优化]]
- ../工程化/[[Vite与Webpack对比]]

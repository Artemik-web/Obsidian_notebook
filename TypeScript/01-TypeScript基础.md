# TypeScript 基础

TypeScript 是 JavaScript 的超集，给 JS 添加了类型系统，编译后转成 JS 运行。

优点：
- 类型检查，提前发现错误
- 更好的 IDE 提示，重构更安全
- 代码就是文档，可读性更好

## 1. 基础类型

### 原始类型

```typescript
// 布尔
let isDone: boolean = false;

// 数字
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串
let color: string = "blue";
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

// 空值
let u: undefined = undefined;
let n: null = null;

// 符号
const sym: symbol = Symbol("key");
```

**默认情况下 `null` 和 `undefined` 是所有类型的子类型，可以赋值给任何类型。**
如果开启 `--strictNullChecks`，就只能赋值给 `null` 和 `undefined` 自己了，更安全。

### 数组

```typescript
// 写法一：类型[]
let list: number[] = [1, 2, 3];

// 写法二：Array<类型>
let list: Array<number> = [1, 2, 3];

// 只读数组
let arr: readonly number[] = [1, 2, 3];
arr[0] = 4; // 错误，不能改
```

### 元组 Tuple

元组就是固定长度、每个元素类型可以不同的数组：

```typescript
// 第一个元素 string，第二个 number
let x: [string, number] = ["hello", 10];

x[0].substring(1); // OK
x[1].toString();   // OK

// 越界访问，如果越界会报错
console.log(x[2]); // 错误
```

### void

表示没有返回值的函数：

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

### any

任意类型，绕过类型检查，和 JS 一样：

```typescript
let x: any = 1;
x = "hello";
x = [1, 2, 3];
x.myMethod(); // 不报错，不管有没有
```

**不推荐随便用 any，不然失去了类型检查意义。**

### never

永远不会发生的值的类型，比如函数永远不返回（抛出错误、死循环）：

```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
  }
}
```

### unknown

未知类型，比 any 安全，任何值都可以赋给 unknown，但是不能随便用 unknown 上的属性：

```typescript
let v: unknown = 123;
v.toFixed(); // 错误，不知道有没有这个方法

// 要先缩小类型
if (typeof v === 'number') {
  v.toFixed(); // OK 现在可以了
}
```

推荐用 unknown 代替 any，更安全。

### object

表示非原始类型，就是不是 number string boolean symbol null undefined：

```typescript
let obj: object = { name: "zhangsan" };
```

## 2. 类型断言

有时候你比 TS 更清楚类型，可以告诉 TS 这个变量就是某个类型：

```typescript
// 尖括号写法（tsx 里不能用）
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 写法（推荐，哪里都能用）
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

**类型断言只是编译阶段告诉你，不会改变运行时类型。**

## 3. 类型推断

TS 会自动推断类型，不用每个都写：

```typescript
// 自动推断 a 是 number
let a = 123;

// 自动返回 number 类型
function add(a: number, b: number) {
  return a + b;
}
```

最好是能推断就让 TS 推断，少写点代码。

## 4. 联合类型

一个变量可以是几种类型中的一种：

```typescript
let value: string | number;
value = "hello"; // OK
value = 123; // OK

// 使用联合，要缩小范围才能用对应方法
function getLength(x: string | number): number {
  if (typeof x === 'string') {
    return x.length; // OK 这里知道是 string
  } else {
    return x.toString().length;
  }
}
```

## 5. 类型守卫

帮 TS 缩小类型范围：

```typescript
function isString(x: string | number): x is string {
  return typeof x === 'string';
}

if (isString(value)) {
  // TS 知道这里 value 是 string
  console.log(value.length);
}
```

常用：`typeof`、`instanceof`、自定义类型守卫。

## 6. 类型别名 type

给类型起别名：

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

type Point = {
  x: number;
  y: number;
};

// 可以定义泛型
type Container<T> = { value: T };
```

## 7. 接口 interface

描述对象形状：

```typescript
interface Person {
  name: string;
  age?: number; // 可选属性，不一定有
  readonly id: number; // 只读，不能改
  [propName: string]: any; // 任意属性，随便加其他属性
}

let p: Person = {
  name: "zhangsan",
  id: 1
};
```

接口可以继承：

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}
```

接口也可以描述函数类型：

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(src, sub) {
  return src.includes(sub);
};
```

## 8. 接口 vs 类型别名

|  | interface | type |
|------|-----------|------|
| 继承 | 可以 extends | 可以用交叉 `&` |
| 合并 | 同名自动合并 | 不能同名重复声明 |
| 可以 implements | ✅ | ✅ |
| 可以描述原始类型、联合、元组 | ❌ 可以用type | ✅ |
| 可以泛型 | ✅ | ✅ |

**经验：** 描述对象用 interface，其他用 type。

## 9. 函数

### 函数类型

```typescript
function add(x: number, y: number): number {
  return x + y;
}

// 表达式
let myAdd = function(x: number, y: number): number {
  return x + y;
};

// 完整类型
let myAdd: (x: number, y: number) => number = function(x, y) {
  return x + y;
};
```

### 参数默认值

```typescript
function add(x: number, y: number = 0): number {
  return x + y;
}

add(10); // y = 0
```

### 可选参数

```typescript
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
```

**可选参数必须放在最后。**

### 剩余参数

```typescript
function sum(...items: number[]): number {
  return items.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3); // 6
```

### this 类型

```typescript
interface Deck {
  cards: number[];
  createCardPicker(this: Deck): () => number;
}

// 指定 this 类型，TS 会检查
```

### 重载

同一个函数根据不同参数不同返回类型：

```typescript
function pick(x: number): number;
function pick(x: string): string;
function pick(x: number | string): number | string {
  if (typeof x === 'number') {
    return x;
  } else {
    return x;
  }
}
```

## 10. 类型断言非空断言操作符 `!`

告诉你 TS 这个值肯定不是 null undefined：

```typescript
function foo(name?: string) {
  console.log(name!.length); // 我保证 name 一定有
}
```

## 总结

基础要点：
- 原始类型：boolean number string null undefined symbol
- 数组、元组、any unknown never
- 接口描述对象，type 别名
- 联合类型，类型守卫缩小范围
- 函数参数类型、返回值类型，默认参数、可选参数、剩余参数

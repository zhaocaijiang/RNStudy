# TypeScript 介绍与使用指南

## 一、TypeScript 是什么

TypeScript（简称 TS）是微软开发的 JavaScript 超集，在 JS 的基础上添加了**静态类型系统**。所有合法的 JS 代码都是合法的 TS 代码，TS 编译后输出的就是纯 JS。

**核心价值：**
- 编译期发现错误，而不是运行时崩溃
- IDE 智能提示和自动补全大幅提升开发效率
- 代码即文档，类型定义就是最好的接口说明

---

## 二、基础类型

### 2.1 原始类型

```ts
let isDone: boolean = false;
let count: number = 10;
let name: string = 'hello';
let empty: null = null;
let notAssigned: undefined = undefined;
```

### 2.2 数组

```ts
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ['a', 'b', 'c'];
```

### 2.3 元组（Tuple）

固定长度和类型的数组：

```ts
let tuple: [string, number] = ['age', 25];
```

### 2.4 枚举（Enum）

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

let dir: Direction = Direction.Up;
```

### 2.5 any / unknown / void / never

```ts
let anything: any = 4;           // 放弃类型检查，尽量避免使用，更多是为了兼容旧项目的时候使用
let safe: unknown = 4;           // 安全版 any，使用前必须收窄类型（即通过 typeof、instanceof 等条件判断，让 TS 在该分支内把类型从宽泛的 unknown 缩小为具体的 number、string 等，从而安全地使用该类型的属性和方法）
function log(msg: string): void { /* 无返回值 */ }
function throwError(): never { throw new Error('boom'); } // 永远不会有返回值
```

---

## 三、接口（Interface）与类型别名（Type）

### 3.1 Interface

```ts
interface User {
  id: number;
  name: string;
  avatar?: string;       // 可选属性
  readonly createdAt: string; // 只读属性
}
```

### 3.2 Type

```ts
type Status = 'pending' | 'success' | 'error'; // 联合类型

type UserWithRole = User & {
  role: 'admin' | 'user'; // 交叉类型，扩展 User
};
```

### 3.3 interface 和 type 的区别

| 特性 | interface | type |
|------|-----------|------|
| 对象形状 | 支持 | 支持 |
| 联合类型 | 不支持 | `'a' \| 'b'` |
| 基本类型别名 | 不支持 | `type ID = string` |
| 声明合并 | 支持同名自动合并 | 同名报错 |
| extends / implements | 支持 | 通过交叉类型 `&` 模拟 |
| 计算属性 | 不支持 | 支持 `[K in keyof T]` |

#### 声明合并（interface 独有）

```ts
interface Window {
  myCustomProp: string;
}
// 同名 interface 会自动合并，不会报错
interface Window {
  anotherProp: number;
}
// 结果：Window 同时拥有 myCustomProp 和 anotherProp
// 这在扩展第三方库类型时非常有用（如 .d.ts 扩展）
```

#### type 能做而 interface 做不到的

```ts
// 联合类型
type Status = 'pending' | 'success' | 'error';

// 基本类型别名
type ID = string | number;

// 映射类型（计算属性）
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// 条件类型
type IsString<T> = T extends string ? true : false;
```

#### 两者都能做的

```ts
// 描述对象 —— 以下两种写法等价
interface User {
  name: string;
  age: number;
}

type User = {
  name: string;
  age: number;
};

// 扩展
interface Admin extends User {
  role: string;
}

type Admin = User & { role: string };
```

**总结：** 80% 的场景两者都能用。`interface` 适合定义公开 API / 对象形状（声明合并是杀手级特性），`type` 适合联合类型、映射类型等高级用法。

---

## 四、函数类型

```ts
// 参数类型 + 返回值类型
function add(a: number, b: number): number {
  return a + b;
}

// 可选参数 & 默认值
function greet(name: string, greeting = 'hello'): string {
  return `${greeting}, ${name}`;
}

// 函数类型表达式
type Callback = (data: Result) => void;
```

---

## 五、泛型（Generics）

泛型就是**类型的参数**——你传什么类型进去，函数就按什么类型来检查。相当于给类型"占个位"，调用时再确定具体是什么类型。

打个比方：泛型就像快递柜，你不在乎里面放的是书还是衣服，你只关心"放进去什么，拿出来还是什么"。

```ts
// T 是一个类型占位符，调用时才确定具体类型
function identity<T>(value: T): T {
  return value;
}

identity<string>('hi');  // T = string，返回值也是 string
identity(42);            // TS 自动推断 T = number

// 泛型约束：限制 T 必须有 length 属性
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

getLength('abc');   // OK —— 字符串有 length
getLength([1, 2]);  // OK —— 数组有 length
```

---

## 六、工具类型（Utility Types）

TS 内置了大量实用类型转换工具：

```ts
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// Partial —— 所有属性变可选
type PartialUser = Partial<User>;

// Required —— 所有属性变必填
type RequiredUser = Required<User>;

// Pick —— 只取部分属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit —— 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>;

// Record —— 构造键值对类型
type PageInfo = Record<string, { title: string; url: string }>;
```

---

## 七、类型守卫（Type Guards）

在条件分支中**收窄类型**：
（收窄类型就是通过 typeof、instanceof 等条件判断，让 TS 在该分支内把类型从宽泛的 unknown 缩小为具体的 number、string
  等，从而安全地使用对应类型的属性和方法）

```ts
// typeof
function pad(value: string | number) {
  if (typeof value === 'string') {
    return value; // 这里 TS 知道 value 是 string
  }
  return value.toFixed(2); // 这里 TS 知道 value 是 number
}

// instanceof
if (error instanceof NetworkError) { /* ... */ }

// in 操作符
if ('code' in error) { error.code; }

// 自定义类型谓词
function isUser(val: any): val is User {
  return val && typeof val.name === 'string';
}
```

---

## 八、在本项目中的应用

本项目是 React Native + dva + react-navigation 技术栈，以下是 TS 在各层的使用方式。

### 8.1 定义 dva Model（参考 `src/models/home.ts`）

```ts
import { Effect, Model } from 'dva-core-ts';
import { Reducer } from 'redux';

// 1. 定义 State 类型
export interface HomeState {
  num: number;
}

// 2. 定义 Model 类型（继承 dva-core-ts 的 Model）
interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    add: Reducer<HomeState>;
  };
  effects?: {
    asyncAdd: Effect;
  };
}

// 3. 实现 Model
const homeModel: HomeModel = {
  namespace: 'home',
  state: { num: 0 },
  reducers: {
    add(state = { num: 0 }, { payload }) {
      return { ...state, num: state.num + payload.num };
    },
  },
  effects: {
    *asyncAdd({ payload }, { call, put }) {
      yield call(() => new Promise(r => setTimeout(r, 2000)));
      yield put({ type: 'add', payload });
    },
  },
};
export default homeModel;
```

### 8.2 组件 Props 类型（参考 `src/pages/Home.tsx`）

```tsx
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models';

// 1. 用 connect 推断出 mapState 的返回类型
const connector = connect(({ home, loading }: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
}));

// 2. 自动推导出 Redux 注入的 props
type ModelState = ConnectedProps<typeof connector>;

// 3. 合并导航 props
type Props = ModelState & {
  navigation: RootStackNavigation;
};

// 4. 函数组件
function Home({ navigation, num, dispatch, loading }: Props): React.JSX.Element {
  // ...
}
```

### 8.3 导航路由类型

```ts
// 定义所有路由名和参数
type RootStackParamList = {
  Home: undefined;
  Details: { message: string };
};

// 导航器的 props 类型
type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;
```

### 8.4 tsconfig.json 路径别名（已配置）

本项目的 `tsconfig.json` 已配置路径别名，避免 `../../../` 式导入：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":           ["src/*"],
      "@components/*": ["src/components/*"],
      "@screens/*":    ["src/screens/*"],
      "@hooks/*":      ["src/hooks/*"],
      "@utils/*":      ["src/utils/*"],
      "@assets/*":     ["src/assets/*"],
      "@store/*":      ["src/store/*"],
      "@services/*":   ["src/services/*"],
      "@types/*":      ["src/types/*"]
    }
  }
}
```

使用时：

```ts
import { RootStackNavigation } from '@/navigation/AppNavigator';
import { RootState } from '@/models';
import avatar from '@assets/images/avatar.png';
```

---

## 九、常见技巧与最佳实践

### 9.1 善用类型推断，不必处处标注

```ts
// 冗余 —— TS 自动推断返回 number
function double(n: number): number { return n * 2; }

// 简洁
function double(n: number) { return n * 2; }
```

只在以下场景手动标注：
- 函数参数
- 变量类型无法被推断（如复杂对象字面量、泛型场景）
- 显式的返回值类型（大型函数、库的公共 API）

### 9.2 避免滥用 any

```ts
// 差
function process(data: any) { data.foo(); }

// 好 —— 用 unknown 收窄
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'foo' in data) {
    (data as { foo: () => void }).foo();
  }
}
```

### 9.3 善用 `as const` 定义常量

```ts
const ROLES = ['admin', 'user', 'guest'] as const;
type Role = typeof ROLES[number]; // 'admin' | 'user' | 'guest'
```

### 9.4 可辨识联合（Discriminated Unions）

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function handle(state: AsyncState<User>) {
  switch (state.status) {
    case 'success': state.data;    // TS 自动知道有 data
    case 'error':   state.error;   // TS 自动知道有 error
  }
}
```

---

## 十、从 JS 迁移到 TS 的建议

1. **允许 `.js` 和 `.ts` 共存** — TS 编译器可直接处理 JS 文件，逐步迁移
2. **新文件一律用 `.tsx`** — React 组件用 `.tsx`，纯逻辑用 `.ts`
3. **先加类型声明，再改实现** — 对现有模块添加 `interface` / `type`，不改运行逻辑
4. **开启严格模式** — 在 `tsconfig.json` 中启用 `"strict": true` 获得完整类型保护
5. **安装 @types 包** — 第三方库的类型定义，如 `@types/react`、`@types/react-redux`

---

## 参考资料

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive（中文）](https://jkchao.github.io/typescript-book-chinese/)

# Dva 状态管理使用说明

## Redux 与 Dva 简介

**Redux** 是 JavaScript 应用的状态管理库，核心思想是单向数据流：

```
View → dispatch(Action) → Reducer → 新 State → View 更新
```

它由三部分组成：
- **Store**：全局唯一的状态容器
- **Reducer**：纯函数，接收 Action 和旧 State，返回新 State（同步）
- **Action**：描述状态变更的普通对象

Redux 本身只处理同步逻辑，异步操作需要借助中间件（如 redux-thunk、redux-saga）。

**Dva** 是基于 Redux 的轻量级框架，将 Redux + Redux-Saga + React-Router 整合为一体。其核心改进是 **Model** 概念——将 state、reducer、effect 封装到同一个对象中，按模块组织代码，避免 Redux 原生的分散文件结构。

> 本项目使用 `dva-core-ts`（仅包含 dva 的核心部分，不含路由），配合 `react-redux` 连接 React Native 组件。

## Model 核心概念

| 概念 | 说明 |
|------|------|
| `namespace` | 模块命名空间，全局唯一，dispatch 时通过 `namespace/action` 定位 |
| `state` | 模块的初始状态 |
| `reducers` | **同步**操作，接收 payload 返回新 state |
| `effects` | **异步**操作，使用 generator 函数，`call` 调用异步逻辑，`put` 触发 reducer |

## 项目中的使用步骤

### 1. 安装依赖

```bash
npm install dva-core-ts dva-loading-ts react-redux@8
```

> `react-redux` 需用 v8，因 `dva-core-ts` 依赖 `redux@4.x`，与 `react-redux@9` 冲突。

### 2. 创建 Dva 实例 (`src/config/dva.js`)

- `create()` 创建实例
- `app.use(createLoading())` 注册 loading 插件
- `app.model()` 注册各模块 model
- `app.start()` 启动后导出 `app._store`

### 3. 挂载 Store (`App.tsx`)

用 `react-redux` 的 `<Provider store={store}>` 包裹根组件。

### 4. 定义 Model (`src/models/home.ts`)

每个 Model 包含 `namespace`、`state`、`reducers`（同步）、`effects`（异步 generator）。

### 5. 统一注册与类型导出 (`src/models/index.ts`)

汇总所有 model 并导出 `RootState` 类型，供组件 TypeScript 类型推导使用。

### 6. 组件中使用

- `connect()` 将 state 映射为 props
- `ConnectedProps<typeof connector>` 推导出 props 类型
- `dispatch({type: 'namespace/action', payload})` 触发同步/异步操作
- 用 `connector(Component)` 包裹组件导出

### dva-loading 插件

`dva-loading-ts` 自动追踪所有 effect 的执行状态：`loading.effects['home/asyncAdd']` 返回 `boolean`。

## 文件结构

```
src/
├── config/dva.js        # dva 实例，导出 store
├── models/
│   ├── index.ts         # 注册 model，导出 RootState 类型
│   └── home.ts          # home 模块 model
├── pages/Home.tsx       # connect 连接 store 的组件
└── App.tsx              # Provider 挂载 store
```

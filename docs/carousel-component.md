# Carousel 轮播图组件

基于 `FlatList` 实现的轻量轮播图组件，替换了已停止维护的 `react-native-snap-carousel`。

## 文件位置

- 组件：`src/pages/Home/Carousel.tsx`
- 调用处：`src/pages/Home/index.tsx`

## 功能特性

| 功能 | 说明 |
|------|------|
| 单页展示 | 屏幕同时只显示一张图片，左右滑动整页切换 |
| 自动播放 | 默认开启，3秒间隔自动轮播 |
| 手势控制 | 手指拖拽时暂停自动播放，松手后恢复 |
| 指示器 | 底部圆点指示当前页，激活态为橙色放大圆点 |

## API

### Props

```typescript
interface CarouselProps {
  data: string[];           // 图片 URL 数组（必填）
  autoPlay?: boolean;       // 是否自动播放，默认 true
  autoPlayInterval?: number; // 自动播放间隔(ms)，默认 3000
}
```

### 使用示例

```tsx
import Carousel from './Carousel';

<Carousel
  data={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ]}
/>
```

关闭自动播放：

```tsx
<Carousel data={urls} autoPlay={false} />
```

自定义间隔为 5 秒：

```tsx
<Carousel data={urls} autoPlayInterval={5000} />
```

## 实现细节

### 整页翻页

```
SCREEN_WIDTH = 屏幕宽度
ITEM_WIDTH  = SCREEN_WIDTH  （每项占满整屏）
```

FlatList 配置：

```tsx
<FlatList
  horizontal
  pagingEnabled          // 系统级分页，每次滑动精确一屏
  getItemLayout={...}    // 声明固定尺寸，跳过异步测量，scrollToIndex 无需 extraData
/>
```

### 自动播放机制

```
用户拖拽 ──→ stopAutoPlay() ──→ 清除定时器
                                    │
手指松开 ──→ onMomentumScrollEnd ──→ startAutoPlay() ──→ 启动新定时器
```

- 组件挂载时启动定时器
- 组件卸载时清理定时器，防止内存泄漏
- 单张图片时不启动自动播放

### 指示器同步

通过 `useState(activeIndex)` 驱动圆点高亮，两个来源更新 state：

1. **`onViewableItemsChanged`** — FlatList 检测可见项变化时触发，覆盖自动播放和手动滑动的场景
2. **`onMomentumScrollEnd`** — 滑动结束后根据 `contentOffset.x / ITEM_WIDTH` 计算，作为兜底确保精度

### 样式尺寸

| 属性 | 值 | 说明 |
|------|------|------|
| 图片宽度 | `wp(94)` | 屏幕宽度的 94%，两侧留白 |
| 图片高度 | `wp(45)` | 屏幕宽��的 45% |
| 圆点默认 | 8×8 灰色 | `#ccc` |
| 圆点激活 | 10×10 橙色 | `#f86442` |
| 组件总高 | `wp(45) + 24` | 图片高度 + 圆点区域 |

## FlatList 组件介绍

`FlatList` 是 React Native 官方提供的高性能列表组件，用于渲染长列表数据。

### 核心特性

| 特性 | 说明 |
|------|------|
| 虚拟化渲染 | 只渲染可见区域的项，未显示的项会被卸载，节省内存 |
| 跨平台 | iOS 和 Android 统一 API，底层分别使用 ScrollView 和 RecyclerView |
| 高性能 | 支持懒加载、分页加载、下拉刷新等优化 |
| 灵活布局 | 支持水平/垂直滚动、多列布局、自定义分隔线 |

### 轮播图中的关键配置

```tsx
<FlatList
  data={data}                    // 数据源数组
  horizontal                     // 水平滚动
  pagingEnabled                  // 启用分页效果，每次滑动一屏
  showsHorizontalScrollIndicator={false}  // 隐藏滚动条
  keyExtractor={(item, index) => index.toString()}  // 唯一 key
  renderItem={({ item }) => <Image source={{ uri: item }} />}  // 渲染每一项
  
  // 性能优化
  getItemLayout={(data, index) => ({
    length: ITEM_WIDTH,          // 每项宽度
    offset: ITEM_WIDTH * index,  // 偏移量
    index,
  })}
  
  // 滚动事件
  onScrollBeginDrag={handleDragStart}      // 开始拖拽
  onMomentumScrollEnd={handleScrollEnd}    // 滚动结束
  onViewableItemsChanged={handleViewChange} // 可见项变化
/>
```

### 为什么选择 FlatList

1. **官方维护**：React Native 核心组件，长期支持
2. **零依赖**：无需安装第三方库
3. **性能优越**：虚拟化渲染，适合大数据量
4. **API 稳定**：不会出现废弃警告

### 与 ScrollView 的区别

| 对比项 | FlatList | ScrollView |
|--------|----------|------------|
| 渲染方式 | 虚拟化，按需渲染 | 一次性渲染所有子组件 |
| 适用场景 | 长列表、动态数据 | 少量固定内容 |
| 内存占用 | 低（只渲染可见项） | 高（渲染全部） |
| 性能 | 高 | 数据量大时性能差 |

## 替换背景

原 `react-native-snap-carousel@3.9.1`（2020 年停更）内部从 `react-native` 导入 `ViewPropTypes`，在 RN 0.73+ 中触发废弃警告。本组件用原生 `FlatList` 替代，零第三方依赖。

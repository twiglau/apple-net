# use(Context) vs useContext(Context)

## 功能

`use(TabStoreContext)` 与 `useContext(TabStoreContext)` 功能上几乎等价，都是从 Context 中读取值。

## 区别

| 特性 | `useContext(ctx)` | `use(ctx)` |
| --- | --- | --- |
| React 版本 | 所有版本 | React 19+ |
| 调用位置 | 只能在组件/Hook 顶层 | 可以在条件语句、循环内调用 |
| 支持的参数 | 只接受 Context | 接受 Context 和 Promise |

## 关键区别：use() 不受 Hook 规则限制

```tsx
// useContext 不能这样写
function Component({ showTab }: { showTab: boolean }) {
  if (showTab) {
    const store = useContext(TabStoreContext); // 违反 Hook 规则
  }
}

// use 可以这样写
function Component({ showTab }: { showTab: boolean }) {
  if (showTab) {
    const store = use(TabStoreContext); // 合法
  }
}
```

## 在 context-store.tsx 中的用法

```tsx
export const useTabStore = <T,>(selector: (state: TabState) => T) => {
  const store = use(TabStoreContext); // 读取 Context 中的 StoreApi
  if (!store) {
    throw new Error("...");
  }
  return useStore(store, selector); // 用 zustand 的 useStore 订阅状态
};
```

这里用 `use` 替代 `useContext` 主要是风格上更现代。两者在此场景下行为一致，因为调用位置是顶层。但 `use()` 作为 React 19 的统一数据读取 API，未来会成为推荐写法。

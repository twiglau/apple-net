# Zustand 使用 Immer 中间件注意点

## 1. create 需要柯里化写法

使用中间件时，`create` 必须多加一个 `()` 才能让 TypeScript 正确推断中间件类型链。

```ts
// ❌ 错误：直接传入 immer，类型不匹配
const useStore = create<State>(
  immer((set) => ({ ... }))
);

// ✅ 正确：柯里化写法
const useStore = create<State>()(
  immer((set) => ({ ... }))
);
```

## 2. set 回调中直接修改 draft，不要返回新对象

Immer 的核心理念是直接修改 draft state。如果在 `set` 回调中 `return` 一个新对象，immer 会将其视为**整个 state 的替换**，导致 store 上的方法（`addToCart`、`getTotalItems` 等）全部丢失。

```ts
// ❌ 错误：返回新对象（原始不可变写法）
set((state) => ({
  items: state.items.filter((item) => item.id !== productId),
}));

// ✅ 正确：直接修改 draft
set((state) => {
  state.items = state.items.filter((item) => item.id !== productId);
});
```

### 更多示例

```ts
// ❌ 错误
set((state) => ({
  items: state.items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  ),
}));

// ✅ 正确
set((state) => {
  const item = state.items.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
  }
});
```

## 3. 重置 state 时也不能直接替换

```ts
// ❌ 错误：整个 state 被替换，方法丢失
clearCart: () => {
  set(store.getInitialState());
},

// ✅ 正确：修改 draft 中的数据字段
clearCart: () => {
  set((state) => {
    state.items = [];
  });
},
```

## 总结

| 要点 | 说明 |
| --- | --- |
| 柯里化 `create()()` | 使用中间件时必须加 `()` |
| 不要 return 新对象 | 直接修改 draft，否则方法丢失 |
| 不要用对象替换 state | `set(newObj)` 会覆盖整个 state |

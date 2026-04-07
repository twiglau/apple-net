# useShallow 浅比较选择器

## 问题背景

```ts
// 不用 useShallow
const ids = useListStore(state => state.ids);
```

`state.ids` 是一个数组。zustand 默认用 `===`（严格相等）判断状态是否变化。当使用 immer 时，即使只修改了某个 item 的 `text` 或 `selected`，immer 会生成新的 state 对象，但 `ids` 数组内容没变，引用却可能变了，导致组件不必要的重新渲染。

## useShallow 的作用

```ts
// 用 useShallow
const ids = useListStore(useShallow(state => state.ids));
```

`useShallow` 把默认的 `===` 比较换成浅比较：逐项对比数组元素（或对象的每个 key），只有内容真正变了才触发重新渲染。

```ts
// 内部比较逻辑大致等价于：
const prev = ['a', 'b', 'c'];
const next = ['a', 'b', 'c'];

prev === next;             // false — 引用不同，默认会触发渲染
shallowEqual(prev, next);  // true — 内容相同，useShallow 阻止渲染
```

## 在列表场景中的效果

| 操作 | 不用 useShallow | 用 useShallow |
| --- | --- | --- |
| 修改某项的 `text`/`selected` | 列表容器重新渲染 | 不重新渲染 |
| 新增/删除项（ids 变化） | 重新渲染 | 重新渲染 |

只有 ids 数组的长度或内容变了，列表容器才重新渲染；修改单个 item 的属性不会触发列表容器渲染。

## React.memo 自定义比较

```ts
export const ListItem = React.memo(
  ListItemBase,
  (prev, next) => prev.id === next.id
);
```

- 比较函数返回 `true` → props 没变 → 跳过重新渲染
- 比较函数返回 `false` → props 变了 → 重新渲染

组件内部通过 zustand selector 自己订阅数据：

```ts
const item = useListStore(state => state.entities[id]);
```

数据变化时是 zustand 内部触发更新，不依赖父组件传 props。`React.memo` 的作用是：当父组件（列表）重新渲染时，阻止子项不必要的重新渲染。

## 总结：两层优化配合

1. **useShallow** — 防止列表容器因无关状态变化而重新渲染
2. **React.memo** — 即使列表容器重新渲染（新增/删除），已有的子项也不会重新渲染

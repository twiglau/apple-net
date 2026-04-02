`useDeferredValue` 是 React 18 引入的 Hook，用于**延迟更新低优先级的值**，让高优先级的 UI 交互（如输入框打字）保持流畅。

### 用法

```tsx
const deferredValue = useDeferredValue(value);
```

### 典型场景：搜索过滤

```tsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      {/* 输入框立即响应 */}
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* 列表使用延迟值，不阻塞输入 */}
      <HeavyList filter={deferredQuery} />
    </>
  );
}
```

### 原理

- 用户快速输入时，`query` 立即更新，输入框不卡
- `deferredQuery` 会滞后更新，React 在浏览器空闲时才渲染列表
- 本质是把一次同步渲染拆成**高优先级（输入）+ 低优先级（列表）**两次渲染

### vs `debounce`

| | `useDeferredValue` | `debounce` |
|---|---|---|
| 延迟机制 | React 调度，自动适配设备性能 | 固定时间延迟 |
| 值更新 | 始终最终一致 | 可能丢弃中间值 |
| 适用场景 | 渲染开销大 | 网络请求频率控制 |

简单说：**渲染慢用 `useDeferredValue`，请求多用 `debounce`**。

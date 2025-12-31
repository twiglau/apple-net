import { useEffect, useState } from "react";

export const baseUrl = "http://152.136.182.210:12231/api";

const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(baseUrl + url, { signal });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: T = await response.json();
      setData(result);
    } catch (error) {
      /**
       * 产生原因： 在 React 的开发模式下（StrictMode），组件会执行两次渲染来帮助检测问题。
       * 在第一次渲染启动网络请求后，React 会立即调用清理函数。
       * 你的代码中清理函数调用了 abort()，这会导致第一个请求被终止并抛出一个 AbortError。
       * 之前的代码捕获了这个错误并将其显示在了 UI 上。
       *
       * 修复方案： 我在 useApiData 的 catch 块中添加了对 AbortError 的判断。
       * 如果是由于组件卸载或更新导致的“主动终止”，我们会保持沉默，不设置错误状态。
       */
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      setError(error instanceof Error ? error.message : "Unknown error");
      setData(null);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useApiData;

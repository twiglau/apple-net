import { useEffect, useState, useRef } from "react";

const methodSet = ["GET", "POST", "PUT", "DELETE"] as const;
type MethodType = (typeof methodSet)[number];

interface UseApiOptions {
  method?: MethodType;
  body?: any;
  headers?: Record<string, string>;
  autoFetch?: boolean; // 是否在 mount 时自动发起请求
}

type ExtraOptions = {
  overrideUrl?: string;
  overrideMethod?: MethodType;
  overrideHeaders?: Record<string, string>;
  overrideBody?: any;
};
export const baseUrl = "http://152.136.182.210:12231/api";

const useApiData = <T>(url: string, options: UseApiOptions = {}) => {
  const {
    method = "GET",
    body = null,
    headers = {},
    autoFetch = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (extraOptions?: ExtraOptions) => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch(
        baseUrl + (extraOptions?.overrideUrl || url),
        {
          method: extraOptions?.overrideMethod || method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
            ...extraOptions?.overrideHeaders,
          },
          body:
            (extraOptions?.overrideMethod || method) !== "GET"
              ? JSON.stringify(extraOptions?.overrideBody || body)
              : null,
          signal: controller.signal,
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/auth/signin";
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: T = await response.json();
      setData(result);
      setError(null);
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
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!autoFetch) return;

    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
};

export default useApiData;

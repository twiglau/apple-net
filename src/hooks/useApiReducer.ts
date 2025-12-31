import { useEffect, useReducer } from "react";
import { apiReducer, useApiAction, type ApiState } from "@/reducers/apiReducer";
import { baseUrl } from "@/hooks/useApiData";

const initialState: ApiState = {
  loading: false,
  data: null,
  error: null,
};
const userApiReducer = <T>(url: string) => {
  const [state, dispatch] = useReducer(apiReducer<T>, initialState);
  const { fetchStart, fetchSuccess, fetchError } = useApiAction<T>(dispatch);

  const fetchData = async (signal: AbortSignal) => {
    try {
      fetchStart();
      const response = await fetch(baseUrl + url, { signal });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: T = await response.json();
      fetchSuccess(result);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      fetchError(error as Error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    ...state,
    refetch: () => fetchData(new AbortController().signal),
  } as const;
};

export default userApiReducer;

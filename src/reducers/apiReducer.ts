/**
 * actions
 * API 请求有三个经典状态： 请求开始，请求成功，请求失败
 * 对应在action上，可以写为：
 * - ** FETCH_START ** -> 开始请求，loading = true
 * - ** FETCH_SUCCESS ** -> 请求成功，data获取到
 * - ** FETCH_ERROR ** -> 请求失败，error获取到
 */

import type { Dispatch } from "react";

export const fetchStart = () => ({
  type: "FETCH_START" as const,
});
export const fetchSuccess = <T>(data: T) => ({
  type: "FETCH_SUCCESS" as const,
  payload: data,
});
export const fetchError = (error: Error) => ({
  type: "FETCH_ERROR" as const,
  payload: error,
});

export const useApiAction = <T>(dispatch: Dispatch<ApiAction<T>>) => {
  return {
    fetchStart: () => dispatch(fetchStart()),
    fetchSuccess: (data: T) => dispatch(fetchSuccess(data)),
    fetchError: (error: Error) => dispatch(fetchError(error)),
  };
};

export type ApiAction<T> =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchSuccess<T>>
  | ReturnType<typeof fetchError>;

export type ApiState<T = any> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};
export const apiReducer = <T>(state: ApiState<T>, action: ApiAction<T>) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

import { type QueryParams } from "../tanstack-query/api";
import { create } from "zustand";

interface UserState {
  queryParams: QueryParams;
  selectedRowKeys: React.Key[];

  // 动作
  setPagination: (page: number, pageSize: number) => void;
  setFilters: (
    filters: Partial<Omit<QueryParams, "page" | "pageSize">>,
  ) => void;
  resetFilters: () => void;
  setSelectedRowKeys: (keys: React.Key[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  queryParams: {
    page: 1,
    pageSize: 20,
    gender: undefined,
    nat: undefined,
    keyword: undefined,
  },
  selectedRowKeys: [],

  // 更新分页：切换页码时，保留筛选条件
  setPagination: (page, pageSize) => {
    set((state) => ({
      queryParams: { ...state.queryParams, page, pageSize },
    }));
  },
  // 更新筛选： 改变筛选时，通常重置回第一页
  setFilters: (filters) => {
    set((state) => ({
      queryParams: { ...state.queryParams, ...filters, page: 1 },
    }));
  },
  // 重置
  resetFilters: () => {
    set({
      queryParams: {
        page: 1,
        pageSize: 10,
        gender: undefined,
        nat: undefined,
        keyword: undefined,
      },
    });
  },
  // 更新选中项
  setSelectedRowKeys: (keys) => set({ selectedRowKeys: keys }),
}));

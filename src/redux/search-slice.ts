import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/types/custom";

export const fetchSearchResults = createAsyncThunk<
  Product[],
  { keyword: string }
>("search/fetchSearchResults", async (arg: { keyword: string }, { signal }) => {
  const controller = new AbortController();
  signal.addEventListener("abort", () => controller.abort());

  const response = await fetch(
    `http://152.136.182.210:12231/api/products?keyword=${encodeURIComponent(
      arg.keyword
    )}`,
    {
      signal: controller.signal,
    }
  );
  if (response.status === 404) {
    throw new Error("Not Found");
  }
  if (!response.ok) {
    throw new Error("请求失败");
  }
  const data: Product[] = await response.json();
  return data;
});

export interface SearchState {
  searchResults: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  isLoading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.isLoading = false;
      state.searchResults = [];
      if (action.error.message === "Aborted") {
        return;
      } else state.error = action.error.message || "请求失败";
    });
  },
});

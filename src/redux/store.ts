import { configureStore } from "@reduxjs/toolkit";
import { i18nSlice } from "./i18n-slice";
import { searchSlice } from "./search-slice";
import { userSlice } from "./user-slice";

const store = configureStore({
  reducer: {
    // 命令空间 i18n, state.i18n.langCode
    i18n: i18nSlice.reducer,
    search: searchSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

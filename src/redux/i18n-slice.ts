import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export const languageSet = ["zh-CN", "zh-TW", "en-US", "fr-FR"] as const;

export type LanguageCode = (typeof languageSet)[number];
export interface I18nState {
  langCode: LanguageCode;
}

const initialState: I18nState = {
  langCode: "zh-CN",
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguageCode: (state, action: PayloadAction<LanguageCode>) => {
      // 注意这里，我们直接改 state, 看起来像可变，
      // 其实底层用 immer 保证不可变
      state.langCode = action.payload;
    },
  },
});

export const { setLanguageCode } = i18nSlice.actions;
export default i18nSlice.reducer;

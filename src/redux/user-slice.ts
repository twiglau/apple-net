import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: null,
  loading: false,
  error: null,
};
interface LoginParams {
  username: string;
  password: string;
}

export const login = createAsyncThunk<string, LoginParams>(
  "user/login",
  async (credentials: LoginParams) => {
    const response = await fetch(
      `http://152.136.182.210:12231/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    if (!response.ok) {
      throw new Error("请求失败");
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error("登录失败");
    }
    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
      localStorage.setItem("token", action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.error.message || "登录失败";
    });
  },
});

export const { logout, setToken } = userSlice.actions;

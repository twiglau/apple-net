import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. 定义用户信息的数据结构(Model)
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// 2. 定义 State 接口（数据部分）
interface UserState {
  userInfo: UserInfo | null; // 用户信息，初始值为 null
  isLoggedIn: boolean; // 登录状态
}

// 3. 定义 Actions 接口（方法部分）
interface UserActions {
  setUserInfo: (userInfo: UserInfo) => void; // 设置用户信息的方法
  logout: () => void; // 退出登录的方法
}

// 4. 创建 Zustand Store（结合 State 和 Actions）
export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      userInfo: null, // 初始用户信息为 null
      isLoggedIn: false, // 初始登录状态为 false

      // 设置用户信息的方法实现
      setUserInfo: (userInfo) => {
        set({ userInfo, isLoggedIn: true }); // 更新用户信息并设置登录状态为 true
      },

      // 退出登录的方法实现
      logout: () => {
        set({ userInfo: null, isLoggedIn: false }); // 清除用户信息并设置登录状态为 false
      },
    }),
    {
      name: "user-storage", // 存储在 localStorage 中的键名
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 作为存储方式
    },
  ),
);

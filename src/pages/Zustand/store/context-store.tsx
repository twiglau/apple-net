/**
 * 1. store 是一个单例模块，虽然独立存在，但它的状态是全局共享的。
 * 2. 如有多个组件使用了同一个状态，那么每个组件都会同步发生更新。
 * 
 * 3. 当实现一个选项卡组件，每个选项卡都有自己独立的状态。就需要结合context来实现。
 * 4. 原理就是，为了防止 store 被多个组件共享，以及防止当我们从 context 中读取状态时
 * 组件被频繁重新渲染， 我们使用 useRef 来存储 store 的实例。
 */

import { createContext, use, useRef } from "react";
import { create, useStore, type StoreApi } from "zustand";


// 定义 Store 的状态和操作
interface TabState {
    activeTabId: string;
    setActiveTabId: (id: string) => void;
}

// 定义 Store 的 Props, 用于初始化
interface TabStoreProps {
    initialTabId: string;
}

// 定义单个 Tab 项的数据结构
export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

// 创建 Store 的工厂函数
const createTabStore = (props: TabStoreProps): StoreApi<TabState> => {
    return create<TabState>((set) => ({
        activeTabId: props.initialTabId,
        setActiveTabId: (id) => set({ activeTabId: id }),
    }));
};

// 创建 Context
const TabStoreContext = createContext<StoreApi<TabState> | null>(null);

// 创建 Provider 组件
export const TabStoreProvider: React.FC<{ initialTabId: string; children: React.ReactNode }> = ({ initialTabId, children }) => {
    const storeRef = useRef<StoreApi<TabState> | null>(null);

    if (!storeRef.current) {
        storeRef.current = createTabStore({ initialTabId });
    }

    return (
        <TabStoreContext.Provider value={storeRef.current}>
            {children}
        </TabStoreContext.Provider>
    );
}

// 创建自定义 Hook 来使用 Store
export const useTabStore = <T,>(selector: (state: TabState) => T) => {
    const store = use(TabStoreContext);
    if (!store) {
        throw new Error("useTabStore must be used within a TabStoreProvider");
    }
    return useStore(store, selector);
};
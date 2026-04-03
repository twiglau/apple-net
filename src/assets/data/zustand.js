

export const ZUSTAND_PAGES = [
    {
        id: "basic",
        title: "基本使用",
        path: "/zustand",
        end: true,
        element: () => import("@/pages/Zustand/basic/index"),
    },
    {
        id: "set",
        title: "set用法",
        path: "/zustand/set",
        end: true,
        element: () => import("@/pages/Zustand/set/index"),
    },
    {
        id: "async",
        title: "异步操作",
        path: "/zustand/async",
        end: true,
        element: () => import("@/pages/Zustand/async/index"),
    },
    {
        id: "auto-selector",
        title: "自动选择器",
        path: "/zustand/auto-selector",
        end: true,
        element: () => import("@/pages/Zustand/auto-selector/index"),
    },
    {
        id: "state-action-separation",
        title: "状态与动作分离",
        path: "/zustand/sts-oper-separation",
        end: true,
        element: () => import("@/pages/Zustand/sts-oper-separator/index"),
    },
    {
        id: "context-store",
        title: "每个组件相同store,不同状态",
        path: "/zustand/context-store",
        end: true,
        element: () => import("@/pages/Zustand/context-store/index"),
    },
    {
        id: "cart",
        title: "购物车示例",
        path: "/zustand/cart",
        end: true,
        element: () => import("@/pages/Zustand/cart/index"),
    },
    {
        id: "storage",
        title: "本地存储示例",
        path: "/zustand/storage",
        end: true,
        element: () => import("@/pages/Zustand/storage/index"),
    },
    {
        id: "async-request",
        title: "异步请求示例",
        path: "/zustand/async-request",
        end: true,
        element: () => import("@/pages/Zustand/async-request/index"),

    }
];
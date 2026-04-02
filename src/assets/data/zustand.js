

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

    }
];
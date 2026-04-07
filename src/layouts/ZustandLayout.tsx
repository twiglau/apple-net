import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ZUSTAND_PAGES } from "@/assets/data/zustand";
import QueryClientProvider from "@/contexts/queryclient-provider"

export default function ZustandLayout() {
    return (
        <QueryClientProvider>
            <div className="flex flex-col gap-10 mx-auto max-w-7xl px-4 py-8">
                <nav className="flex gap-4 pb-2">
                    {ZUSTAND_PAGES.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `px-3 py-1 rounded-t transition ${
                                    isActive
                                        ? "text-apple-blue font-bold"
                                        : "text-gray-500 hover:text-apple-blue"
                                }`
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </nav>
                <div className="shadow rounded-2xl bg-gray-200 min-h-[50vh] p-4">
                    <Suspense fallback={<div>加载中...</div>}>
                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </QueryClientProvider>
    );
}
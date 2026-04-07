import { TodoList } from "./list";
import { useListStore } from "../store/list";
import { RefreshCw } from "lucide-react";


const generateMockData = (count: number) => {
    return Array.from({length: count}).map((_, i) => ({
        id: crypto.randomUUID(),
        text: `高性能列表项目 #${i + 1} - ${Math.floor(Math.random() * 1000)}`,
        selected: false
    }))
}

export default function Page() {
    const setData = useListStore((state) => state.setData);

    function handleRefresh() {
        const data = generateMockData(1000);
        setData(data);
    }

    return (
        <div className="p-4 h-150 overflow-y-scroll">
            <div className="">
                <header className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 p-4">
                    <div className="text-2xl font-bold text-gray-800">高性能列表 (ID 原子化)</div>
                    <button 
                    onClick={handleRefresh}
                    className="flex text-sm items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"
                    >
                        <RefreshCw size={14} />
                        刷新 / 生成 1000 条
                    </button>
                </header>
                <TodoList />
            </div>
        </div>
    );
}

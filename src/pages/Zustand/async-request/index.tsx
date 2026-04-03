import { Suspense } from "react";
import { useMessageStore } from "../store/async-request";
import { Message } from "./message";



export default function App() {
    const promise = useMessageStore((state) => state.promise);
    const update = useMessageStore((state) => state.update);

    // 这会触发组件的立即重渲染（Re-render），从而获取到刚生成的 promise
    if(!promise) {
        update();
    }
    function handleClick() {
        update();
    }

    return (
        <div className="p-4">
            <div className="text-right mb-4">
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    触发异步请求
                </button>
            </div>
            <Suspense fallback={<div className="text-gray-500">加载中...</div>}>
                <Message promise={promise} />
            </Suspense>
        </div>
    );
}
import Expensive from "./expensive";
import NumberPlay from "../set/number";
import { useAsyncStore } from "../store/async";
import { useDeferredValue } from "react";

export default function Async() {
    const counter = useAsyncStore((state) => state.counter);
    const increment = useAsyncStore((state) => state.increment);
    const deferred = useDeferredValue(counter);
    return (
        <div className="p-4">
            <div className="flex items-center">
                <Expensive counter={deferred} />
                <div className="flex-1 text-center">
                    <NumberPlay value={counter} />
                    <div>高优先级任务</div>
                </div>
            </div>
            <div className="text-right mt-8">
                <button className="bg-gray-400 py-3 px-6" onClick={increment}>
                    counter++
                </button>
            </div>
        </div>
    )
}
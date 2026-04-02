import { useSetStore } from "../store/set";
import NumberPlay from "./number";


export default function Count1() {
    const count1 = useSetStore((state) => state.count1);
    const inc_count1 = useSetStore((state) => state.inc_count1);
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="border border-gray-400 size-48 flex items-center justify-center">
                <NumberPlay value={count1} />
            </div>
                <div className="space-x-2">
                    <button className="bg-gray-400 py-3 px-6" onClick={inc_count1}>count++</button>
            </div>
        </div>
    )
}
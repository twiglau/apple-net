import { useSetStore } from "../store/set";
import NumberPlay from "./number";


export default function Count2() {
    const count2 = useSetStore((state) => state.count2);
    const inc_count2 = useSetStore((state) => state.inc_count2);
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="border border-gray-400 size-48 flex items-center justify-center">
                <NumberPlay value={count2} />
            </div>
                <div className="space-x-2">
                    <button className="bg-gray-400 py-3 px-6" onClick={inc_count2}>count++</button>
            </div>
        </div>
    )
}
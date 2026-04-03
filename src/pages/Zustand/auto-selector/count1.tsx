import NumberPlay from "../set/number";
import { useStoreSelectors } from "../store/auto-selector";


export default function Counter() {
    const counter1 = useStoreSelectors.use.counter1();
    const inc_counter1 = useStoreSelectors.use.inc_counter1();

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center border border-gray-400 size-48">
                <NumberPlay value={counter1} />
            </div>
            <div className="space-x-2">
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={inc_counter1}>
                    counter++
                </button>
            </div>
        </div>
    );
}
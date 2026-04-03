import NumberPlay from "../set/number";
import { useAbStore, actions } from "../store/sts-oper-separator";


export default function OperB() {
    const b_value = useAbStore.use.b();
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center size-48 border border-gray-400">
                <NumberPlay value={b_value} />
            </div>
            <div className="space-x-4">
                <button className="bg-gray-400 hover:bg-gray-500 py-3 px-4 rounded text-sm text-black " onClick={actions.inc_b}>b++</button>
            </div>
        </div>
    )
}
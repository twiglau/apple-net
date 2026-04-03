import OperA from "./oper-a";
import OperB from "./oper-b";



export default function Index() {
    return (
        <div className="flex items-center justify-center p-4 gap-4">
            <OperA />
            <OperB />
        </div>
    )
}
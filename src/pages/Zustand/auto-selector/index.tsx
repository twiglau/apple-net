import Counter1 from "./count1";
import Counter2 from "./count2";

export default function Index() {
    return (
        <div className="flex items-center justify-center p-4 gap-4">
            <Counter1 />
            <Counter2 />
        </div>
    )
}
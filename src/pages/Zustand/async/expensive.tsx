import { memo } from "react";
import SlowItem from "./slow-item";
import NumberPlay from "../set/number";


const Expensive = ({counter}:{counter: number}) => {
    let items = [];
    for (let i = 0; i < 1000; i++) {
        items.push(<SlowItem key={i} counter={counter} />);
    }
    return (
        <div className="text-red-500 flex-1">
            <div className="flex-1 text-center">
                <NumberPlay value={counter} />
                <div>耗时任务</div>
            </div>
            <div className="h-32 hidden">
                {items}
            </div>
        </div>
    );
};

export default memo(Expensive);
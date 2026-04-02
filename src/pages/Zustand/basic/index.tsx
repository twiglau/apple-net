import { useEffect } from "react"
import { useBasicStore, updatePosition } from "../store/basic"


export default function Basic() {
    // 解构获取状态有风险：
    // store中如果其他状态更新，当前组件也会受到影响从而导致冗余的 re-render.
    const { update } = useBasicStore(); // x,y,
    // 2. 改进： 使用selector函数来获取状态，这样只有当selector函数返回的值发生变化时组件才会重新渲染。
    const x = useBasicStore((state) => state.x);
    const y = useBasicStore((state) => state.y);

    function handleMouseMove(event: MouseEvent) {
        updatePosition(event);
        // update(event);
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div>
            <h1>基本使用:鼠标当前位置</h1>
            <p>X: {x}</p>
            <p>Y: {y}</p>
        </div>
    )
}
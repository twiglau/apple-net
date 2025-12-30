import { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiRefreshCw } from "react-icons/fi";

type ToggleButtonsProps = {
    onAdd: () => void;
    onRemove: () => void;
    onReset: () => void;
}

const ToggleButtons = ({onAdd, onRemove, onReset}: ToggleButtonsProps) => {
    const [selected, setSelected] = useState("add");
    /**
     * 为什么不建议在这里使用 useMemo？
     * 1. 计算极其简单： useMemo 的主要目的是为了缓存昂贵的计算结果。
     * 你这里的逻辑只是一个简单的字符串拼接和三元运算，这种操作在 JavaScript 中执行速度极快（纳秒级）。 
     * 而 useMemo 本身是有开销的：React 需要分配内存来存储这个值，
     * 并且在每次渲染时都要比对依赖项（selected）。在这里，useMemo 的维护成本（Memory/CPU）
     * 可能反而比直接计算字符串还要高。
     * 2. 基本类型没有引用地址问题： useMemo 的另一个用途是保持引用稳定性。
     * 如果返回的是对象或数组，并且该结果会作为 props 传给下游被 React.memo 包裹的子组件，
     * 那么 useMemo 是有意义的。 但你返回的是 字符串（String）。字符串是基本类型，
     * 在 JS 中是按值比较的。无论你是否缓存，只要内容没变，它对下游的影响是一样的。
     * 3. 代码可读性： 直接写在渲染逻辑中更符合 React 的直觉，代码也更简洁。
     * 4. 在 React 开发中，我们遵循 “先写出正确的逻辑，只有在遇到真正的性能瓶颈（如通过 Profiler 查出某个重量级计算重复运行）
     * 时才考虑 useMemo” 的原则。过早的优化往往会增加代码的复杂度。
     */
    const getButtonClass = (type: string) => {
        return `px-3 py-2 hover:bg-apple-blue
                ${selected === type ? "bg-apple-gray-200" : "bg-white"}`;
    };
    
    return (
        <div className="flex border border-apple-gray-200
        dark:border-apple-gray-800 rounded-md overflow-hidden
         text-apple-gray-900
        ">
            <button 
            className={getButtonClass("add")}
            onClick={() => {
                setSelected("add");
                onAdd();
              }}>
                <FiPlus size={16} />
            </button>
            <button 
            className={getButtonClass("remove")}
            onClick={() => {
                setSelected("remove");
                onRemove();
            }}>
                <FiMinus size={16} />
            </button>
            <button 
            className={getButtonClass("reset")}
            onClick={() => {
                setSelected("reset");
                onReset();
            }}>
                <FiRefreshCw size={16} />
            </button>
        </div>
    );
}

export default ToggleButtons;
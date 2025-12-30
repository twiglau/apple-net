import { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiRefreshCw } from "react-icons/fi";

type ToggleButtonsProps = {
    onAdd: () => void;
    onRemove: () => void;
    onReset: () => void;
}

const ToggleButtons = ({onAdd, onRemove, onReset}: ToggleButtonsProps) => {
    const [selected, setSelected] = useState("add");
    const classFormat = useMemo(() => {
        return `px-3 py-2 hover:bg-apple-blue
                ${selected === "add" ? "bg-apple-gray-200" : "bg-white"}`;
    }, [selected]);
    
    return (
        <div className="flex border border-apple-gray-200
        dark:border-apple-gray-800 rounded-md overflow-hidden
         text-apple-gray-900
        ">
            <button 
            className={classFormat}
            onClick={() => {
                setSelected("add");
                onAdd();
              }}>
                <FiPlus size={16} />
            </button>
            <button 
            className={classFormat}
            onClick={() => {
                setSelected("remove");
                onRemove();
            }}>
                <FiMinus size={16} />
            </button>
            <button 
            className={classFormat}
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
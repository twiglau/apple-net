import React, { useState, useRef, useEffect } from "react";
import { useListStore } from "../store/list";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { clsx } from "clsx";



// 如果没使用memo, 所有的 ListItem 组件会在列表增加或删除时，重新渲染。
// 但是在修改列表项自身的状态时，仅当前被修改的列表会重新渲染。
export const ListItemBase = ({id}: { id: string}) => {

    //关键优化：只订阅自己的数量
    //只有当 entities[id] 发生变化时，这个组件才会重新渲染
    const item = useListStore(state => state.entities[id]);

    console.log("ListItem Rendered", id);

    const toggleSelection = useListStore(state => state.toggleSelection);
    const removeItem = useListStore(state => state.removeItem);
    const updateText = useListStore(state => state.updateText);


    // 本地UI状态
    const [ isEditing, setIsEditing ] = useState(false);
    const [ editText, setEditText ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // 安全检查： 如果删除时发生竞态条件
    if(!item) return null;


    function handleSave(e?:React.MouseEvent) {
        e?.stopPropagation();
        if(editText.trim()) {
            updateText(id, editText);
        }
        setIsEditing(false);
    }
    function handleCancel(e: React.MouseEvent) {
        e.stopPropagation();
        setIsEditing(false);
    }
    function handleEditStart(e: React.MouseEvent) {
        e.stopPropagation();
        setEditText(item?.text!);
        setIsEditing(true);
    }

    useEffect(() => {
        if(isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing])


    return (
        <div
        onClick={() => !isEditing && toggleSelection(id)}
        className={clsx(
            "flex items-center justify-between p-4 mb-2 border transition-all cursor-pointer select-none",
            item.selected
               ? "bg-blue-50 border-blue-500 shadow-xs"
               : "bg-white border-gray-200 hover:border-blue-300"
        )}
        >
            <div className="flex-1 flex items-center justify-between gap-3">
                {/* Checkbox UI  */}
                <div className={clsx(
                    "size-5 rounded border flex items-center justify-center transition-colors",
                    item.selected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                )}>
                    {item.selected && <Check size={14} className="text-white" />}
                </div>

                {/* Text Content */}
                {isEditing ? (
                    <input
                    ref={inputRef}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                    onClick={e => e.stopPropagation()}
                    className="flex-1 px-2 py-1 border border-blue-300 rounded outline-none text-gray-800"
                    />
                ):(
                    <span className={clsx(
                        "text-gray-700 flex-1 text-left",
                        item.selected && "line-through text-gray-400!"
                    )}>
                        {item.text}
                    </span>
                )}


                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                    {isEditing ? (
                        <>
                          <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            <Check size={18} />
                          </button>
                          <button onClick={handleCancel} className="p-2 text-red-600 hover:bg-red-100 rounded-full">
                            <X size={18}/>
                          </button>
                        </>
                    ):(
                        <>
                          <button onClick={handleEditStart} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                            <Edit2 size={18} />
                         </button>
                         <button 
                            onClick={e => {e.stopPropagation(); removeItem(id)}}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 size={18} />
                        </button>
                        </>
                    )}
                </div>
            </div>
            
        </div>
    )
}

// 只要 ID 没变， 且父组件不强行传递新 props, 通常不需要重新渲染。
// 自定义比较函数：如果id没变，就不重新渲染。
// 当父组件（列表）重新渲染时，阻止子项不必要的重新渲染。
export const ListItem = React.memo(ListItemBase, (prev, next) => prev.id === next.id);
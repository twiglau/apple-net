import { useListStore } from "../store/list"
import { useShallow } from "zustand/react/shallow"
import { ListItemBase,ListItem } from "./list-item";

export const TodoList = () => {
    // 关键优化： 使用 useShallow
    // 只有当 IDs 数组的顺序或长度改变时 （新增，删除，排序),列表容器渲染
    // 如果只是某个 Item 内部变成了 selected, 这里不会 re-render.
    const ids = useListStore(useShallow(state => state.ids));

    console.log('List Container Rendered (Should only happen on Add/Remove/Refresh');

    return (
        <div className="flex flex-col w-full mx-auto mt-8 p-4">
            {ids.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                    暂无数据，请点击刷新
                </div>
            ):(
                ids.map(id => (
                    <ListItem key={id} id={id}/>
                ))
            )
            }
        </div>
    )
}
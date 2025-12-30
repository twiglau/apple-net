import type { CartItem as CartItemType } from "@/types/custom";
import { FiTrash2 } from "react-icons/fi";
import ToggleButtons from "./ToggleButtons";

interface CartItemProps {
    item: CartItemType;
    onItemUpdate: (qty: number) => void;
    onItemRemove: () => void;
}

const CartItem = ({item, onItemUpdate, onItemRemove}: CartItemProps) => {
    const setQty = (qty: number) => onItemUpdate(qty);
    const addQty = () => onItemUpdate((item.qty ?? 0) + 1);
    const removeQty = () => {
        const qty = item.qty ?? 1;
        onItemUpdate(qty - 1 < 1 ? 1 : qty - 1);
    }
    return (
        <>
          <div className="flex gap-5 mt-6 p-0 w-full">
                {/* 图片 */}
                <img src={item.imageSrc} alt="" className="h-24 pl-4" />
                {/* 商品信息 */}
                <div className="w-2/3 flex flex-col justify-between">
                    <p className="text-xl">{item.name}</p>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm truncate w-50">
                            {item.color} {item.memorySize} {item.model}
                        </p>
                        <p className="text-sm">x{item.qty}</p>
                        <p className="text-sm font-semibold">
                            ￥{" "}
                            {(item.modelPrice || 0) + (item.memorySizePrice || 0).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex space-x-6 mt-4">
                        <select
                            value={item.qty?.toString()}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="border border-apple-gray-300
                            dark:border-apple-gray-700
                            rounded-md p-1 text-sm
                            "
                        >
                            {[1,2,3,4,5].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <ToggleButtons
                        onAdd={addQty}
                        onRemove={removeQty}
                        onReset={() => setQty(1)}
                        />
                        <button
                        onClick={onItemRemove}
                        className="hover:text-apple-blue"
                        >
                            <FiTrash2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <hr 
            className="mt-6 pt-2 border-t border-apple-gray-200
            dark:border-apple-gray-800"
            />
        </>
    );
}

export default CartItem;

import { useCartStore, type CartItem } from "../store/cart";
import { motion, AnimatePresence } from "framer-motion";

export const CartList = () => {
  const { 
    items,
    toggleSelectAll,
    getSelectedItems,
    getTotalPrice,
} =  useCartStore();

  const isAllSelected = items.length > 0 && items.every((item) => item.selected);
  const selectedItems = getSelectedItems();
  const totalPrice = getTotalPrice();


  if(items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-300 border border-gray-400 rounded-lg">
        <span className="text-5xl block mb-2">🛍️</span>
        <p className="text-lg font-semibold text-gray-300">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        {/* 头部全选栏 */}
        <div className="flex items-center pb-2 border-b border-gray-300">
            <input 
            type="checkbox" 
            checked={isAllSelected} 
            onChange={(e) => toggleSelectAll(e.target.checked)} 
            className="size-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
            />
            <span className="ml-2 text-sm text-gray-600">
                全选 {items.length}
            </span>
        </div>

        {/* 列表区域 */}
        <div className="space-y-3">
            <AnimatePresence initial={false}>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </AnimatePresence>
        </div>

        {/* 底部总计 */}
        <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
                已选商品 <span className="font-bold">{selectedItems.length}</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <div className="text-xs text-gray-500">合计:</div>
                    <div className="text-lg font-bold text-indigo-600 font-sans">
                        {totalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                </div>
                <button
                disabled={selectedItems.length === 0}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
                >
                    结算
                </button>
            </div>
        </div>
    </div>
  );
}

const CartItem = ({ item }: {item: CartItem}) => {
    const { 
        toggleSelectItem,
        updateQuantity,
        removeFromCart,
    } = useCartStore();
    return (
        <motion.div 
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
        className="flex items-center bg-white p-4 border border-gray-300 "
        >
            {/* 选择框 */}
            <input 
            type="checkbox" 
            checked={item.selected} 
            onChange={() => toggleSelectItem(item.id)} 
            className="size-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 mr-4"
            />
            {/* 商品信息 */}
            <div className="text-2xl mr-3">{item.image}</div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                </h4>
                <div>{item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
            </div>
            {/* 操作区 */}
            <div className="flex items-center gap-3 ml-2">
                <div className="flex items-center border border-gray-300">
                    <button
                    onClick={() => updateQuantity(item.id,  1)}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        +
                    </button>
                    <span className="px-3 py-1 text-sm">{item.quantity}</span>
                    <button
                    onClick={() => updateQuantity(item.id,  -1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        -
                    </button>
                </div>
                <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 p-1 rounded"
                >
                    🗑️
                </button>
            </div>
        </motion.div>
    )
}
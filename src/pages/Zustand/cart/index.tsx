import { useCartStore } from "../store/cart";
import { Tabs, type TabItem } from "../context-store/tabs";
import { ProductList } from "./product-list";
import { CartList } from "./cart-list";


export default function App() {
    // 从 store 中获取购物车总数
    const totalCount = useCartStore((state) => state.getTotalItems());

    // 动态构建 tabs 数组
    const tabs: TabItem[] = [
        {
            id: "products",
            label: "产品列表",
            content: <ProductList />
        },
        {
            id: "cart",
            label: (
                <div className="flex items-center gap-2">
                    <span>购物车</span>
                    {totalCount > 0 && (
                        <span className="text-xs text-white bg-red-500 rounded-full px-2 py-0.5">
                            {totalCount}
                        </span>
                    )}
                </div>
            ),
            content: <CartList />
        }
    ]

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">商城</h1>
            <Tabs tabs={tabs} defaultTabId="products"/>
        </div>
    )
}
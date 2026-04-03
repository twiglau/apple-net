import { useCartStore, type Product } from "../store/cart";




// mock 数据，实际项目中可能来自 API
const products: Product[] = [
    {id: 1, name: "机械键盘 Keychron K2", price: 99.99, image: "⌨️"},
    {id: 2, name: "无线鼠标 Logitech MX Master 3", price: 79.99, image: "🖱️"},
    {id: 3, name: "显示器 Dell UltraSharp U2723QE", price: 499.99, image: "🖥️"},
    {id: 4, name: "耳机 Sony WH-1000XM4", price: 349.99, image: "🎧" },
];

export const ProductList = () => {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
                <div key={product.id} className="flex flex-col bg-white p-4 border border-gray-300 rounded">
                    <div className="text-7xl">{product.image}</div>
                    <div className="font-semibold text-gray-800 text-lg mt-5">{product.name}</div>
                    <p className="my-1! text-gray-500 text-sm font-sans">
                        {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </p>
                    <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full py-2 px-4 bg-indigo-50 text-indigo-600 text-sm font-medium hover:bg-indigo-100 transition-colors active: scale-95 transform"
                    >
                        加入购物车
                    </button>
                </div>
            ))}
        </div>
    )
}
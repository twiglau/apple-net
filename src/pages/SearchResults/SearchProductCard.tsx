import { Button } from "@/components";
import type { Product } from "@/types/custom";
import { useNavigate } from "react-router-dom";

export default function SearchProductCard(product: Product) {
    const navigate = useNavigate();
    return (
        <div className=" bg-apple-gray-100 dark:bg-apple-gray-900 dark:border-apple-gray-500
        rounded-2xl shadow-sm p-6 
        hover:transfrom hover:scale-105 transition-all duration-300
        ">
            
            <div className="aspect-square object-contain rounded-xl">
                <img 
                className="size-full object-contain rounded-xl"
                src={product.image}
                alt={product.name}
                />
            </div>
            <h3 className="text-2xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-400 mb-4">{product.title}</p>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-medium">
                    {product.startingPrice}
                </span>
                <div className="flex gap-3">
                    <Button title="立刻购买" />
                    <Button 
                    title="了解更多"
                    variant="outline"
                    onClick={() => navigate(`/product-detail/${product.id}`)}
                    />
                </div>
            </div>
            {!product.inStock && (
                <div className="mt-4 text-red-400">暂时缺货</div>
            )}
        </div>
    )
}
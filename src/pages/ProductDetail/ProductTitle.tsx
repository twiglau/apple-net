import type { Product } from "@/types/custom";


export default function ProductTitle(info: Partial<Product>) {
    return (
        <div>
            <p className="text-apple-red text-sm font-semibold">全新</p>
            <h4 className="text-4xl mt-2">购买 {info.name}</h4>
            <p className="mt-6">
                RMB {info.installments}/月起 或 RMB {info.startingPrice}起
            </p>
        </div>
    )
}
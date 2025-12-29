import { useState } from "react";
import SkuSelect from "./SkuSelect";
import { produce } from 'immer'
import type { Product, CartItem } from "@/types/custom";

type ProductHeroProps = {
  product: Product;
  imageUrl: string;
};

const updateItem = (updates: Partial<CartItem>) => {
  return produce((draft) => {
    Object.assign(draft, updates);
  });
};


export default function ProductHero({ product, imageUrl }: ProductHeroProps) {

    const [cartItem,setCartItem ] = useState<CartItem>({
        productId: product.id,
        name: product.name,
        imageSrc: product.image,
        modelId: null,
        modelPrice: null,
        model: null,
        color: null,
        memorySize: null,
        memorySizeId: null,
        memorySizePrice: null,
        qty: 1,
    });
    console.log('cartItem', cartItem)
    return (
        <div
        className="flex flex-col lg:flex-row-reverse
        pt-8 mt-4
        md:pt-28 lg:pt-52
        space-y-4
        text-apple-text-light dark:text-apple-text-dark
        "
        >
            <div className="flex-1 flex justify-center items-center">
                <img 
                className="w-87.5 lg:-mt-32 lg:ml-19"
                src={imageUrl}
                />
            </div>
            <div className="flex-1 space-y-6 ml-6 md:ml-24">
                <span
                className="text-4xl font-black md:text-6xl"
                >
                    购买 {product.name}
                </span>
                <span
                className="font-medium md:text-xl"
                >
                    RMD {Number(product.startingPrice).toLocaleString("en-US")}
                </span>
                <div className="flex space-x-3">
                    <SkuSelect
                    placeholder={'型号'}
                    options={product.models.map(model => model.name)}
                    onChange = {e => {
                        const selectModel = product.models.find(m => m.name === e)
                        if(selectModel) {
                            setCartItem(
                                updateItem({
                                    model: selectModel.name,
                                    modelId: selectModel.id,
                                    modelPrice: selectModel.price
                                })
                            )
                        }
                    }}
                    value={cartItem.model}
                    />
                    <SkuSelect 
                    placeholder={'颜色'} 
                    options={product.colors}
                    value={cartItem.color}
                    onChange = {e => setCartItem({...cartItem,color: e })}
                     />
                    <SkuSelect 
                    placeholder={'储存大小'} 
                    options={product.memorySizes.map(size => size.name)}
                    value={cartItem.memorySize}
                    onChange = {e => {
                        const selectMemorySize = product.memorySizes.find(s => s.name === e)
                        if(selectMemorySize) {
                            setCartItem(
                                updateItem({
                                    memorySize: selectMemorySize.name,
                                    memorySizeId: selectMemorySize.id,
                                    memorySizePrice: selectMemorySize.price
                                })
                            )
                        }
                    }}
                     />
                    <button
                    className="
                    border border-apple-blue
                    px-5 py-2 bg-transparent
                    rounded-md
                    hover:bg-apple-blue 
                    hover:text-apple-gray-100
                    "
                    >
                        加入购物车
                    </button>
                </div>
            </div>
        </div>
    )
}
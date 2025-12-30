import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CartItem, Color, MemorySize, Product, ProductModel } from "@/types/custom";
import ProductTitle from "./ProductTitle";
import ProductHero from "./ProductHero";
import SelectTitle from "./SelectTitle";
import SelectSquare from "./SelectSquare";
import SelectCircle from "./SelectCircle";
import PriceTag from "./PriceTag";
import { Button } from "@/components";
import { CartContext } from "@/contexts/shopping";
import { useContext } from "react";


const ProductDetail = () => {
    const { addToCart } = useContext(CartContext);
    const [selectModel, setSelectModel] = useState<ProductModel>();
    const [selectColor, setSelectColor] = useState<Color>();
    const [selectMemorySize, setSelectMemorySize] = useState<MemorySize>(); 
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const navigate = useNavigate(); 
    const product = useLoaderData<Product>();

    if(!product) {
        navigate('/404', { replace: true });
        return;
    }

    useEffect(() => {
        const total = (product.startingPrice || 0) + (selectModel?.price || 0) + (selectMemorySize?.price || 0);
        setTotalAmount(total);
    }, [selectModel, selectMemorySize, product]);

    const handleAddToCart = () => {
        if(!selectModel || !selectColor || !selectMemorySize) {
            return;
        }

        const cartItem: CartItem = {
            productId: product.id,
            name: product.name,
            imageSrc: product.image,
            modelId: selectModel.id,
            modelPrice: selectModel.price,
            model: selectModel.name,
            color: selectColor,
            memorySize: selectMemorySize.name,
            memorySizeId: selectMemorySize.id,
            memorySizePrice: selectMemorySize.price,
            qty: 1
        }
        addToCart(cartItem);
    }
    
    return (
        <div className="min-h-screen px-4 lg:px-32
        mt-4 mb-40 text-apple-text-light dark:text-apple-text-dark
        ">
            {/* 标题部分 */}
            <ProductTitle
            name={product.name}
            startingPrice={product.startingPrice}
            installments={product.installments}
            />
            <div className="flex flex-col lg:flex-row gap-6 mt-12">
                <ProductHero imageUrl={product.carouselImages[0] || ''} />
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="w-full">
                        <SelectTitle title="选择型号" desc="请选择您想要的型号" />
                        <div className="mt-4 space-y-2">
                            {product.models.map((model) => (
                                <SelectSquare
                                key={model.name}
                                name={model.name}
                                spec={model.specification}
                                price={`RMB ${model.price} 起`}
                                isSelected={selectModel?.id === model.id}
                                onClick={() => setSelectModel(model)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full">
                        <SelectTitle title="外观" desc="请选择您想要的颜色" />
                        <div className="flex gap-4 mt-6 ml-6">
                            {product.colors.map((color) => (
                                <SelectCircle
                                key={color}
                                color={color}
                                isSelected={selectColor === color}
                                onClick={() => setSelectColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full">
                        <SelectTitle title="储存容量" desc="你需要多大的空间?" />
                        <div className="mt-4 space-y-2">
                            {product.memorySizes.map((memorySize) => (
                                <SelectSquare
                                key={memorySize.name}
                                name={memorySize.name}
                                price={`RMB ${memorySize.price} 起`}
                                isSelected={selectMemorySize?.id === memorySize.id}
                                onClick={() => setSelectMemorySize(memorySize)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <PriceTag
            modelAmount={selectModel?.price || 0}
            colorAmount={selectColor ? 0  : undefined}
            sizeAmount={selectMemorySize?.price}
            totalAmount={totalAmount}
            />

            <div className="flex justify-end mt-12 mr-8">
                <Button title="加入购物车" onClick={() => handleAddToCart()}/>
            </div>
        </div>
    )
}

export default ProductDetail;
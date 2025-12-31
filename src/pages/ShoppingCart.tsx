import { Button,CartItem } from "@/components";
import { CartContext } from "@/contexts/shopping";
import { useContext, useEffect, useState } from "react";


export default function ShoppingCart() {
    const {cartItems, updateCartItem, removeFromCart} = useContext(CartContext)

    const [total, setTotal] = useState(0);
    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            const price =  (item.modelPrice || 0) + (item.memorySizePrice || 0);
            const qty = item.qty || 0;

            return acc + price * qty;
        }, 0);

        setTotal(total);
    }, [cartItems]);

    const shoppingFee = 150;


    return (
        <div className="min-h-screen p-6 pt-30
         max-w-4xl mx-auto 
         bg-apple-light dark:bg-apple-dark
         font-light
        ">
            <h2 className="text-4xl">
                购物车总价 ￥{(total + shoppingFee).toLocaleString()}
            </h2>
            {/* 商品列表 */}
            <div className="mb-6">
                {cartItems.map((item,index) => (
                    <CartItem
                        key={item.productId}
                        item={item}
                        onItemUpdate={(qty:number) => {
                            const newItem = {...item, qty};
                            updateCartItem(index, newItem);
                        }}
                        onItemRemove={() => removeFromCart(index)}
                    />
                ))}
            </div>
            {/* 结算区域 */}
            <div className="ml-12 pt-2 space-y-4">
                <div className="grid grid-cols-2 items-center">
                    <p className="text-center">小计：</p>
                    <p className="text-right">RMD {total.toLocaleString()}</p>
                    <p className="text-center">运费：</p>
                    <p className="text-right">RMD {shoppingFee.toLocaleString()}</p>
                </div>
                <hr
                className="ml-8 border-t
                 border-apple-gray-200 dark:border-apple-gray-800
                " 
                />
                <div className="grid grid-cols-2 items-center">
                    <p className="text-center text-2xl">总计：</p>
                    <p className="text-right text-2xl">
                        RMB {(total + shoppingFee).toLocaleString()}
                    </p>
                    <div className="col-span-2 flex justify-end mt-12">
                        <Button title="结账" />
                    </div>
                </div>
            </div>
        </div>
    );
}
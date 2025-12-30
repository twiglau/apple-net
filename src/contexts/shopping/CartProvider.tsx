import type { CartItem } from "@/types/custom";
import CartContext from "./CartContext";
import { useEffect, useState } from "react";


const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cartItems, setCartItems] = useState<CartItem[]>( () => {
        const saveCart = localStorage.getItem("cart");
        return saveCart ? JSON.parse(saveCart) : [];
    });
    
    useEffect(() => {
        if(cartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
            localStorage.removeItem("cart");
        }
    }, [cartItems]);


    const addToCart = (item: CartItem) => {
        const existItemIndex = cartItems.findIndex(c => c.productId === item.productId)

        if(existItemIndex !== -1) {
            const newCartItems = [...cartItems];
            const existingItem = newCartItems[existItemIndex];
            if (existingItem) {
                const currentQty = existingItem.qty || 0;
                const addedQty = item.qty || 0;
                existingItem.qty = currentQty + addedQty;
                setCartItems(newCartItems);
            }
        } else {
            setCartItems((prev) => [...prev, item]);
        }
    };
    const removeFromCart = (index: number) => {
        setCartItems((prevItems) => [
            ...prevItems.slice(0, index),
            ...prevItems.slice(index + 1)
        ])
    };
    const updateItem = (index: number, newItem: CartItem) => {
        setCartItems((prevItems) => {
            if(index < 0 || index >= prevItems.length) {
                console.error("Index out of bounds")
                return prevItems;
            }
            return [
                ...prevItems.slice(0, index),
                newItem,
                ...prevItems.slice(index + 1)
            ];
        })
    };
    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, updateItem}}>
            {children}
        </CartContext.Provider>
    );
};


export default CartProvider;
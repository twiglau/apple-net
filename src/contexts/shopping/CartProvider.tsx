import type { CartItem } from "@/types/custom";
import CartContext from "./CartContext";
import useLocalStorage from "@/hooks/useLocalStorage";


const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);


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
        <CartContext.Provider 
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateItem
        }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartProvider;
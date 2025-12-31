
import CartContext from "./CartContext";
import { useCartAction, cartReducer } from "@/reducers/cartReducer";
import usePersistedReducer from "@/reducers/usePersistedReducer";


const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const [cartItems, dispatch] = usePersistedReducer(cartReducer, [], "cart");
    const { 
        addToCart, 
        removeFromCart, 
        updateCartItem, 
        clearCart 
    } = useCartAction(dispatch);


    
    return (
        <CartContext.Provider 
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateCartItem,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};


export default CartProvider;
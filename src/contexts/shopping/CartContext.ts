import type { CartItem } from "@/types/custom";
import { createContext } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartItem: (index: number, newItem: CartItem) => void;
  clearCart: () => void;
}

const defaultCartContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
};

const cartContext = createContext<CartContextType>(defaultCartContext);

export default cartContext;

import type { CartItem } from "@/types/custom";
import { createContext } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateItem: (index: number, newItem: CartItem) => void;
}

const defaultCartContext: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItem: () => {},
};

const cartContext = createContext<CartContextType>(defaultCartContext);

export default cartContext;

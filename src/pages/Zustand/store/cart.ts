import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSelectItem: (productId: number) => void;
  toggleSelectAll: (checked: boolean) => void;
  clearCart: () => void;
  // 计算属性，通常可以通过 hook selector 实现，或者在这里作为 getter
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getSelectedItems: () => CartItem[];
}

export const useCartStore = create<CartState>((set, get, store) => ({
  items: [],
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1, selected: false }],
        };
      }
    });
  },
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
          : item,
      ),
    }));
  },
  toggleSelectItem: (productId) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, selected: !item.selected } : item,
      ),
    }));
  },
  toggleSelectAll: (checked) => {
    set((state) => {
      return {
        items: state.items.map((item) => ({ ...item, selected: checked })),
      };
    });
  },
  clearCart: () => {
    set(store.getInitialState());
  },
  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  getTotalItems: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.quantity, 0);
  },
  getSelectedItems: () => {
    const items = get().items;
    return items.filter((item) => item.selected);
  },
}));

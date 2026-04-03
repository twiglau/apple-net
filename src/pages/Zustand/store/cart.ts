import { create } from "zustand";
import { immer } from "zustand/middleware/immer"; // 如果需要使用中间件，可以在这里导入

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

export const useCartStore = create<CartState>()(
  immer((set, get, store) => ({
    items: [],
    addToCart: (product) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1, selected: false });
        }
      });
    },
    removeFromCart: (productId) => {
      set((state) => {
        state.items = state.items.filter((item) => item.id !== productId);
      });
    },
    updateQuantity: (productId, quantity) => {
      set((state) => {
        const item = state.items.find((item) => item.id === productId);
        if (item) {
          item.quantity = Math.max(1, item.quantity + quantity);
        }
      });
    },
    toggleSelectItem: (productId) => {
      set((state) => {
        const item = state.items.find((item) => item.id === productId);
        if (item) {
          item.selected = !item.selected;
        }
      });
    },
    toggleSelectAll: (checked) => {
      set((state) => {
        state.items.forEach((item) => {
          item.selected = checked;
        });
      });
    },
    clearCart: () => {
      set((state) => {
        state.items = [];
      });
    },
    getTotalPrice: () => {
      const items = get().items;
      return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    getTotalItems: () => {
      const items = get().items;
      return items.reduce((total, item) => total + item.quantity, 0);
    },
    getSelectedItems: () => {
      const items = get().items;
      return items.filter((item) => item.selected);
    },
  })),
);

import type { CartItem } from "@/types/custom";
import type { Dispatch } from "react";
import type { ImmerReducer } from "use-immer";

// actions
export const addItem = (item: CartItem) => ({
  type: "ADD_ITEM" as const,
  payload: item,
});
export const removeItem = (index: number) => ({
  type: "REMOVE_ITEM" as const,
  payload: index,
});
export const updateItem = (index: number, item: CartItem) => ({
  type: "UPDATE_ITEM" as const,
  payload: { index, item },
});
export const clearCart = () => ({
  type: "CLEAR_CART" as const,
});

export type CartAction =
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof updateItem>
  | ReturnType<typeof clearCart>;

export const useCartAction = (dispatch: Dispatch<CartAction>) => {
  return {
    addToCart: (item: CartItem) => dispatch(addItem(item)),
    removeFromCart: (index: number) => dispatch(removeItem(index)),
    updateCartItem: (index: number, item: CartItem) =>
      dispatch(updateItem(index, item)),
    clearCart: () => dispatch(clearCart()),
  };
};

// reducer
export const cartReducer: ImmerReducer<CartItem[], CartAction> = (
  draft,
  action
) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = draft.findIndex(
        (item: CartItem) => item.productId === action.payload.productId
      );
      if (existingIndex !== -1) {
        const item = draft[existingIndex]!;
        const qty = (item.qty || 0) + (action.payload.qty || 1);
        draft.splice(existingIndex, 1, { ...item, qty });
      } else {
        draft.push(action.payload);
      }
      break;
    }
    case "REMOVE_ITEM":
      draft.splice(action.payload, 1);
      break;
    case "UPDATE_ITEM":
      const { index, item } = action.payload;
      if (index < 0 || index >= draft.length) {
        console.error("Invalid index");
        return;
      } else {
        const target = draft[index]!;
        Object.assign(target, item);
      }
      break;
    case "CLEAR_CART":
      draft.length = 0;
      break;
    default:
      return draft;
  }
};

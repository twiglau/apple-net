import { create } from "zustand";

type AsyncState = {
  counter: number;
  increment: () => void;
};

export const useAsyncStore = create<AsyncState>((set) => ({
  counter: 0,
  increment: () => {
    set((state) => ({ counter: state.counter + 1 }));
  },
}));

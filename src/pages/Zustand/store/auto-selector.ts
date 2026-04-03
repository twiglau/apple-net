import { create } from "zustand";
import { createSelectors } from "./create-selectors";

type AutoSelectorState = {
  counter1: number;
  counter2: number;
  inc_counter1: () => void;
  inc_counter2: () => void;
  dec_counter1: () => void;
  dec_counter2: () => void;
};

export const useAutoSelectorStore = create<AutoSelectorState>((set) => ({
  counter1: 0,
  counter2: 0,
  inc_counter1: () => set((state) => ({ counter1: state.counter1 + 1 })),
  inc_counter2: () => set((state) => ({ counter2: state.counter2 + 1 })),
  dec_counter1: () => set((state) => ({ counter1: state.counter1 - 1 })),
  dec_counter2: () => set((state) => ({ counter2: state.counter2 - 1 })),
}));

export const useStoreSelectors = createSelectors(useAutoSelectorStore);

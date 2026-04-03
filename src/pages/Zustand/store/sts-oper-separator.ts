import { create } from "zustand";
import { createSelectors } from "./create-selectors";

type SeparatorState = {
  a: number;
  b: number;
};
type SeparatorActions = {
  inc_a: () => void;
  inc_b: () => void;
  dec_a: () => void;
  dec_b: () => void;
};

export const useSeparatorStore = create<SeparatorState>((set) => ({
  a: 0,
  b: 0,
}));

export const useAbStore = createSelectors(useSeparatorStore);

const set = useSeparatorStore.setState;

export const actions: SeparatorActions = {
  inc_a() {
    set((state) => ({ a: state.a + 1 }));
  },
  inc_b() {
    set((state) => ({ b: state.b + 1 }));
  },
  dec_a() {
    set((state) => ({ a: state.a - 1 }));
  },
  dec_b() {
    set((state) => ({ b: state.b - 1 }));
  },
};

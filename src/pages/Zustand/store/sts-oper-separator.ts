import { create } from "zustand";
import { createSelectors } from "./create-selectors";

type SeparatorState = {
  a: number;
  b: number;
  reset: () => void;
};
type SeparatorActions = {
  inc_a: () => void;
  inc_b: () => void;
  dec_a: () => void;
  dec_b: () => void;
  reset: () => void;
};

export const useSeparatorStore = create<SeparatorState>((set, get, store) => ({
  a: 0,
  b: 0,
  reset: () => set(store.getInitialState()), // 通过 store.getInitialState() 获取初始状态
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
  reset() {
    set(useSeparatorStore.getInitialState());
  },
};

import { create } from "zustand";

type BasicState = {
  x: number;
  y: number;
  update: (event: MouseEvent) => void;
};

/**
 *  create 接收一个名为 stateCreatorFn 的函数作为参数：
 *  > 1. stateCreatorFn(setState, getState, store){}
 *  > 2. create函数运行之后返回一个react hooks.我们可以利用返回的hook来访问 getState,setState, getInitialState, subscribe等方法
 */
export const useBasicStore = create<BasicState>((set) => ({
  x: 0,
  y: 0,
  update: (event) => {
    set({ x: event.clientX, y: event.clientY });
  },
}));

export function updatePosition(event: MouseEvent) {
  useBasicStore.setState({ x: event.clientX, y: event.clientY });
}

export function getPosition() {
  return useBasicStore.getState();
}

export function subscribeToPositionChange(
  callback: (state: BasicState) => void,
) {
  return useBasicStore.subscribe(callback);
}

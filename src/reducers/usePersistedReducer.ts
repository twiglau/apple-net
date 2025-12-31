import { type ImmerReducer, useImmerReducer } from "use-immer";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, type Dispatch } from "react";

const usePersistedReducer = <S, A>(
  reducer: ImmerReducer<S, A>,
  initialState: S,
  key: string
): [S, Dispatch<A>] => {
  // 1. 从 localStorage 中读取状态
  const [persistedState, setPersistedState] = useLocalStorage<S>(
    key,
    initialState
  );

  // 2. 把 reducer 和持久化状态结合
  const [state, dispatch] = useImmerReducer(reducer, persistedState);

  // 3. 当状态更新时，持久化到 localStorage
  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  return [state, dispatch] as const;
};

export default usePersistedReducer;

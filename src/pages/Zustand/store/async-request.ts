import { create } from "zustand";

export function randomMessage() {
  // 模拟随机消息
  const messages = [
    "Hello from async request!",
    "Welcome to Zustand!",
    "State management made easy.",
    "Async operations are supported.",
    "Enjoy using Zustand!",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
export async function getMessage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { value: randomMessage() };
}

interface MessageState {
  promise: ReturnType<typeof getMessage> | null;
  update: () => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
  promise: null,
  update: () => {
    set({ promise: getMessage() });
  },
}));

import { create } from "zustand";

interface MessageState {
  message: { value: string } | null;
  setMessage: (message: { value: string }) => void;
}

export const messageStore = create<MessageState>((set) => ({
  message: { value: "" },
  setMessage: (message: { value: string }) => set({ message }),
}));

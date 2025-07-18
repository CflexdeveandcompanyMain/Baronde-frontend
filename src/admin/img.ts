import { create } from "zustand";

interface imgInt {
  I: boolean;
  setI: () => void;
}

export const useImage = create<imgInt>()((set) => ({
  I: false,
  setI: () => set((state) => ({ ...state, I: !state.I })),
}));

import { create } from "zustand";

interface GlobalState {
  showCartDesktop: boolean;
  setShowCartDesktop: () => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  showCartDesktop: false,
  setShowCartDesktop() {
    set((state) => ({ ...state, showCartDesktop: !state.showCartDesktop }));
  },
}));

import { create } from "zustand";

interface GlobalState {
  c: any[];
  setC: (item: any) => void;
  showCartDesktop: boolean;
  setShowCartDesktop: () => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  c: [],
  setC(item: any[]) {
    set((state) => ({ ...state, c: item }));
  },
  showCartDesktop: false,
  setShowCartDesktop() {
    set((state) => ({ ...state, showCartDesktop: !state.showCartDesktop }));
  },
}));

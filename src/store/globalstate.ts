import { create } from "zustand";

interface GlobalState {
  c: any[];
  ser: boolean;
  setSer: () => void;
  cartlen: number;
  setCartlen: (len: number) => void;
  setC: (item: any) => void;
  showCartDesktop: boolean;
  setShowCartDesktop: () => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  ser: false,
  setSer() {
    set((state) => ({ ...state, ser: !state.ser }));
  },
  cartlen: 0,
  setCartlen(len) {
    set({ cartlen: len });
  },
  c: [],
  setC(item: any[]) {
    set((state) => ({ ...state, c: item }));
  },
  showCartDesktop: false,
  setShowCartDesktop() {
    set((state) => ({ ...state, showCartDesktop: !state.showCartDesktop }));
  },
}));

import { create } from "zustand";

interface GlobalState {
  c: any[];
  ser: boolean;
  del: boolean;
  setDel: () => void;
  setSer: () => void;
  cartlen: number;
  setCartlen: (len: number) => void;
  setC: (item: any[]) => void;
  showCartDesktop: boolean;
  setShowCartDesktop: () => void;
  brand: string;
  setBrand: (val: string) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  del: false,
  setDel() {
    set((state) => ({ ...state, del: !state.del }));
  },
  brand: "soundprince",

  setBrand(brand: string) {
    sessionStorage.setItem("baron:currbrand", brand);
    set({ brand });
  },

  ser: false,
  setSer() {
    set((state) => ({ ser: !state.ser }));
  },

  cartlen: 0,
  setCartlen(len) {
    set({ cartlen: len });
  },

  c: [],
  setC(item) {
    set({ c: item });
  },

  showCartDesktop: false,
  setShowCartDesktop() {
    set((state) => ({ showCartDesktop: !state.showCartDesktop }));
  },
}));

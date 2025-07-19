import { create } from "zustand";

interface GlobalState {
  c: any[];
  ser: boolean;
  setSer: () => void;
  cartlen: number;
  setCartlen: (len: number) => void;
  setC: (item: any[]) => void; // Fixed: should be any[] not any
  showCartDesktop: boolean;
  setShowCartDesktop: () => void;
  brand: string;
  setBrand: (val: string) => void;
}

export const useGlobalState = create<GlobalState>()((set) => ({
  brand: "soundprince",

  // ✅ Fix: Use get() to access current state
  setBrand(brand: string) {
    set({ brand }); // Cleaner syntax
  },

  ser: false,
  setSer() {
    set((state) => ({ ser: !state.ser })); // Simplified
  },

  cartlen: 0,
  setCartlen(len) {
    set({ cartlen: len });
  },

  c: [],
  setC(item) {
    // Fixed parameter type
    set({ c: item }); // Simplified
  },

  showCartDesktop: false,
  setShowCartDesktop() {
    set((state) => ({ showCartDesktop: !state.showCartDesktop }));
  },
}));

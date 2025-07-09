import { create } from "zustand";

interface NavState {
  mobMenuDrop: boolean;
  mobMenuFn: () => void;
}

export const useNavState = create<NavState>()((set) => ({
  mobMenuDrop: false,
  mobMenuFn: () =>
    set((state) => ({
      mobMenuDrop: !state.mobMenuDrop,
    })),
}));

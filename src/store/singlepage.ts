import { create } from "zustand";
import type { HeroDataType } from "../utils/storage";

interface pageDataT {
  data: HeroDataType;
  setData: (data: HeroDataType) => void;
}

export const usePageData = create<pageDataT>()((set) => ({
  data: {
    name: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    id: 0,
    image: [""],
    stockQuantity: 0,
  },
  setData(data: HeroDataType) {
    set({ data });
  },
}));

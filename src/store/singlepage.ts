import { create } from "zustand";
import type { HeroDataType } from "../mainpage/Hero/data";

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
    keyword: [""],
    brand: "",
    category: "",
    id: 0,
    image: [""],
    stockQuantity: 0,
  },
  setData(data: HeroDataType) {
    set({ data });
  },
}));

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
    categories: "",
    _id: "",
    images: [{ url: "", public_id: "", _id: "" }],
    stockQuantity: 0,
  },
  setData(data: HeroDataType) {
    set({ data });
  },
}));

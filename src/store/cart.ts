import { create } from "zustand";
import { frs1, frs2 } from "..";

interface productInterface {
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface cartState {
  cartProducts: productInterface[];
  cartUpdate: () => void;
}

export const cartStore = create<cartState>()((set: any) => ({
  cartProducts: [
    {
      image: frs1,
      name: "SP-137",
      description:
        "15 Inch / 4000watt / Pure Acostic / 75.5 coil /Double magnet",
      price: 1300000,
      quantity: 1,
    },
    {
      image: frs2,
      name: "SP-215GF",
      description: "15 Inch / 4000watt / Ply wood / 100 coil /Big Magnet",
      price: 1500000,
      quantity: 1,
    },
  ],
  cartUpdate() {
    set();
  },
}));

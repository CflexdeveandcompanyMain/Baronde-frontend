import { Minus, Plus } from "lucide-react";
import type { HeroDataType } from "../mainpage/Hero/data";
import { formatPrice } from "../utils/priceconverter";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";

interface cartInf {
  item: {
    productId: string;
    quantity: number;
    addedAt: number;
  };
  handleDecrement: (id: string) => void;
  handleIncrement: (id: string) => void;
  handleRemove: (id: string) => void;
  quantity: number;
  isAnimating: boolean;
}

export default function CartCard(prop: cartInf) {
  const {
    item,
    handleDecrement,
    handleIncrement,
    handleRemove,
    quantity,
    isAnimating,
  } = prop;

  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (status === "success" && data) {
    const productItem: HeroDataType = data.find(
      (itm: HeroDataType) => itm._id === item.productId
    );

    if (!productItem) {
      return null;
    }

    return (
      <div className="flex flex-col sm:flex-row items-center w-full justify-between p-3 bg-white/80 border-t border-stone-400 pt-3">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="flex flex-row items-center gap-3 w-full self-start">
            <img
              src={productItem.images[0]?.url ?? ""}
              alt={productItem.name}
              className="w-14 h-14 self-start object-cover rounded-sm"
            />
            <div className="flex flex-col items-start gap-1 w-full sm:gap-2 sm:self-center">
              <p className="w-[90%] text-base font-semibold text-start font-all">
                {productItem.name}
              </p>
              <p className="w-[90%] text-[11px] sm:text-[10px] font-normal text-gray-500 text-start font-all">
                {productItem.description.substring(0, 60)}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-end self-center sm:-mt-2 w-full gap-1.5 sm:gap-4 justify-start mt-2">
            <div className="flex flex-col items-center gap-2 self-center sm:w-auto w-full ml-3">
              <div className="flex items-center bg-white rounded border border-stone-200">
                <button
                  onClick={() => handleDecrement(productItem._id)}
                  disabled={quantity <= 1}
                  className={
                    "w-7 h-7 flex items-center border-r border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  }
                >
                  <Minus className="text-gray-700" size={16} />
                </button>

                <div className="w-7 h-7 flex items-center justify-center">
                  <span
                    className={`text-base font-semibold text-gray-800 transition-all duration-200 ${
                      isAnimating ? "scale-125 text-gray-600" : "scale-100"
                    }`}
                  >
                    {quantity}
                  </span>
                </div>

                <button
                  onClick={() => handleIncrement(productItem._id)}
                  className={
                    "w-7 h-7 flex items-center border-l border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  }
                >
                  <Plus className="text-gray-700" size={16} />
                </button>
              </div>
              <div
                onClick={() => handleRemove(productItem._id)}
                className="flex justify-center cursor-pointer"
              >
                <p className="text-sm text-stone-500 text-center font-all font-medium hover:text-red-500 transition-colors">
                  remove
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-1/4 w-full flex justify-start sm:my-auto mt-3 sm:justify-end self-start sm:self-center">
          <p className="font-all text-sm sm:text-xs text-center bg-green-100/20 sm:border-none border rounded-lg border-green-500/20 p-2.5 font-medium self-center text-green-700">
            {formatPrice(quantity * productItem.price, "NGN")}
          </p>
        </div>
      </div>
    );
  }

  return null;
}

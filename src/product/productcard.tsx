import { useGlobalState } from "../store/globalstate";
import { formatPrice, uniqueByName } from "../utils/priceconverter";
import { useCart, type HeroDataType } from "../utils/storage";

export default function ProductCard(data: HeroDataType) {
  let { addToCart, cart } = useCart();
  let { setCartlen } = useGlobalState();

  return (
    <div className="flex flex-col border border-green-200/50 relative items-center self-stretch h-full justify-between w-[200px] bg-white p-2">
      <div className="flex flex-col items-center h-[50%]">
        <img
          src={data.image[0]}
          className="object-cover h-full w-full bg-white"
        />
        <div className="flex justify-center bg-[#fdb204f3] p-1 shadow absolute top-1.5 left-1.5 ">
          <p
            className={`text-white font-all text-center text-xs font-semibold`}
          >
            {formatPrice(34000, "NGN")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
        <p className={`text-start font-medium font-all text-sm w-full`}>
          {data.name}
        </p>
        <p className="font-normal text-start font-all text-xs text-gray-600 w-full">
          {data.description}
        </p>
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-[#fdb100] text-[12px] text-start font-medium font-all">
            {formatPrice(data.price, "NGN")}
          </p>
          <p
            className={`text-black text-[10px] text-start font-all line-through`}
          >
            {formatPrice(17000, "NGN")}
          </p>
        </div>
        <button
          onClick={() => {
            console.log("atc");
            addToCart(data);
            setCartlen(uniqueByName(cart).length);
          }}
          type="button"
          className={`bg-green-700 shadow text-sm p-2 w-full font-all font-normal text-white`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

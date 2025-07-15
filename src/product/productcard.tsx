import { formatPrice } from "../utils/priceconverter";
import { useCart, type HeroDataType } from "../utils/storage";

export default function ProductCard(data: HeroDataType) {
  let { addToCart } = useCart();
  return (
    <div className="flex flex-col items-center self-stretch h-full justify-between w-[200px] bg-white p-2">
      <div className="relative flex flex-col items-center h-[50%]">
        <img
          src={data.image[0]}
          className="object-cover h-full w-full bg-white"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
        <p className={`text-start font-medium font-all text-sm w-full`}>
          {data.name}
        </p>
        <p className="font-normal text-start font-all text-xs text-gray-600 w-full">
          {data.description}
        </p>
        <div className="flex items-center w-full justify-start">
          <p className="text-[#F0B100] text-sm text-start font-medium font-all">
            {formatPrice(data.price, "NGN")}
          </p>
        </div>
        <button
          onClick={() => {
            console.log("atc");
            addToCart(data);
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

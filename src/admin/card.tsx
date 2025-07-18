import type { HeroDataType } from "../mainpage/Hero/data";
import { formatPrice } from "../utils/priceconverter";

export default function AdminCard({ data }: { data: HeroDataType }) {
  return (
    <div className="flex flex-col items-center sm:shadow justify-between w-auto min-h-full border border-green-100 sm:min-w-[200px] p-2  bg-white">
      <div className="flex flex-col items-center h-[50%] relative">
        <div className="absolute top-2 inset-x-0 flex justify-center w-full h-full">
          <p className="font-all font-bold text-lg text-[#E7FFC078] self-center text-center rotate-45">
            barondemusical
          </p>
        </div>
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
        <p className="font-normal text-justify font-all text-[13px] text-gray-600 w-full">
          {data.description.replaceAll("/", "||")}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between">
          <p className="text-[#fdb100] text-sm text-start font-medium font-all">
            {formatPrice(data.price - 34000, "NGN")}
          </p>
          <p
            className={`text-black text-[11px] text-start font-medium font-all line-through`}
          >
            {formatPrice(data.price, "NGN")}
          </p>
        </div>
        <div className="w-full flex justify-start gap-1">
          <p className="font-all text-xs font-medium self-center">Brand:</p>
          <div className="bg-green-100 border flex justify-center self-center border-green-400 py-[1px] px-1 rounded-lg">
            <p
              className={`text-start font-medium font-all self-center text-xs`}
            >
              {data.brand}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={`border border-green-700/40 text-xs mt-2 p-2.5 w-full font-all font-medium text-green-700`}
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}

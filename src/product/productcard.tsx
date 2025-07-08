import { p1 } from "..";

export default function ProductCard() {
  return (
    <div className="flex flex-col items-center shadow justify-center min-w-[200px]">
      <div className="relative flex flex-col items-center">
        <img src={p1} className="object-cover max-h-[200px] w-full" />
        <div className="flex justify-center bg-[#E5A000] p-1 shadow absolute top-0 left-2">
          <p className="text-white font-all text-center text-xs">
            Save N34,000.00
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-1.5 bg-gray-100 p-1.5">
        <p className="font-medium text-center font-all text-sm">
          Speaker model: SP515
        </p>
        <p className="font-normal text-center font-all text-xs text-gray-400">
          15INCH BIG MAGNET /// 4800watt /// Pure Acostic / 100 coil /Double
          Magnet
        </p>
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-[#E5A000] text-sm text-start font-all">
            N2,500,000
          </p>
          <p className="text-black text-xs text-start font-all line-through">
            N17,000.00
          </p>
        </div>
        <button
          type="button"
          className={`bg-green-700 shadow text-sm p-2 w-full font-all font-normal text-white`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

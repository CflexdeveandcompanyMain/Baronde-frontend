import { MoveDown, MoveUp, Search, Wallet } from "lucide-react";
import { formatPrice } from "../utils/priceconverter";

let data = [
  {
    count: 56,
    title: "Total payments",
    icon: <Wallet size={18} className="text-green-700" />,
  },
  {
    count: 0,
    title: "Failed payments",
    icon: <Wallet size={18} className="text-green-700" />,
  },
  {
    count: 56,
    title: "Sucessful payments",
    icon: <Wallet size={18} className="text-green-700" />,
  },
];

export default function AdminPayment() {
  return (
    <section className="w-full flex flex-col items-start">
      <section className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-col items-center sm:gap-2 justify-start w-full sm:w-3/4">
          <p className="font-all text-lg sm:text-2xl text-[#262626] font-medium text-start w-full">
            Payment Overview
          </p>
          <p className="font-all text-sm text-stone-600 text-start w-full font-medium">
            Track, verify, and manage all payment transactions in one place.
          </p>
        </div>
        <div className="hidden sm:flex justify-end w-1/4 self-center -mt-3">
          <Search size={16} />
        </div>
      </section>
      <div className="flex flex-row items-center gap-2 sm:justify-between justify-start sm:w-1/2 w-full my-3">
        <button className="rounded-lg shadow bg-green-700 w-full p-2 text-white font-all text-sm font-semibole">
          Overview
        </button>
        <button className="rounded-lg shadow border p-2 border-green-700 w-full text-green-700 font-all text-sm font-semibole">
          Transaction History
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
        <div className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="font-all text-base font-semibold text-start">
              {formatPrice(1200000, "NGN")}
            </p>
            <div className="p-2 shadow rounded-lg">
              <Wallet size={18} className="text-green-700" />
            </div>
          </div>
          <p className="font-all text-base text-start w-full font-medium text-stone-500">
            Total Amount
          </p>
          <div className="flex flex-row items-center w-full justify-start">
            <MoveUp size={18} className="text-green-500 self-center" />
            <p className="font-semibold text-start w-full text-green-500">
              {Math.floor(Math.random() * 12)}
            </p>
          </div>
        </div>
        {data.map((item, index: number) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg"
            >
              <div className="flex flex-row items-center w-full justify-between">
                <p className="font-all text-lg font-semibold text-start">
                  {item.count}
                </p>
                <div className="p-2 shadow rounded-lg">{item.icon}</div>
              </div>
              <p className="font-all text-sm text-start w-full font-medium text-stone-500">
                {item.title}
              </p>
              <div className="flex flex-row items-center w-full justify-start">
                {item.title.startsWith("Failed") ? (
                  <MoveDown size={15} className="text-green-500 self-center" />
                ) : (
                  <MoveUp size={15} className="text-green-500 self-center" />
                )}
                <p className="font-semibold text-start w-full text-green-500">
                  {Math.floor(Math.random() * 12) + "%"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

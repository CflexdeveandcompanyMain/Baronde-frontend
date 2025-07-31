import { Check } from "lucide-react";
import { formatPrice } from "../utils/priceconverter";

export default function CheckoutSuccess() {
  return (
    <section className="w-full h-screen bg-slate-100 flex justify-center">
      <div className="sm:w-[55%] flex flex-col justify-center w-[90%] mx-auto shadow-xl gap-4 self-center h-[350px] my-auto rounded-lg bg-white p-3">
        <div className="flex justify-center w-20 h-20 rounded-full mx-auto bg-green-500">
          <Check className="text-white self-center" size={40} />
        </div>
        <div className="flex flex-col items-center sm:w-4/5 mx-auto w-[95%]">
          <p className="font-all text-xl font-semibold text-stone-800">
            Payment Successful!
          </p>
          <p className="text-base font-all text-center w-full">
            We have received payment of:
          </p>
        </div>
        <p className="font-all text-xl text-center w-full font-semibold">
          {formatPrice(500000, "NGN")}
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-black p-2 text-sm my-3 rounded sm:w-2/5 w-1/2 mx-auto shadow text-white font-all"
        >
          Go back home
        </button>
      </div>
    </section>
  );
}

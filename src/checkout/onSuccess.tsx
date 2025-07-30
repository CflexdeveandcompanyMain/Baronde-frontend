import { Check } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <section className="w-full h-screen bg-slate-100 flex justify-center">
      <div className="sm:w-[55%] flex flex-col justify-center w-[90%] mx-auto shadow-xl self-center h-[300px] my-auto rounded-lg bg-white p-3">
        <div className="flex justify-center w-20 h-20 rounded-full bg-green-500">
          <Check className="text-white self-center" size={40} />
        </div>
      </div>
    </section>
  );
}

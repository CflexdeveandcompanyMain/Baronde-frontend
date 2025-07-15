import { useState } from "react";
import { cartStore } from "../../store/cart";
import { useGlobalState } from "../../store/globalstate";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function CartDisplay() {
  let { cartProducts } = cartStore();
  let { showCartDesktop, setShowCartDesktop } = useGlobalState();

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };
  return (
    <button
      ref={focusRef}
      onBlur={setShowCartDesktop}
      className={`${
        showCartDesktop ? "sm:flex" : "sm:hidden"
      } flex-col items-center gap-3 hidden min-w-[500px] border-stone-100 border outline-none absolute top-10 bg-white z-40 right-0 p-3`}
    >
      <div className="w-full flex flex-col items-center overflow-y-scroll h-3/5">
        {cartProducts.map((item, index: number) => {
          return (
            <div key={index}>
              <CartProduct data={item} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center w-[95%] mx-auto gap-2">
        <div className="flex flex-row items-center w-full justify-between">
          <p className="font-all text-base font-medium text-start w-full">
            Total
          </p>
          <p className="font-all text-sm font-semibold text-end w-full">
            N2,600,000.00
          </p>
        </div>
        <div className="flex flex-row items-center w-full justify-between gap-4">
          <Link className="w-full" to={"/cart"}>
            <div className="w-full p-2 bg-amber-600 text-center font-all font-medium text-sm text-white">
              View Cart
            </div>
          </Link>
          <Link className="w-full" to={"/checkout"}>
            <div className="w-full p-2 bg-green-600 text-center font-all font-medium text-sm text-white">
              Checkout
            </div>
          </Link>
        </div>
      </div>
    </button>
  );
}

function CartProduct({ data }: { data: any }) {
  let [count, setcount] = useState(0);
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        <img src={data.image} className="object-cover h-24 w-24" />
        <div className="flex flex-row items-center w-full gap-2 self-stretch ">
          <div className="flex flex-col items-start w-full h-full justify-evenly ">
            <div className="flex flex-col items-center gap-2 w-full">
              <p className="font-all text-base text-start w-full">
                {data.name}
              </p>
              <p className="font-all text-[10px] text-start w-full text-gray-500">
                {data.description}
              </p>
            </div>
            <p className="font-all text-sm text-start w-full text-green-800">
              {"N" + data.price}
            </p>
          </div>
          <div className="w-full flex justify-center self-center">
            <div className="w-3/5 mx-auto flex flex-row items-center border rounded border-stone-500 justify-between">
              <div className="flex justify-center w-full py-2">
                <MinusIcon onClick={() => setcount(count - 1)} size={16} />
              </div>
              <p className="font-all font-medium text-sm text-center w-full py-2 border-x border-stone-500">
                {count < 0 ? 0 : count}
              </p>
              <div className="flex justify-center w-full py-2">
                <PlusIcon onClick={() => setcount(count + 1)} size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full mx-auto bg-stone-600 my-3"></div>
    </>
  );
}

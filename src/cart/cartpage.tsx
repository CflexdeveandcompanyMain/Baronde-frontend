import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { formatPrice, uniqueByName } from "../utils/priceconverter";
import { ChevronDown, Minus, Plus, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../utils/storage";
import { empty } from "..";
import { useGlobalState } from "../store/globalstate";
import type { HeroDataType } from "../mainpage/Hero/data";

export default function CartPage() {
  const cartData = useCart();
  const [data, setData] = useState<HeroDataType[]>(cartData.cart);

  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleIncrement = (id: number) => {
    cartData.incrementQuantity(id);
    triggerAnimation();
  };

  let { setCartlen } = useGlobalState();

  const handleDecrement = (id: number) => {
    cartData.decrementQuantity(id);
    triggerAnimation();
  };

  useEffect(() => {
    setData(uniqueByName(data));
    setCartlen(uniqueByName(data).length);
  }, []);

  const handleRemove = (id: number) => {
    const res: any[] = cartData.removeAllInstances(id);
    setData(res);
  };

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-screen bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto md:w-4/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-start w-full gap-2">
            <p className="font-all text-lg font-semibold text-start w-full">
              My Cart ({data.length} items)
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center w-full md:gap-5">
            <div className="flex flex-col items-start md:w-[65%] w-full bg-white sm:p-4 rounded md:rounded-b rounded-t rounded-x">
              <div className="flex flex-row items-start w-full justify-start gap-2 pb-1">
                <p className="font-all text-sm text-start w-full font-semibold">
                  Product
                </p>
                <p className="font-all text-sm text-center w-full font-semibold">
                  Quantity
                </p>
                <p className="font-all text-sm text-end w-full font-semibold">
                  Total
                </p>
              </div>
              <div className="flex flex-col w-full items-center gap-3">
                {data.length > 0 ? (
                  data.map((item: HeroDataType, index: number) => {
                    const quantity = cartData.getProductQuantity(item.id);
                    return (
                      <div key={index} className="w-full">
                        <div className="flex flex-col sm:flex-row items-center w-full justify-between p-3 bg-white/80 border-t border-stone-400 pt-3">
                          <div className="flex flex-row items-center gap-3 w-3/4 self-start">
                            <img
                              src={item.image[0]}
                              alt={item.name}
                              className="w-16 h-16 self-start object-cover rounded-sm"
                            />
                            <div className="flex flex-col items-start gap-1 w-full sm:gap-5 sm:self-center">
                              <div className="flex flex-col items-start gap-2">
                                <p className="w-full text-base font-semibold text-start font-all">
                                  {item.name}
                                </p>
                                <p className="w-full sm:text-[10px] text-sm font-normal text-gray-500 text-start font-all">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start self-center sm:-mt-2 w-full gap-1.5 sm:gap-4 justify-start mt-2">
                            <div className="flex flex-col items-center gap-2 self-center sm:w-auto w-full">
                              <div className="flex items-center bg-white rounded border border-stone-200">
                                <button
                                  onClick={() => handleDecrement(item.id)}
                                  disabled={quantity === 0}
                                  className={
                                    "w-7 h-7 flex items-center border-r border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                  }
                                >
                                  <Minus className="text-gray-700" size={16} />
                                </button>

                                <div className="w-7 h-7 flex items-center justify-center">
                                  <span
                                    className={`text-base font-semibold text-gray-800 transition-all duration-200 ${
                                      isAnimating
                                        ? "scale-125 text-gray-600"
                                        : "scale-100"
                                    }`}
                                  >
                                    {quantity || 1}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleIncrement(item.id)}
                                  className={
                                    "w-7 h-7 flex items-center border-l border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                  }
                                >
                                  <Plus className="text-gray-700" size={16} />
                                </button>
                              </div>
                              <div
                                onClick={() => handleRemove(item.id)}
                                className="flex justify-center cursor-pointer"
                              >
                                <p className="text-sm text-stone-500 text-center font-all font-medium hover:text-red-500 transition-colors">
                                  remove
                                </p>
                              </div>
                            </div>
                            <div className="w-full flex justify-end self-start sm:self-center">
                              <p className="font-all text-xs text-center font-medium self-center text-green-700">
                                {formatPrice(quantity * item.price, "NGN")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center gap-1 p-8">
                    <p className="w-full text-center text-gray-500">
                      Your cart is empty
                    </p>
                    <img src={empty} className="w-[90%] object-cover mx-auto" />
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-[35%] w-full gap-5 justify-between self-stretch">
              <div className="flex flex-col bg-white sm:p-5 md:rounded-t rounded-b rounded-x items-start w-full gap-1">
                <div className="flex flex-row items-center w-full justify-between border-b border-stone-400 py-3">
                  <p className="font-all text-sm font-medium text-start text-stone-500">
                    Total
                  </p>
                  <p className="font-all text-xs font-medium text-start text-green-700">
                    {formatPrice(cartData.totals.total, "NGN")}
                  </p>
                </div>
                <div className="flex flex-row items-center w-full justify-between border-b border-stone-400 py-3">
                  <p className="font-all text-sm font-medium text-start text-stone-500">
                    Order instruction
                  </p>
                  <div className="flex justify-center">
                    <ChevronDown size={18} className="text-gray-600" />
                  </div>
                </div>
                <div className="flex justify-center w-full py-1">
                  <p className="font-all text-xs text-center self-center text-stone-700">
                    Tax included
                    <span className="text-orange-600 underline mx-0.5">
                      Shipping
                    </span>
                    calculated at checkout
                  </p>
                </div>
                <button
                  className="w-full bg-green-700 text-white text-xs font-all text-center p-2.5 mb-2 mt-4 rounded disabled:bg-gray-400"
                  disabled={cartData.cart.length === 0}
                >
                  Checkout
                </button>
              </div>
              <div className="flex flex-row items-center w-full justify-center gap-1 self-end">
                <ShieldCheck className="self-end" size={18} />
                <p className="font-all text-sm font-medium mt-3 text-stone-900 self-start">
                  100% secure payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { formatPrice } from "../utils/priceconverter";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, type LocalCartItem } from "../utils/storage";
import { empty } from "..";
import { useGlobalState } from "../store/globalstate";
import CartCard from "./cartd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";

export default function CartPage() {
  const cartData = useCart();
  const [cartdata, setData] = useState<LocalCartItem[]>(cartData.cart);
  const [total, setTotal] = useState(0);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  useEffect(() => {
    if (products && cartdata.length > 0) {
      const newTotal = cartdata.reduce((sum, item) => {
        const product = products.find((p: any) => p._id === item.productId);
        if (product) {
          const quantity = cartData.getProductQuantity(item.productId);
          return sum + quantity * product.price;
        }
        return sum;
      }, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cartdata, products, cartData]);

  const isVerified = JSON.parse(
    sessionStorage.getItem("baron:user") || "{}"
  ).isVerified;

  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleIncrement = (id: string) => {
    cartData.incrementQuantity(id);
    setData([...cartData.cart]);
    triggerAnimation();
  };

  let { setCartlen } = useGlobalState();

  const handleDecrement = (id: string) => {
    cartData.decrementQuantity(id);
    setData([...cartData.cart]);
    triggerAnimation();
  };

  const handleRemove = (id: string) => {
    const res: any[] = cartData.removeAllInstances(id);
    setData(res);
  };

  useEffect(() => {
    setCartlen(cartdata.length);
  }, [cartdata, setCartlen]);

  const navigate = useNavigate();

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-screen bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto md:w-4/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-start w-full gap-2">
            <p className="font-all text-lg font-semibold text-start w-full">
              My Cart ({cartdata.length} items)
            </p>
          </div>
          <div className="flex md:flex-row flex-col items-center w-full md:gap-5">
            <div className="flex flex-col items-start md:w-[65%] w-full bg-white sm:p-4 rounded md:rounded-b rounded-t rounded-x">
              <div className="flex flex-row items-center w-full justify-start gap-2 pb-1">
                <div className="w-full flex">
                  <p className="font-all sm:flex hidden text-sm text-start font-semibold">
                    Product
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <p className="font-all sm:flex hidden text-sm text-start font-semibold">
                    Quantity
                  </p>
                </div>
                <div className="w-full flex justify-center">
                  <p className="font-all sm:flex hidden text-sm font-semibold">
                    Total
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full items-center gap-3">
                {cartdata.length > 0 ? (
                  cartdata.map((item: LocalCartItem, index: number) => {
                    const quantity = cartData.getProductQuantity(
                      item.productId
                    );
                    return (
                      <div key={index} className="w-full">
                        <CartCard
                          item={item}
                          handleDecrement={handleDecrement}
                          handleIncrement={handleIncrement}
                          handleRemove={handleRemove}
                          isAnimating={isAnimating}
                          quantity={quantity}
                        />
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
                    {formatPrice(total, "NGN")}
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
                  onClick={() => navigate(isVerified ? "/checkout" : "/signup")}
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

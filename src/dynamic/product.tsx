import { useState } from "react";
import { formatPrice } from "../utils/priceconverter";
import { Minus, Plus, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, type HeroDataType } from "../utils/storage";
import { usePageData } from "../store/singlepage";

export default function ProductAuthCard({ data }: { data: HeroDataType }) {
  let [image, setImage] = useState(data.image[0]);
  let [view, setView] = useState(false);
  let [count, setcount] = useState(0);
  let isSingleImage = data.image.length === 1;
  const [isAnimating, setIsAnimating] = useState(false);

  const { incrementQuantity, decrementQuantity, addToCart, isInCart } =
    useCart();

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleDecrement = () => {
    setcount(count < 0 ? 0 : count - 1);
    triggerAnimation();
    decrementQuantity(data.id);
  };

  const handleIncrement = () => {
    setcount(count + 1);
    triggerAnimation();
    incrementQuantity(data.id);
  };

  let navigate = useNavigate();
  let { setData } = usePageData();

  return (
    <div className="relative flex flex-col">
      <div
        onClick={() => {
          setData(data);
          navigate(`/singleproduct/${data.name}-${data.id}`);
        }}
        className="flex flex-col items-center shadow justify-between w-auto sm:min-w-[200px] bg-white"
      >
        <div className="relative flex flex-col items-center">
          <img
            src={data.image[0]}
            className="object-cover max-h-[200px] w-full bg-white"
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
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(data);
            }}
            type="button"
            className={`bg-green-700 shadow text-sm p-2 w-full font-all font-normal text-white`}
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setView(!view);
            }}
            type="button"
            className={`border border-green-700 shadow text-sm p-2 w-full font-all font-normal text-green-700`}
          >
            Quick view
          </button>
        </div>
      </div>
      <div
        className={` ${
          view ? "flex" : "hidden"
        } justify-center w-full h-screen fixed bg-black/30 z-50 inset-0`}
      >
        <div className="flex sm:flex-row flex-col items-center gap-3 p-3 justify-between min-h-[350px] sm:w-3/4 w-[90%] mx-auto self-center bg-white">
          <div className="w-full justify-end sm:hidden flex">
            <X
              onClick={() => setView(!view)}
              className="self-end text-end justify-self-end cursor-pointer"
              size={24}
              stroke="4"
            />
          </div>
          <div className="flex flex-row items-center border border-stone-200 w-full rounded self-stretch gap-2">
            <div
              className={`${
                isSingleImage ? "hidden" : "flex"
              } flex flex-col items-start gap-0.5 w-1/5 justify-start self-start`}
            >
              {isSingleImage ? (
                <></>
              ) : (
                data.image.map((item) => {
                  return (
                    <img
                      onClick={() => setImage(item)}
                      src={item}
                      className="w-full round object-cover h-full"
                    />
                  );
                })
              )}
            </div>
            <img src={image} className="object-cover w-3/4 bg-white" />
          </div>
          <div className="w-full flex flex-col items-start justify-between self-stretch gap-1">
            <div className="w-full sm:flex hidden justify-end pb-2">
              <X
                onClick={() => setView(!view)}
                size={24}
                className="self-end text-end justify-self-end cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2 border-b border-stone-400 pb-4">
              <p className="font-all sm:text-lg text-sm font-semibold text-start w-full">
                {data.name}
              </p>
              <p className="font-all sm:text-sm text-xs font-medium text-start w-full">
                {data.description}
              </p>
            </div>
            <div className="flex flex-col items-start w-full gap-3">
              <div className="flex flex-row items-center gap-7">
                <p className="font-all text-sm sm:text-base text-gray-500 font-medium">
                  Price
                </p>
                <p className="font-all text-sm sm:text-base text-gray-500 font-medium">
                  {formatPrice(data.price, "NGN")}
                </p>
              </div>
              <div className="flex flex-row items-center w-full gap-3">
                <p className="font-all text-sm sm:text-base text-gray-500 font-medium">
                  Quantity
                </p>
                <div className="flex items-center bg-white rounded border border-stone-200">
                  <button
                    onClick={handleDecrement}
                    disabled={count === 0}
                    className={
                      "w-10 h-8 flex items-center border-r border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    }
                  >
                    <Minus className="text-gray-700" size={16} />
                  </button>

                  <div className="w-10 h-8 flex items-center justify-center">
                    <span
                      className={`text-base font-semibold text-gray-800 transition-all duration-200 ${
                        isAnimating ? "scale-125 text-gray-600" : "scale-100"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <button
                    disabled={!isInCart(data.id)}
                    onClick={handleIncrement}
                    className={
                      "w-10 h-8 flex items-center border-l border-stone-300 justify-center disabled:bg-gray-100 transform transition-all duration-200 hover:scale-110 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    }
                  >
                    <Plus className="text-gray-700" size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center w-full justify-between gap-4">
                <Link className="w-full" to={"/cart"}>
                  <div className="w-full p-3 bg-amber-600 text-center font-all font-medium text-sm text-white">
                    Add Cart
                  </div>
                </Link>
                <div
                  onClick={() => setView(!view)}
                  className="w-full p-3 bg-green-600 text-center font-all font-medium text-sm text-white"
                >
                  Continue shopping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

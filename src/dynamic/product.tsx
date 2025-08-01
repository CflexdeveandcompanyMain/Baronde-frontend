import { useState } from "react";
import { formatPrice } from "../utils/priceconverter";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../utils/storage";
import { usePageData } from "../store/singlepage";
import type { HeroDataType } from "../mainpage/Hero/data";
import { motion } from "framer-motion";
export default function ProductAuthCard({ data }: { data: HeroDataType }) {
  let [image, setImage] = useState(data.images[0].url);
  let [view, setView] = useState(false);
  let [count, setcount] = useState(0);
  let isSingleImage = data.images.length === 1;
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    incrementQuantity,
    decrementQuantity,
    addToCart,
    isInCart,
    getProductQuantity,
  } = useCart();

  const blockToAdd = isInCart(data._id);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const handleDecrement = () => {
    setcount(count < 0 ? 0 : count - 1);
    triggerAnimation();
    decrementQuantity(data._id);
  };

  const handleIncrement = () => {
    setcount(count + 1);
    triggerAnimation();
    incrementQuantity(data._id);
  };

  let navigate = useNavigate();
  let { setData } = usePageData();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col self-stretch h-full flex-grow"
    >
      <div
        onClick={() => {
          setData(data);
          navigate(`/singleproduct/${data.name}-${data._id}`);
        }}
        className="flex flex-col items-center justify-between w-auto min-h-full border border-stone-200 sm:min-w-[200px] p-2  bg-white"
      >
        <div className="flex flex-col items-center h-[50%] relative">
          <div className="relative w-full h-full">
            <img
              src={data.images[0].url}
              className="object-cover h-full w-full bg-white"
              alt="Content image"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="font-all font-bold text-base text-[#7bc700bb] transform rotate-45 select-none">
                barondemusical
              </p>
            </div>
          </div>
          <div className="flex justify-center bg-[#fdb204f3] p-1 shadow absolute top-1.5 left-1.5 ">
            <p
              className={`text-white font-all text-center text-xs font-semibold`}
            >
              {formatPrice(data.discount, "NGN")}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
          <p className={`text-start font-medium font-all text-sm w-full`}>
            {data.name}
          </p>
          <p className="font-normal text-start font-all text-[13px] text-gray-600 w-full">
            {data.description.replaceAll("/", "||")}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between">
            <p className="text-[#fdb100] text-sm text-start font-medium font-all">
              {formatPrice(data.price - data.discount, "NGN")}
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
            disabled={blockToAdd}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (isInCart(data._id)) navigate("/cart");
              else {
                addToCart(data);
              }
            }}
            type="button"
            className={`bg-green-700 shadow text-xs p-2.5 w-full font-all disabled:bg-gray-300 font-medium text-white`}
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setView(!view);
            }}
            type="button"
            className={`border border-green-700/40 text-xs mt-0.5 p-2.5 w-full font-all font-medium text-green-700`}
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
        <div className="flex sm:flex-row flex-col items-center gap-3 p-3 justify-between min-h-[400px] sm:w-3/4 w-[90%] mx-auto self-center bg-white">
          <div className="w-full justify-end sm:hidden flex">
            <X
              onClick={() => setView(!view)}
              className="self-end text-end justify-self-end cursor-pointer"
              size={24}
              stroke="4"
            />
          </div>
          <div className="flex flex-row items-center border-r border-stone-200 w-full self-stretch gap-2">
            <div
              className={`${
                isSingleImage ? "hidden" : "flex"
              } flex flex-col items-start gap-1 w-1/5 justify-start self-start`}
            >
              {isSingleImage ? (
                <></>
              ) : (
                data.images.map((item, index: number) => {
                  return (
                    <div key={index} onClick={() => setImage(item.url)}>
                      <div className="relative w-full h-full">
                        <img
                          src={item.url}
                          className="object-cover h-full w-full bg-white"
                          alt="Content image"
                        />

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="font-all font-bold text-[7px] text-[#7bc700bb] transform rotate-45 select-none">
                            barondemusical
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="relative w-full h-full max-h-[400px]">
              <img
                src={image}
                className="object-cover h-full w-full bg-white"
                alt="Content image"
              />

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="font-all font-bold text-lg text-[#7bc700bb] transform rotate-45 select-none">
                  barondemusical
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start self-stretch gap-3">
            <div className="w-full sm:flex hidden justify-end pb-2">
              <X
                onClick={() => setView(!view)}
                size={24}
                className="self-end text-end justify-self-end cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2 border-b border-stone-400 pb-4">
              <p className="font-all sm:text-xl text-sm font-semibold text-start w-full">
                {data.name}
              </p>
              <p className="font-all sm:text-base text-xs font-medium text-start w-full">
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
                    disabled={getProductQuantity(data._id) === 0}
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
                      {getProductQuantity(data._id)}
                    </span>
                  </div>

                  <button
                    disabled={!isInCart(data._id)}
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
                <button
                  disabled={blockToAdd}
                  onClick={() => addToCart(data)}
                  className="w-full p-3 bg-amber-600 disabled:bg-gray-300"
                >
                  <p className="w-full text-center font-all font-medium text-xs sm:text-sm text-white">
                    Add Cart
                  </p>
                </button>
                <div
                  onClick={() => setView(!view)}
                  className="w-full p-3 bg-green-600 text-center font-all font-medium text-xs sm:text-sm text-white"
                >
                  Continue shopping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

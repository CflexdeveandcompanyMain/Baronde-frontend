import { useEffect, useState } from "react";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import { usePageData } from "../store/singlepage";
import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { formatPrice /**uniqueByName*/ } from "../utils/priceconverter";
import { useCart } from "../utils/storage";

export default function SingleProductPage() {
  let [count, setcount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    incrementQuantity,
    decrementQuantity,
    addToCart,
    isInCart,
    getProductQuantity,
  } = useCart();
  let { data } = usePageData();

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

  let [Image, setImage] = useState(data.images[0].url);
  let isSingleImage = data.images.length === 1;
  console.log(data);
  const blockToAdd = isInCart(data._id);

  useEffect(() => {
    console.log(Image);
  }, [Image]);

  return (
    <>
      <MainPageNavbar />
      <section className="w-full bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4 py-5">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto md:w-3/4 mx-auto mt-4 sm:mt-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
            <div className="flex flex-row items-center border border-stone-200 p-1 bg-white w-full rounded self-stretch gap-[2px]">
              <div
                onClick={() => console.log("Maeny")}
                className={`${
                  isSingleImage ? "hidden" : "flex"
                } flex flex-col items-start gap-0.5 w-1/5 justify-start self-start`}
              >
                {isSingleImage ? (
                  <></>
                ) : (
                  data.images.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setImage(item.url);
                        }}
                        className={`${
                          item.url === Image ? "border-3 border-green-400" : ""
                        } cursor-pointer w-full h-16 sm:h-20 rounded`} // Added explicit height and cursor
                      >
                        <div className="relative w-full h-full">
                          <img
                            src={item.url}
                            className="object-cover h-full w-full bg-white rounded"
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
                  src={Image}
                  className="object-cover h-full w-full bg-white rounded"
                  alt="Content image"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="font-all font-bold text-lg text-[#7bc700bb] transform rotate-45 select-none">
                    barondemusical
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start self-stretch gap-1 bg-white p-3">
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
                <div className="flex flex-row items-center w-full justify-between gap-4 self-end">
                  <Link className="w-full" to={"/cart"}>
                    <div className="w-full p-3 bg-amber-600 text-center font-all font-medium text-sm text-white">
                      View cart
                    </div>
                  </Link>
                  <button
                    disabled={blockToAdd}
                    onClick={() => addToCart(data)}
                    className="w-full p-3 bg-green-800 disabled:bg-gray-300 cursor-pointer text-center font-all font-medium text-sm text-white"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center p-2 sm:p-6 shadow bg-white justify-start">
              <p className="font-all text-base text-stone-400 w-full text-start sm:text-xl font-semibold">
                Description
              </p>

              <ul className="flex flex-col items-start w-full pl-5 gap-2">
                <li className="font-all text-xs text-start list-disc">
                  Premium sound quality with professional-grade components.
                  Crystal clear audio and durable build. Perfect for music
                  lovers..
                </li>
                <li className="font-all text-xs text-start list-disc">
                  Advanced acoustic technology delivers rich, balanced sound.
                  Easy setup with universal compatibility. Exceptional value.
                </li>
                <li className="font-all text-xs text-start list-disc">
                  Studio-quality audio reproduction with enhanced bass response.
                  Sleek design meets superior performance. Highly rated.
                </li>
                <li className="font-all text-xs text-start list-disc">
                  Professional-grade drivers provide immersive listening
                  experience. Premium materials and reliable construction.
                  Trusted quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

import { desktopHero, p1 } from "../..";
import HeroProductCard from "./herocard";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/priceconverter";

export default function MainPageHero() {
  let { isVerified } = JSON.parse(sessionStorage.getItem("baron:user") || "{}");
  return (
    <section className="flex flex-col items-center w-full bg-slate-100/50">
      <div className="w-full h-[180px] sm:h-auto max-h-[500px]">
        <img src={desktopHero} className="object-cover w-full h-full" />
      </div>
      <section className="flex flex-col items-start sm:w-[95%] mx-auto w-full bg-slate-50 py-7">
        <section className="w-full flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl text-center w-full">
              Featured <span className="text-[#E5A000] font-all">Products</span>
            </p>
            <p className="font-all text-sm text-center w-full">
              Discover premium musical instruments and audio equipment at
              Barondemusical, offering superior sound quality, durability, and
              unmatched performance for musicians.
            </p>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-2 p-3">
            {Array(5)
              .fill("")
              .map((_, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center shadow justify-center w-auto bg-white"
                  >
                    <div className="relative flex flex-col items-center">
                      <img
                        src={p1}
                        className="object-cover max-h-[200px] w-full bg-white"
                      />
                      <div className="flex justify-center bg-[#fdb204f3] p-1 shadow absolute top-0 left-2">
                        <p
                          className={`text-white font-all text-center text-xs`}
                        >
                          {formatPrice(34000, "NGN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
                      <p
                        className={`text-start w-full font-medium font-all text-sm`}
                      >
                        Speaker model: SP515
                      </p>
                      <p className="font-normal text-start font-all text-[10px] text-gray-600">
                        15INCH BIG MAGNET /// 4800watt /// Pure Acostic / 100
                        coil /Double Magnet
                      </p>
                      <div className="flex flex-row items-center w-full justify-between">
                        <p className="text-[#fdb100] text-[12px] text-start font-medium font-all">
                          {formatPrice(2500000, "NGN")}
                        </p>
                        <p
                          className={`text-black text-[10px] text-start font-all line-through`}
                        >
                          {formatPrice(17000, "NGN")}
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
              })}
          </div>
        </section>
        <section className="w-full flex justify-end p-3 fixed sm:bottom-6 right-5 z-50">
          <Link
            to={
              "https://wa.me/2347042300162?text=`Hello!, I'm interested in your servce`"
            }
            className="flex flex-row items-center gap-3 cursor-pointer"
          >
            <img
              src={
                "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752576538/Amplifier/whatsap_rpuamp.png"
              }
              className="sm:w-16 sm:h-16 w-10 h-10 object-cover"
            />
          </Link>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Full Range Speakers
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="fullrangespeaker" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              New Speaker Arrival
            </p>
            <Link
              onClick={(e) => (!isVerified ? e.preventDefault() : {})}
              to={"/product/new-speaker"}
              className="w-full"
            >
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="newspeakerarrival" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Single sub
            </p>
            <Link to={"/product/single-sub"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="singlesub" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Double sub
            </p>
            <Link to={"/product/double-sub"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="doublesub" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Amplifier
            </p>
            <Link to={"/product/amplifier"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="amplifier" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Flat Mixers
            </p>
            <Link to={"/product/flat-mixer"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="flatmixer" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Floor Mixers
            </p>
            <Link to={"/product/floor-mixer"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="floormixer" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Equalizers
            </p>
            <Link to={"/product/equalizer"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="equalizer" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Line Arrays
            </p>
            <Link to={"/product/line-array"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="linearray" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Microphones
            </p>
            <Link to={"/product/microphone"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="microphone" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Drums
            </p>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="drum" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Compressors
            </p>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="compressor" />
          </div>
        </section>
      </section>
      <section className="py-7 flex flex-col items-center gap-4 overflow-hidden w-full px-3"></section>
    </section>
  );
}

import { useState } from "react";
import { desktopHero, p1, whatsappII } from "../..";
import { brand, products } from "../../raw-datas/rd1";
import HeroProductCard from "./herocard";
import { Link } from "react-router-dom";

export default function MainPageHero() {
  let [drop, setdrop] = useState(false);
  let [down, setdown] = useState(false);

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  return (
    <section className="flex flex-col items-center w-full bg-slate-100/50">
      <section className="bg-white p-3 hidden sm:flex justify-center w-4/5">
        <ul className="flex flex-row items-center justify-between w-full">
          <div className="font-all text-sm text-center font-medium list-none">
            All Deals
          </div>
          <div className="flex flex-col items-center relative">
            <div
              onClick={() => setdrop(!drop)}
              className="flex flex-row items-center gap-1.5 justify-center cursor-pointer"
            >
              <p className="font-all text-sm font-medium text-center">
                Shop by Brand
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${
                  drop ? "rotate-180" : "rotate-360"
                } lucide lucide-chevron-down-icon lucide-chevron-down duration-300`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <button
              ref={focusRef}
              onBlur={() => setdrop(false)}
              type={"button"}
              className={`${
                drop ? "flex" : "hidden"
              } sm:min-w-[200px] bg-white flex-col absolute top-10 items-start border border-black/40 outline-none`}
            >
              {brand.map((item, index) => {
                return (
                  <p
                    className="p-2 w-full cursor-pointer hover:bg-gray-200 text-start font-all text-sm"
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
            </button>
          </div>
          <div className="flex flex-col items-center relative">
            <div
              onClick={() => setdown(!down)}
              className="flex flex-row items-center gap-1.5 justify-center cursor-pointer"
            >
              <p className="font-all text-sm font-medium text-center">
                Product
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${
                  down ? "rotate-180" : "rotate-360"
                } lucide lucide-chevron-down-icon lucide-chevron-down duration-300`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <button
              ref={focusRef}
              onBlur={() => setdown(false)}
              type={"button"}
              className={`${
                down ? "flex" : "hidden"
              } sm:min-w-[200px] bg-white duration-200 flex-col absolute top-10 items-start border border-black/40 outline-none`}
            >
              {products.map((item, index) => {
                return (
                  <p
                    className="p-2 w-full cursor-pointer hover:bg-gray-200 text-start font-all text-sm"
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
            </button>
          </div>
          <div className="font-all text-sm text-center font-medium list-none">
            Service Center
          </div>
          <div className="font-all text-sm text-center font-medium list-none">
            About
          </div>
          <div className="font-all text-sm text-center font-medium list-none">
            Testimonies
          </div>
        </ul>
      </section>
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
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-5 p-3">
            {Array(5)
              .fill("")
              .map((_, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center shadow justify-center w-auto"
                  >
                    <div className="relative flex flex-col items-center">
                      <img
                        src={p1}
                        className="object-cover max-h-[200px] w-full bg-white"
                      />
                      <div className="flex justify-center bg-[#E5A000] p-1 shadow absolute top-0 left-2">
                        <p
                          className={`text-white font-all text-center text-xs`}
                        >
                          Save N34,000.00
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
                      <p className={`text-start font-medium font-all text-sm`}>
                        Speaker model: SP515
                      </p>
                      <p className="font-normal text-start font-all text-xs text-gray-600">
                        15INCH BIG MAGNET /// 4800watt /// Pure Acostic / 100
                        coil /Double Magnet
                      </p>
                      <div className="flex flex-row items-center w-full justify-between">
                        <p className="text-[#E5A000] text-sm text-start font-all">
                          N2,500,000.00
                        </p>
                        <p
                          className={`text-black text-xs text-start font-all line-through`}
                        >
                          N17,000.00
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
        <section className="w-full flex justify-end p-3">
          <div className="flex flex-row items-center gap-3">
            <img
              src={whatsappII}
              className="sm:w-10 sm:h-10 w-8 h-8 object-cover"
            />
            <p className="text-xs sm:text-sm text-center text-red-600 font-all self-center bg-white p-1 rounded shadow">
              contact us
            </p>
          </div>
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
            <HeroProductCard category="FRS" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              New Speaker Arrival
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="NSA" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Single sub
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="SS" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Double sub
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="DS" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Amplifier
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="AM" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Flat Mixers
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="FM" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Floor Mixers
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="FRM" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Equalizers
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="EQ" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Line Arrays
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="LA" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Microphones
            </p>
            <Link to={"/"} className="w-full">
              <p className="font-all text-xs text-red-600 self-center underline w-full text-end">
                view all
              </p>
            </Link>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="MIC" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Drums
            </p>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="DRUM" />
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-3 p-3">
          <div className="flex flex-row justify-between items-center w-full mx-auto self-center">
            <p className="font-all font-semibold text-base sm:text-lg text-start w-full self-center">
              Compressors
            </p>
          </div>
          <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
            <HeroProductCard category="COM" />
          </div>
        </section>
      </section>
      <section className="py-7 flex flex-col items-center gap-4 overflow-hidden w-full px-3"></section>
    </section>
  );
}

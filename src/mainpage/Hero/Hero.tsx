import { useState } from "react";
import { desktopHero } from "../..";
import ProductCard from "../../product/productcard";
import { brand, products } from "../../raw-datas/rd1";

export default function MainPageHero() {
  let [drop, setdrop] = useState(false);
  let [down, setdown] = useState(false);

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  return (
    <section className="flex flex-col items-center w-full">
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
      <section className="w-full flex justify-center py-7">
        <div className="flex flex-col items-center w-3/4 mx-auto self-center">
          <p className="font-all font-semibold text-2xl text-center w-full">
            Featured <span className="text-[#E5A000] font-all">Products</span>
          </p>
          <p className="font-all text-sm text-center w-full">
            Discover premium musical instruments and audio equipment at
            Barondemusical, offering superior sound quality, durability, and
            unmatched performance for musicians.
          </p>
        </div>
      </section>
      <section className="py-7 flex flex-col items-center gap-4 overflow-hidden w-full px-3">
        <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
          {Array(6)
            .fill("")
            .map((_, index) => {
              return (
                <div key={index}>
                  <ProductCard />
                </div>
              );
            })}
        </div>
        <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
          {Array(6)
            .fill("")
            .map((_, index) => {
              return (
                <div key={index}>
                  <ProductCard />
                </div>
              );
            })}
        </div>
      </section>
    </section>
  );
}

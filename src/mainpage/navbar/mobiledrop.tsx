import { useState } from "react";
import { brand, products } from "../../raw-datas/rd1";

export default function MobileDropDown({ menu }: { menu: boolean }) {
  let [drop, setdrops] = useState({
    deals: false,
    products: false,
    brands: false,
  });
  return (
    <div
      className={`${
        menu ? "flex" : "hidden"
      } flex-col items-center w-full gap-5 absolute min-h-screen z-30 h-auto top-0 bg-white p-5`}
    >
      <div className="mr-0 -mt-[1.6rem] justify-end self-end w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-all text-sm text-start font-medium">All Deals</p>
          <svg
            onClick={() =>
              setdrops((prev) => ({ ...prev, deals: !drop.deals }))
            }
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              drop.deals ? "rotate-180" : "rotate-360"
            } lucide lucide-chevron-down-icon lucide-chevron-down duration-300`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <datalist
          className={`${
            drop.deals ? "flex" : "hidden"
          } flex-col items-start gap-2.5 duration-500 justify-start w-full pl-4`}
        >
          <option value="A deals" className="font-all text-xs text-start">
            A Deals
          </option>
          <option value="B deals" className="font-all text-xs text-start">
            B Deals
          </option>
          <option value="C deals" className="font-all text-xs text-start">
            C Deals
          </option>
          <option value="D deals" className="font-all text-xs text-start">
            D Deals
          </option>
        </datalist>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-all text-sm text-start font-medium">Products</p>
          <svg
            onClick={() =>
              setdrops((prev) => ({ ...prev, products: !drop.products }))
            }
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              drop.products ? "rotate-180" : "rotate-360"
            } lucide lucide-chevron-down-icon lucide-chevron-down duration-300`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <datalist
          className={`${
            drop.products ? "flex" : "hidden"
          } flex-col items-start gap-2.5 duration-500 justify-start w-full pl-4`}
        >
          {products.map((item: string, index: number) => {
            return (
              <option
                key={index}
                value="A deals"
                className="font-all text-xs text-start"
              >
                {item}
              </option>
            );
          })}
        </datalist>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-all text-sm text-start font-medium">
            Shop by Brands
          </p>
          <svg
            onClick={() =>
              setdrops((prev) => ({ ...prev, brands: !drop.brands }))
            }
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              drop.brands ? "rotate-180" : "rotate-360"
            } lucide lucide-chevron-down-icon lucide-chevron-down duration-300`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <datalist
          className={`${
            drop.brands ? "flex" : "hidden"
          } flex-col items-start gap-2.5 duration-500 justify-start w-full pl-4`}
        >
          {brand.map((item: string, index: number) => {
            return (
              <option
                key={index}
                value="A deals"
                className="font-all text-xs text-start"
              >
                {item}
              </option>
            );
          })}
        </datalist>
      </div>
      <p className="font-all text-sm text-start w-full font-medium">
        Store locators
      </p>
      <p className="font-all text-sm text-start w-full font-medium">
        Service Centers
      </p>
      <p className="font-all text-sm text-start w-full font-medium">
        Contact us
      </p>
      <div className="flex flex-row items-center gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-phone-call-icon lucide-phone-call"
        >
          <path d="M13 2a9 9 0 0 1 9 9" />
          <path d="M13 6a5 5 0 0 1 5 5" />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
        <p className="font-all text-sm text-start font-medium">
          Call us 09138254838
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-inbox-icon lucide-inbox"
        >
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
        <p className="font-all text-sm text-start font-medium">
          Info@Barondemusical.com
        </p>
      </div>
    </div>
  );
}

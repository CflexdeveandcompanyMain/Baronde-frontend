import { useState } from "react";
import { brand, products } from "../../raw-datas/rd1";
import { Link } from "react-router-dom";
import { ChevronDown, InboxIcon, PhoneCallIcon } from "lucide-react";

export default function MobileDropDown({ menu }: { menu: boolean }) {
  let [drop, setdrops] = useState({
    deals: false,
    products: false,
    brands: false,
  });
  let { isVerified } = JSON.parse(localStorage.getItem("baron:user") || "");
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
          <ChevronDown
            onClick={() =>
              setdrops((prev) => ({ ...prev, deals: !drop.deals }))
            }
            size={16}
            className={`${drop.deals ? "rotate-180" : "rotate-360"}`}
          />
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
          <ChevronDown
            onClick={() =>
              setdrops((prev) => ({ ...prev, products: !drop.products }))
            }
            size={16}
            className={`${drop.products ? "rotate-180" : "rotate-360"}`}
          />
        </div>
        <datalist
          className={`${
            drop.products ? "flex" : "hidden"
          } flex-col items-start gap-2.5 duration-500 justify-start w-full pl-4`}
        >
          {products.map((item: string, index: number) => {
            return (
              <Link
                onClick={() => window.location.reload()}
                to={
                  isVerified
                    ? "/product/" + item.replaceAll(" ", "-").toLowerCase()
                    : "/"
                }
                key={index}
                className="font-all text-xs text-start"
              >
                {item}
              </Link>
            );
          })}
        </datalist>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-all text-sm text-start font-medium">
            Shop by Brands
          </p>
          <ChevronDown
            onClick={() =>
              setdrops((prev) => ({ ...prev, brands: !drop.brands }))
            }
            size={16}
            className={`${drop.brands ? "rotate-180" : "rotate-360"}`}
          />
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
      <Link
        to={"/about"}
        className="font-all text-sm text-start w-full font-medium"
      >
        Contact us
      </Link>
      <div className="flex flex-row items-center gap-2 w-full">
        <PhoneCallIcon />
        <p className="font-all text-sm text-start font-medium">
          Call us 09138254838
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <InboxIcon />
        <p className="font-all text-sm text-start font-medium">
          Info@Barondemusical.com
        </p>
      </div>
    </div>
  );
}

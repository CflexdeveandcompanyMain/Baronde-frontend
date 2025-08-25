import { useState } from "react";
import { brand, products } from "../../raw-datas/rd1";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, InboxIcon, PhoneCallIcon } from "lucide-react";
import { useGlobalState } from "../../store/globalstate";

export default function MobileDropDown({
  menu,
  setMenu,
}: {
  menu: boolean;
  setMenu: () => void;
}) {
  let [drop, setdrops] = useState({
    deals: false,
    products: false,
    brands: false,
  });

  let { setBrand } = useGlobalState();

  const navigate = useNavigate();

  return (
    <div
      className={`${
        menu ? "flex" : "hidden"
      } flex-col items-center w-full gap-5 overflow-y-auto absolute h-screen z-30 top-0 bg-white p-5`}
    >
      <div className="mr-0 -mt-[1.6rem] justify-end self-end w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
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
        <div
          className={`${
            drop.products ? "flex" : "hidden"
          } flex-col items-start gap-2.5 duration-500 justify-start w-full pl-4 max-h-60 overflow-y-auto`}
        >
          {products.map((item: string, index: number) => {
            return (
              <Link
                onClick={setMenu}
                to={"/product/" + item.replaceAll(" ", "").toLowerCase()}
                key={index}
                className="font-all text-xs text-start hover:bg-gray-100 p-2 w-full rounded transition-colors"
              >
                {item}
              </Link>
            );
          })}
        </div>
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
        <div
          className={`${
            drop.brands ? "flex" : "hidden"
          } flex-col items-start gap-1 duration-500 justify-start w-full pl-4 max-h-60 overflow-y-auto`}
        >
          {brand.map((item: string, index: number) => {
            return (
              <button
                onClick={() => {
                  setdrops((state) => ({ ...state, brands: !state.brands }));
                  setMenu();
                  setBrand(item);
                  navigate(`/brand/${item}`);
                }}
                key={index}
                className="font-all text-xs text-start hover:bg-gray-100 p-2 w-full rounded transition-colors"
                type="button"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <Link
        onClick={() => setMenu()}
        to={"/about"}
        className="font-all text-sm text-start font-medium w-full"
      >
        About
      </Link>
      <Link
        onClick={() => setMenu()}
        to={"/brand/all"}
        className="font-all text-sm text-start font-medium w-full"
      >
        All Deals
      </Link>
      <Link
        onClick={() => setMenu()}
        to={"/testimonial"}
        className="font-all text-sm text-start font-medium w-full"
      >
        Testimonies
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

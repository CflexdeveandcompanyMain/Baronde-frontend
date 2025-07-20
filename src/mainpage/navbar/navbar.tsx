import { Link, useNavigate } from "react-router-dom";
import { headlogo, MainPageSearchBar, MobileDropDown } from "../..";
import { useState } from "react";
import { brand, products } from "../../raw-datas/rd1";
import {
  AlignJustifyIcon,
  ChevronDownIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";

import { useGlobalState } from "../../store/globalstate";
import Mob from "./mob";
import BrandLogo from "../../utils/brand";

export default function MainPageNavbar() {
  let [menu, setmenu] = useState(false);
  let navigate = useNavigate();
  let { name, isVerified } = JSON.parse(
    sessionStorage.getItem("baron:user") || "{}"
  );

  let { cartlen } = useGlobalState();
  let [drop, setdrop] = useState(false);
  let [down, setdown] = useState(false);
  let [acctdrop, setAcctDrop] = useState(false);
  let [search, setSearch] = useState(false);
  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  const { ser, setSer, setBrand } = useGlobalState();

  const setSearchBtn = () => {
    setSer();
    setSearch(!search);
  };

  const Menoo = () => setmenu(!menu);

  return (
    <nav className="flex flex-col items-center w-full sticky top-0 z-50">
      <div className="bg-[#E5A000] py-2 px-7 flex flex-row items-center w-full justify-between">
        <p className="font-all text-[11px] sm:text-xs text-white self-center">
          Check Big sallah sales - 40% off
        </p>
        <div className="flex flex-row items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail-icon lucide-mail text-white self-center"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          <p className="font-all text-[11px] sm:text-xs text-white self-center">
            Suscribe & save
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center py-3 px-3 sm:px-7 bg-[#14AE5C] w-full">
        <BrandLogo img={headlogo} />
        <MainPageSearchBar />
        <div className="flex flex-row items-center gap-6 w-3/5 sm:w-1/2 justify-end">
          {isVerified ? (
            <div className="flex flex-col items-center relative cursor-pointer">
              <div
                className="hidden sm:flex flex-col items-center gap-1.5"
                onClick={() => setAcctDrop(!acctdrop)}
              >
                <p className="font-all font-medium text-xs text-center text-white">
                  {name ?? "Anonymous"}
                </p>
                <p className="font-all font-medium text-xs text-center text-white">
                  My account
                </p>
              </div>
              <button
                ref={focusRef}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setAcctDrop(!acctdrop);
                }}
                type={"button"}
                className={`${
                  acctdrop ? "sm:flex" : "hidden"
                } sm:min-w-[120px] bg-white p-2 hidden rounded-sm gap-2 flex-col absolute top-10 items-start border border-black/40 outline-none`}
              >
                <Link
                  to={"/profile"}
                  className="text-sm text-start cursor-pointer"
                >
                  My profile
                </Link>
                <Link
                  to={"/order"}
                  className="text-sm text-start cursor-pointer"
                >
                  My orders
                </Link>
                <Link
                  to={"/settings"}
                  className="text-sm text-start cursor-pointer"
                >
                  settings
                </Link>
                <div
                  className="text-sm text-start cursor-pointer"
                  onClick={() => {
                    sessionStorage.setItem(
                      "baron:user",
                      JSON.stringify({ name: "", email: "", isVerified: false })
                    );
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </button>
            </div>
          ) : (
            <>
              <Link
                to={"/signup"}
                className={`${
                  isVerified ? "hidden" : "flex"
                } hidden sm:flex flex-col items-center gap-1.5`}
              >
                <p className="font-all font-medium text-xs text-center text-white">
                  Login/SignUp
                </p>
                <p className="font-all font-medium text-xs text-center text-white">
                  My account
                </p>
              </Link>
            </>
          )}
          <div className="sm:hidden flex">
            <SearchIcon onClick={setSearchBtn} className={`text-white`} />
            <div
              className={`${
                ser ? "flex" : "hidden"
              } justify-start fixed inset-0 z-50 bg-black/40 w-full h-screen`}
            >
              <div className="p-3 shadow rounded h-aut w-full">
                <Mob FN={setSearchBtn} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center relative cursor-pointer">
            <UserIcon
              onClick={() => {
                if (isVerified) {
                  setAcctDrop(!acctdrop);
                } else navigate("/signup");
              }}
              className={`text-white sm:hidden flex`}
            />
            <>
              <div
                className={`${
                  acctdrop ? "flex" : "hidden"
                } mr-0 justify-end self-end sm:hidden flex w-0 h-0 -mb-[0.5rem] border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white`}
              ></div>
              <button
                ref={focusRef}
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) setAcctDrop(!acctdrop);
                }}
                type={"button"}
                className={`${
                  acctdrop ? "flex" : "hidden"
                } min-w-[120px] bg-white p-2 sm:hidden rounded-sm gap-2 z-50 flex-col absolute top-8 -right-1 items-start border-x border-b border-black/40 outline-none`}
              >
                <Link
                  to={"/profile"}
                  className="text-sm text-start cursor-pointer"
                >
                  My profile
                </Link>
                <Link
                  to={"/order"}
                  className="text-sm text-start cursor-pointer"
                >
                  My orders
                </Link>
                <Link
                  to={"/settings"}
                  className="text-sm text-start cursor-pointer"
                >
                  settings
                </Link>
                <div
                  className="text-sm text-start cursor-pointer"
                  onClick={() => {
                    sessionStorage.setItem(
                      "baron:user",
                      JSON.stringify({ name: "", email: "", isVerified: false })
                    );
                    navigate("/");
                  }}
                >
                  Logout
                </div>
              </button>
            </>
          </div>
          <Link to={"/cart"} className="relative">
            <ShoppingCartIcon className="text-white cursor-pointer" />
            <div className="h-2 w-2 bg-[#BB2331] p-2 cursor-pointer flex justify-center rounded-full absolute -top-1 right-0">
              <p className="text-white text-[10px] font-medium text-center self-center">
                {cartlen}
              </p>
            </div>
          </Link>
          <AlignJustifyIcon
            onClick={() => setmenu(!menu)}
            className="sm:hidden flex text-white"
          />
        </div>
      </div>
      <div className="relative w-full sm:hidden flex bg-white">
        <MobileDropDown menu={menu} setMenu={Menoo} />
      </div>
      <div className="w-full bg-white">
        <section className="bg-white p-3 hidden sm:flex justify-center w-3/4 sm:w-[90%] md:w-[70%] mx-auto">
          <ul className="flex flex-row items-center justify-between w-full">
            <div
              onClick={() => setBrand("other")}
              className="font-all text-sm text-center font-medium list-none"
            >
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
                <ChevronDownIcon
                  className={`${
                    drop ? "rotate-180" : "rotate-360"
                  } duration-300`}
                  size={12}
                />
              </div>
              <button
                ref={focusRef}
                type={"button"}
                className={`${
                  drop ? "flex" : "hidden"
                } sm:min-w-[200px] bg-white flex-col absolute top-10 items-start border border-black/40 outline-none`}
              >
                {brand.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setBrand(item);
                        setTimeout(() => setdrop(!drop), 0);
                        navigate(`/brand/${item}`);
                      }}
                      className="p-2 w-full cursor-pointer hover:bg-gray-200 text-start font-all text-sm"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </button>
            </div>
            <div className="flex flex-col items-center relative">
              <div
                onClick={() => {
                  setdown(!down);
                  setdrop(false);
                }}
                className="flex flex-row items-center gap-1.5 justify-center cursor-pointer"
              >
                <p className="font-all text-sm font-medium text-center">
                  Product
                </p>
                <ChevronDownIcon
                  className={`${
                    down ? "rotate-180" : "rotate-360"
                  } duration-300`}
                  size={12}
                />
              </div>
              <button
                ref={focusRef}
                onClick={() => console.log("BTN")}
                type={"button"}
                className={`${
                  down ? "flex" : "hidden"
                } sm:min-w-[200px] bg-white overflow-y-scroll max-h-[400px] duration-200 flex-col absolute top-10 items-start border border-black/40 outline-none z-30`}
              >
                {products.map((item, index) => {
                  return (
                    <Link
                      onClick={() => {
                        setTimeout(() => setdown(!down), 0);
                        navigate(`/brand/${item}`);
                      }}
                      to={"/product/" + item.replaceAll(" ", "-").toLowerCase()}
                      className="p-2 w-full cursor-pointer hover:bg-gray-200 text-start font-all text-sm"
                      key={index}
                    >
                      {item}
                    </Link>
                  );
                })}
              </button>
            </div>
            <div className="font-all text-sm text-center font-medium list-none">
              Service Center
            </div>
            <Link
              to={"/about"}
              className="font-all text-sm text-center font-medium list-none"
            >
              About
            </Link>
            <Link
              to={"/testimonial"}
              className="font-all text-sm text-center font-medium list-none"
            >
              Testimonies
            </Link>
          </ul>
        </section>
      </div>
    </nav>
  );
}

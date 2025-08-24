import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../raw-datas/rd1";

export default function MainPageSearchBar() {
  let [drop, setdrop] = useState<boolean>(false);
  let [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  return (
    <div className={`hidden sm:flex flex-row items-center w-full`}>
      <input
        autoFocus={true}
        onChange={(e) => setKeyword(e.target.value)}
        type={"text"}
        placeholder="Search"
        className="font-all text-[13px] w-3/5 font-normal outline-none p-2 bg-white border border-black rounded-l"
      />
      <div className="flex flex-col w-2/5 items-center p-2 py-2.5 border border-black border-l-0 bg-white relative">
        <div
          onClick={() => setdrop(!drop)}
          className="flex flex-row items-center gap-1.5 justify-center cursor-pointer"
        >
          <p className="font-all text-xs font-medium text-center">
            All categories
          </p>
          <ChevronDown className="duration-300" size={12} />
        </div>
        <button
          ref={focusRef}
          onBlur={() => setdrop(!drop)}
          type={"button"}
          className={`${
            drop ? "flex" : "hidden"
          } sm:min-w-[200px] max-h-[300px] overflow-y-scroll bg-white flex-col absolute top-10 items-start border border-black/40 outline-none`}
        >
          {products.map((item, index) => {
            return (
              <p
                onClick={() => {
                  setdrop(!drop);
                  navigate(
                    "/product/" + item.replaceAll(" ", "").toLowerCase()
                  );
                }}
                className="p-2 w-full hover:bg-gray-200 text-start font-all text-sm"
                key={index}
              >
                {item}
              </p>
            );
          })}
        </button>
      </div>
      <div
        onClick={() => {
          if (keyword) {
            navigate("/search/" + keyword);
          }
        }}
        className="flex justify-center bg-[#BB2331] rounded-r-sm p-[9px]"
      >
        <Search size={20} className="text-white" />
      </div>
    </div>
  );
}

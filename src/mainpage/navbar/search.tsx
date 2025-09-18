import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../raw-datas/rd1";

export default function MainPageSearchBar() {
  let [drop, setdrop] = useState<boolean>(false);
  let [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  return (
    <div className={`hidden sm:flex flex-row items-center w-full`}>
      <input
        autoFocus={true}
        onChange={(e) => setKeyword(e.target.value)}
        type={"text"}
        placeholder="Search"
        className="font-all text-[13px] w-[70%] font-normal outline-none p-2 bg-white border border-stone-500 rounded-l"
      />
      <div
        onMouseOver={() => setdrop(true)}
        onMouseLeave={() => setdrop(false)}
        className="flex flex-col w-[30%] items-center p-2 py-2.5 border border-stone-500 border-l-0 bg-white relative"
      >
        <div className="flex flex-row items-center gap-1.5 justify-center cursor-pointer">
          <p className="font-all text-xs font-medium text-center">
            All categories
          </p>
          <ChevronDown className="duration-300" size={12} />
        </div>
        <button
          className={`${
            drop ? "flex" : "hidden"
          } sm:min-w-[200px] max-h-[300px] overflow-y-scroll bg-white flex-col absolute top-10 items-start border border-stone-500 outline-none`}
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
        className="flex justify-center bg-[#b42231] rounded-r-sm p-[9px]"
      >
        <Search size={20} className="text-white" />
      </div>
    </div>
  );
}

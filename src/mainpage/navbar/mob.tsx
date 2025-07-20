import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../store/globalstate";
import { appliances } from "./search";

export default function Mob({ FN }: { FN: () => void }) {
  let [drop, setdrop] = useState<boolean>(false);
  let [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  const { setSer } = useGlobalState();

  return (
    <>
      <div onClick={FN} className="flex justify-end w-full my-2">
        <X size={16} className="text-white" />
      </div>
      <div className={`flex flex-row items-center w-full`}>
        <input
          autoFocus={true}
          onChange={(e) => setKeyword(e.target.value)}
          type={"text"}
          placeholder="Search"
          className="font-all text-sm w-3/5 font-normal self-stretch outline-none p-2 bg-white border border-black"
        />
        <div className="flex flex-col w-2/5 items-center p-2 border border-black border-l-0 bg-white self-stretch relative">
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
            } sm:min-w-[200px] bg-white flex-col absolute top-10 items-start border border-black/40 outline-none`}
          >
            {appliances.map((item, index) => {
              return (
                <p
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
              setSer();
              navigate("/search/" + keyword);
            }
          }}
          className="self-stretch flex justify-center bg-[#BB2331] rounded-r-sm p-2.5"
        >
          <Search size={20} className="text-white" />
        </div>
      </div>
    </>
  );
}

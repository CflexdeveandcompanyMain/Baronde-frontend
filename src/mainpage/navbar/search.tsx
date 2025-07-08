import { useState } from "react";

const appliances: string[] = [
  "Refrigerator",
  "Washing Machine",
  "Microwave Oven",
  "Air Conditioner",
  "Vacuum Cleaner",
  "Dishwasher",
  "Water Heater",
  "Television",
  "Blender",
  "1Electric Kettle",
];

export default function MainPageSearchBar() {
  let [drop, setdrop] = useState<boolean>(false);

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  return (
    <div className="hidden sm:flex flex-row items-center w-full">
      <input
        autoFocus={true}
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
      <div className="self-stretch flex justify-center bg-[#BB2331] rounded-r-sm p-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search-icon lucide-search text-white"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
      </div>
    </div>
  );
}

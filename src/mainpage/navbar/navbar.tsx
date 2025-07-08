import { headlogo, MainPageSearchBar } from "../..";

export default function MainPageNavbar() {
  return (
    <nav className="flex flex-col items-center w-full">
      <div className="bg-[#E5A000] py-2 px-7 flex flex-row items-center w-full justify-between">
        <p className="font-all text-xs text-white self-center">
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
          <p className="font-all text-xs text-white self-center">
            Suscribe & save
          </p>
        </div>
      </div>
      <div className="py-3 px-7 bg-[#14AE5C] w-full">
        <div className="flex flex-row items-center justify-center gap-0.5 -ml-2 self-center">
          <img
            src={headlogo}
            className="w-10 h-10 sm:w-10 sm:h-10 rounded object-cover"
          />
          <div className="flex flex-col items-start">
            <p className="font-all font-semibold text-xl text-white">Baron</p>
            <p className="font-all text-[12px] text-start text-white -mt-1">
              Demusical
            </p>
          </div>
        </div>
        <MainPageSearchBar />
      </div>
    </nav>
  );
}

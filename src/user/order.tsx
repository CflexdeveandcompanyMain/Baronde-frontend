export default function UserOrderHistory() {
  return <></>;
}

function OrderCard() {
  return (
    <div className="flex flex-row items-center w-full justify-between border-[3px] border-stone-400">
      <div className="flex flex-row items-center gap-3">
        <img src={""} className="w-4/5 object-cover h-full" />
        <div className="flex flex-col items-start gap-2">
          <p className="w-full text-sm font-semibold text-start">{}</p>
          <p className="w-full text-xs font-semibold text-start">{}</p>
        </div>
      </div>
      <p className="w-full self-center font-all text-center text-gray-400">
        Quantity {}
      </p>
      <p className="w-full self-center font-all text-center text-orange-600/80">
        {}
      </p>
      <div className="flex flex-row items-center w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-truck-icon lucide-truck self-center"
        >
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" />
          <circle cx="7" cy="18" r="2" />
        </svg>
        <p className="font-all text-xs font-semibold self-center">
          Estimated Delivery: {}
        </p>
        <div className="bg-green-300 p-2 rounded shadow flex justify-center self-center">
          <p className="font-all text-xs text-center self-center">En Route</p>
        </div>
      </div>
    </div>
  );
}

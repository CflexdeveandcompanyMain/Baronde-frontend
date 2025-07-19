import { GitPullRequestDraft } from "lucide-react";
import { useState, type JSX } from "react";

type H = {
  title: string;
  icon: JSX.Element;
  count: number;
}[];

let filterD = ["Amount", "Name", "Most recent", "Oldest"];

let table = [
  ["Jane Cooper", "#223", 200000, "Paid", "Aug 12, 2025"],
  ["Wade Warren", "#223", 203000, "Delivered", "Jun 3, 2025"],
  ["Brooklyn Simpson", "#225", 1032000, "Paid", "Nov 18, 2025"],
  ["Cuy Hawkins", "#226", 2210000, "Pending", "July 14, 2025"],
  ["Jane Cooper", "#223", 200000, "Paid", "Aug 12, 2025"],
  ["Cuy Hawkins", "#226", 2210000, "Pending", "July 14, 2025"],
];

export default function AdminMain({ data }: { data: H }) {
  let [filter, setFilter] = useState(false);
  let [filterOption, setFilterOption] = useState("mostrecent");
  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-lg sm:text-2xl text-start font-semibold font-all">
            Welcome, SoundPrince!
          </p>
          <p className="text-sm text-stone-400 text-start font-medium font-all">
            Take a look at your products today!
          </p>
        </div>
      </div>
      <section className="sm:flex grid grid-cols-2 sm:flex-row items-center w-full gap-3 mt-5">
        {data.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg"
            >
              <div className="flex flex-row items-center w-full justify-between">
                <p className="font-all text-lg sm:text-2xl font-semibold text-start">
                  {item.count}
                </p>
                <div className="p-2 shadown">{item.icon}</div>
              </div>
              <p className="font-all text-sm sm:text-base text-start w-full font-medium text-stone-500">
                {item.title}
              </p>
              <p className="font-semibold text-start w-full">----</p>
            </div>
          );
        })}
      </section>
      <section className="flex flex-col items-center w-full mt-3 border border-stone-300 gap-2 rounded-lg p-3">
        <div className="flex flex-row items-center w-full justify-between">
          <p className="font-all text-base font-medium">Current Orders</p>
          <div className="flex flex-col items-center gap-1 relative">
            <div
              onClick={() => setFilter(!filter)}
              className="flex flex-row items-center gap-1"
            >
              <p className="font-all text-sm font-medium">Sort</p>
              <div className="border border-stone-300 p-1 flex flex-row items-center rounded gap-1">
                <p className="font-all text-xs font-medium">Paid</p>
                <GitPullRequestDraft size={12} className="rotate-90" />
              </div>
            </div>
            <button
              ref={focusRef}
              onMouseDown={(e) => {
                console.log(filterOption);
                if (e.target === e.currentTarget) setFilter(!filter);
              }}
              className={`${
                filter ? "flex" : "hidden"
              } flex-col items-center gap-2 bg-stone-50 min-w-[200x] cursor-pointer outline-1 p-2 absolute top-8`}
            >
              {filterD.map((item: string, index: number) => {
                return (
                  <p
                    onClick={() => {
                      setFilterOption(item);
                      setFilter(!filter);
                    }}
                    key={index}
                    className="font-all text-sm font-medium w-full text-start"
                  >
                    {item}
                  </p>
                );
              })}
            </button>
          </div>
        </div>
        <section className="w-full overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg">
            <thead className="w-full">
              <tr className="w-full">
                <th className="py-2 font-all text-sm text-start px-4 font-medium text-stone-600 whitespace-nowrap">
                  Customer Name
                </th>
                <th className="py-2 font-all text-sm text-start px-4 font-medium text-stone-600 whitespace-nowrap">
                  Order ID
                </th>
                <th className="py-2 font-all text-sm text-start px-4 font-medium text-stone-600 whitespace-nowrap">
                  Amount
                </th>
                <th className="py-2 font-all text-sm text-start px-4 font-medium text-stone-600 whitespace-nowrap">
                  Status
                </th>
                <th className="py-2 font-all text-sm text-start px-4 font-medium text-stone-600 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  {item.map((cellItem: string | number, cellIndex: number) => {
                    const color: any = {
                      Paid: "text-blue-500 font-medium",
                      Pending: "text-yellow-500 font-medium",
                      Delivered: "text-green-500 font-medium",
                    };
                    return (
                      <td
                        key={cellIndex}
                        className={`${color[cellItem]} font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                      >
                        {cellItem}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
}

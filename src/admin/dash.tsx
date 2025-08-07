import { useQuery } from "@tanstack/react-query";
import { GitPullRequestDraft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, type JSX, useEffect } from "react";

type H = {
  title: string;
  icon: JSX.Element;
  count: number;
}[];

let filterD = ["All", "Delivered", "Undelivered"];

let table = [
  ["Jane Cooper", "#223", 200000, "Paid", "Aug 12, 2025"],
  ["Wade Warren", "#224", 203000, "Delivered", "Jun 3, 2025"],
  ["Brooklyn Simpson", "#225", 1032000, "Paid", "Nov 18, 2025"],
  ["Cuy Hawkins", "#226", 2210000, "Pending", "July 14, 2025"],
  ["Jane Cooper", "#227", 200000, "Paid", "Aug 12, 2025"],
  ["Cuy Hawkins", "#228", 2210000, "Pending", "July 14, 2025"],
  ["Alice Johnson", "#229", 450000, "Delivered", "Sep 5, 2025"],
  ["Bob Smith", "#230", 675000, "Paid", "Oct 22, 2025"],
  ["Carol Davis", "#231", 890000, "Pending", "Dec 1, 2025"],
  ["David Wilson", "#232", 320000, "Delivered", "Jan 15, 2025"],
  ["Eva Brown", "#233", 540000, "Paid", "Feb 28, 2025"],
  ["Frank Miller", "#234", 780000, "Pending", "Mar 10, 2025"],
];

export default function AdminMain({ data }: { data: H }) {
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredTable = useMemo(() => {
    if (filterOption === "All") {
      return table;
    } else if (filterOption === "Delivered") {
      return table.filter((row) => row[3] === "Delivered");
    } else if (filterOption === "Undelivered") {
      return table.filter((row) => row[3] === "Paid" || row[3] === "Pending");
    }
    return table;
  }, [filterOption]);

  // const {status,data}=useQuery({
  //   queryKey:["gettotal"]
  // });

  const totalPages = Math.ceil(filteredTable.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTableData = filteredTable.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const focusRef = (element: HTMLButtonElement) => {
    if (element) {
      element.focus();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilterOption(newFilter);
    setCurrentPage(1);
    setFilter(false);
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
                <p className="font-all text-xs font-medium">{filterOption}</p>
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
              } flex-col items-center gap-2 bg-stone-50 min-w-[200x] cursor-pointer outline-1 p-2 absolute top-8 z-10 border border-stone-300 rounded shadow-lg`}
            >
              {filterD.map((item: string, index: number) => {
                return (
                  <p
                    onClick={() => handleFilterChange(item)}
                    key={index}
                    className="font-all text-sm font-medium w-full text-start hover:bg-stone-100 p-1 rounded cursor-pointer"
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
              {currentTableData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  {item.map((cellItem: string | number, cellIndex: number) => {
                    const color: any = {
                      Delivered: "text-green-500 font-medium",
                      Paid: "text-yellow-500 font-medium",
                      Pending: "text-yellow-500 font-medium",
                    };
                    return (
                      <td
                        key={cellIndex}
                        className={`${color[cellItem]} font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                      >
                        {typeof cellItem === "number" && cellIndex === 2
                          ? `$${cellItem.toLocaleString()}`
                          : cellItem}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4 gap-4">
          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-stone-600 font-all">
                Show
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="border border-stone-300 rounded px-2 py-1 text-sm font-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span className="text-xs sm:text-sm text-stone-600 font-all">
                entries
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-600 font-all">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredTable.length)} of{" "}
                {filteredTable.length} entries
                {filterOption !== "All" && ` (filtered by ${filterOption})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-row sm:w-auto w-full sm:justify-center justify-end">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 border border-stone-300 rounded hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-2 py-1 border border-stone-300 rounded text-sm font-all ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white border-blue-500"
                    : "hover:bg-stone-100"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 border border-stone-300 rounded hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

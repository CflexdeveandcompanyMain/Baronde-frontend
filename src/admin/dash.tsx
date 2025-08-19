import {
  GitPullRequestDraft,
  ChevronLeft,
  ChevronRight,
  Tag,
  ShoppingBasket,
  Wallet,
  Truck,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { dateEE, formatPrice } from "../utils/priceconverter";
import { useQuery } from "@tanstack/react-query";
import { adminAnalytics } from "../utils/getFetch";

let filterD = ["All", "Ascending", "Descending"];

// let table: any[] = [];

export default function AdminMain() {
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { status, data } = useQuery({
    queryKey: ["getAnalytics"],
    queryFn: () => adminAnalytics(),
  });

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

  const [datas, setDatas] = useState({
    usersWithOrders: 0,
    successfulPayments: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [tab, setTab] = useState<any[]>([]);
  let Info: any[];

  const update = (inf: any[]) => {
    inf.map((item) => {
      let {
        orders,
        user: { name },
      } = item;
      orders.forEach((order: any) => {
        let { orderStatus, _id, totalAmount, updatedAt } = order;
        console.log(name, orderStatus, _id, totalAmount, dateEE(updatedAt));
        setTab((prev: any) => [
          ...prev,
          { name, orderStatus, _id, totalAmount, date: dateEE(updatedAt) },
        ]);
      });
    });
  };

  useEffect(() => {
    if (filterOption === "Ascending") {
      setTab(
        tab.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
      );
    } else if (filterOption === "Descending") {
      setTab(
        tab.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }
  }, [filterOption]);

  const totalPages = Math.ceil(tab.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentTableData = tab.slice(startIndex, endIndex);

  useCallback(() => {
    if (data) {
      const { usersWithOrders } = data.data;
      Info = usersWithOrders.filter((item: any) => item.orders.length > 0);
      Info.map((item) => {
        let {
          orders,
          user: { name },
        } = item;
        orders.forEach((order: any) => {
          let { orderStatus, _id, totalAmount, updatedAt } = order;
          console.log(name, orderStatus, _id, totalAmount, dateEE(updatedAt));
          setTab((prev: any) => [
            ...prev,
            { name, orderStatus, _id, totalAmount, date: dateEE(updatedAt) },
          ]);
        });
      });
    }
  }, [status]);

  useEffect(() => {
    if (data) {
      const { usersWithOrders, successfulPayments, totalOrders, totalRevenue } =
        data.data;
      Info = usersWithOrders.filter((item: any) => item.orders.length > 0);
      setDatas({
        usersWithOrders: Info.length,
        successfulPayments,
        totalOrders,
        totalRevenue,
      });
      // console.log(datas);
    }
    console.log(Info[0].orders);
    update(Info);
  }, [status]);

  if (tab.length > 0) console.log(tab);

  let { usersWithOrders, successfulPayments, totalOrders, totalRevenue } =
    datas;

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
        <div className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="font-all text-lg font-semibold text-start">
              {formatPrice(totalRevenue ?? 0, "NGN")}
            </p>
            <div className="p-2 shadown">
              <Tag size={17} />
            </div>
          </div>
          <p className="font-all text-sm  text-start w-full font-medium text-stone-500">
            Total Sales
          </p>
          <div className="flex flex-row items-center w-auto gap-1">
            <div className="bg-yellow-400 animate-bounce duration-300 h-0.5 w-0.5 rounded-full"></div>
            <div className="bg-red-400 h-0.5 w-0.5 rounded-full animate-bounce duration-500"></div>
            <div className="bg-green-400 h-0.5 w-0.5 rounded-full animate-bounce duration-700"></div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="font-all text-lg font-semibold text-start">
              {totalOrders ?? 0}
            </p>
            <div className="p-2 shadown">
              <ShoppingBasket size={17} />
            </div>
          </div>
          <p className="font-all text-sm  text-start w-full font-medium text-stone-500">
            Total Orders
          </p>
          <div className="flex flex-row items-center w-auto gap-1">
            <div className="bg-yellow-400 animate-bounce duration-300 h-0.5 w-0.5 rounded-full"></div>
            <div className="bg-red-400 h-0.5 w-0.5 rounded-full animate-bounce duration-500"></div>
            <div className="bg-green-400 h-0.5 w-0.5 rounded-full animate-bounce duration-700"></div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="font-all text-lg font-semibold text-start">
              {successfulPayments ?? 0}
            </p>
            <div className="p-2 shadown">
              <Wallet size={17} />
            </div>
          </div>
          <p className="font-all text-sm  text-start w-full font-medium text-stone-500">
            Successful Payments
          </p>
          <div className="flex flex-row items-center w-auto gap-1">
            <div className="bg-yellow-400 animate-bounce duration-300 h-0.5 w-0.5 rounded-full"></div>
            <div className="bg-red-400 h-0.5 w-0.5 rounded-full animate-bounce duration-500"></div>
            <div className="bg-green-400 h-0.5 w-0.5 rounded-full animate-bounce duration-700"></div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start hover:scale-110 duration-300 border border-green-300/70 p-2 rounded-lg">
          <div className="flex flex-row items-center w-full justify-between">
            <p className="font-all text-lg font-semibold text-start">
              {usersWithOrders}
            </p>
            <div className="p-2 shadown">
              <Truck size={17} />
            </div>
          </div>
          <p className="font-all text-sm  text-start w-full font-medium text-stone-500">
            Users with Order
          </p>
          <div className="flex flex-row items-center w-auto gap-1">
            <div className="bg-yellow-400 animate-bounce duration-300 h-0.5 w-0.5 rounded-full"></div>
            <div className="bg-red-400 h-0.5 w-0.5 rounded-full animate-bounce duration-500"></div>
            <div className="bg-green-400 h-0.5 w-0.5 rounded-full animate-bounce duration-700"></div>
          </div>
        </div>
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
              {tab.map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td
                    key={1}
                    className={`capitalize font-medium font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                  >
                    {item.name}
                  </td>
                  <td
                    key={2}
                    className={`capitalize font-medium font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                  >
                    {item._id}
                  </td>
                  <td
                    key={3}
                    className={`capitalize font-medium font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                  >
                    {formatPrice(item.totalAmount, "NGN")}
                  </td>
                  <td
                    key={4}
                    className={`capitalize font-medium font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                  >
                    {item.orderStatus}
                  </td>
                  <td
                    key={5}
                    className={`capitalize font-medium font-all text-xs text-start px-4 py-2 whitespace-nowrap`}
                  >
                    {item.date}
                  </td>
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
                Showing {startIndex + 1} to {Math.min(endIndex, tab.length)} of{" "}
                {tab.length} entries
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

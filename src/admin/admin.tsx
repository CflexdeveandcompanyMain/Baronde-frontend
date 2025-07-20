import { Link } from "react-router-dom";
import { bdm, frame3 } from "..";
import {
  LogOut,
  User,
  Package,
  Tag,
  ShoppingBasket,
  Wallet,
  HomeIcon,
  Settings,
  Menu,
} from "lucide-react";
import { useState, type JSX } from "react";
import AdminMain from "./dash";
import AdminSettings from "./settings";
import AdminPayment from "./payment";
import AdminProducts from "./products";

let data = [
  {
    title: "Total Sales",
    icon: <Tag size={17} />,
    count: 0,
  },
  {
    title: "Total Products",
    icon: <ShoppingBasket size={17} />,
    count: 0,
  },
  {
    title: "Total Customers",
    icon: <User size={17} />,
    count: 0,
  },
  {
    title: "Total Payment",
    icon: <Wallet size={17} />,
    count: 0,
  },
];

let sidebar = [
  {
    title: "Dashboard",
    icon: <HomeIcon className="text-stone-50 group-hover:text-black" />,
  },
  {
    title: "Products",
    icon: <Package className="text-stone-50 group-hover:text-black" />,
  },
  {
    title: "Payment",
    icon: <Wallet className="text-stone-50 group-hover:text-black" />,
  },
  {
    title: "Settings",
    icon: <Settings className="text-stone-50 group-hover:text-black" />,
  },
];
const AdminDashboard = () => {
  let [page, setPage] = useState("dashboard");
  let [sd, setSd] = useState(false);

  let Components: { [key: string]: JSX.Element } = {
    dashboard: <AdminMain data={data} />,
    settings: <AdminSettings />,
    payment: <AdminPayment />,
    products: <AdminProducts />,
  };
  return (
    <section className="flex flex-row items-center w-full h-screen relative">
      <section className="sm:flex hidden bg-green-950 flex-col items-center md:p-7 p-3 w-1/4 h-full justify-between">
        <div className="flex flex-col items-center w-full">
          <Link
            to={"/"}
            className="flex flex-row items-center justify-start gap-0.5 sm:-ml-2 self-center w-full"
          >
            <img
              src={frame3}
              className="w-10 h-10 sm:w-10 sm:h-10 rounded object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="font-all font-semibold text-xl text-white">Baron</p>
              <p className="font-all text-[12px] text-start text-white -mt-1">
                Demusical
              </p>
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center w-full gap-6 mt-10">
            {sidebar.map((item, index) => {
              return (
                <div
                  onClick={() => setPage(item.title.toLowerCase())}
                  key={index}
                  className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200"
                >
                  {item.icon}
                  <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-1">
          <LogOut className={"text-red-500"} size={16} />
          <p className="font-all text-base font-medium text-center text-red-500">
            Log out
          </p>
        </div>
      </section>
      <section
        className={`${
          sd ? "left-0" : "-left-full"
        } sm:hidden flex bg-green-950 flex-col items-center md:p-7 p-3 w-3/4 z-50 absolute duration-300 top-0 h-full justify-between`}
      >
        <div className="flex flex-col items-center w-full">
          <Link
            to={"/"}
            className="flex flex-row items-center justify-start gap-0.5 sm:-ml-2 self-center w-full"
          >
            <img
              src={frame3}
              className="w-10 h-10 sm:w-10 sm:h-10 rounded object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="font-all font-semibold text-xl text-white">Baron</p>
              <p className="font-all text-[12px] text-start text-white -mt-1">
                Demusical
              </p>
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center w-full gap-6 mt-10">
            {sidebar.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setPage(item.title.toLowerCase());
                    setTimeout(() => setSd(!sd), 1);
                  }}
                  key={index}
                  className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200"
                >
                  {item.icon}
                  <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-1">
          <LogOut className={"text-red-500"} size={16} />
          <p className="font-all text-base font-medium text-center text-red-500">
            Log out
          </p>
        </div>
      </section>
      <section className="flex w-full sm:w-3/4 bg-white flex-col items-center sm:p-10 self-start">
        <div className="w-full sm:hidden flex flex-row items-center justify-between shadow p-3">
          <Link
            to={"/"}
            className="flex flex-row items-center justify-start gap-0.5 sm:-ml-2 self-center w-full"
          >
            <img
              src={bdm}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
            />
            <div className="flex flex-col items-start">
              <p className="font-all font-semibold text-lg">Baron</p>
              <p className="font-all text-[11px] text-start -mt-1">Demusical</p>
            </div>
          </Link>
          <div className="flex flex-row items-center gap-4 justify-end w-full self-center">
            <Menu onClick={() => setSd(!sd)} size={22} />
          </div>
        </div>
        <div className="p-3 w-full relative">{Components[page]}</div>
      </section>
    </section>
  );
};

export default AdminDashboard;

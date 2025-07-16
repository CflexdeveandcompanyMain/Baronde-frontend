import { Link } from "react-router-dom";
import { frame3 } from "..";
import {
  LogOut,
  User,
  Package,
  Tag,
  ShoppingBasket,
  Wallet,
  HomeIcon,
} from "lucide-react";

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

const AdminDashboard = () => {
  return (
    <section className="flex flex-row items-center w-full h-screen">
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
            <div className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200">
              <HomeIcon className="text-stone-50 group-hover:text-black" />
              <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                Dashboard
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200">
              <Package className="text-stone-50 group-hover:text-black" />
              <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                Products
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200">
              <ShoppingBasket className="text-stone-50 group-hover:text-black" />
              <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                Orders
              </p>
            </div>
            <div className="flex flex-row items-center justify-start gap-2 w-full hover:bg-stone-50 group p-3 hover:rounded-lg duration-200">
              <Wallet className="text-stone-50 group-hover:text-black" />
              <p className="font-all text-base font-medium text-stone-50 group-hover:text-black">
                Payment
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-1">
          <LogOut className={"text-red-500"} size={16} />
          <p className="font-all text-base font-medium text-center text-red-500">
            Log out
          </p>
        </div>
      </section>
      <section className="flex sm:w-3/4 bg-white flex-col items-center sm:p-10 p-3 self-start">
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
        <section className="flex flex-row items-center w-full gap-3 mt-5">
          {data.map((item, index) => {
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
                <p className="font-all text-base text-start w-full font-medium text-stone-500">
                  {item.title}
                </p>
                <p className="font-semibold text-start w-full">----</p>
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
};

export default AdminDashboard;

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <section className="flex flex-row items-center w-full">
      <section className="sm:flex hidden bg-green-950 flex-col items-center p-3"></section>
      <section className="flex sm:w-3/4 bg-white flex-col items-center">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start gap-2">
            <p className="text-2xl text-start font-semibold font-all">
              Welcome, SoundPrince!
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdminDashboard;

import { useState } from "react";
import MainPageNavbar from "../mainpage/navbar/navbar";
import { nigerianStates } from "./data";

export default function UserProfile() {
  let [state, setstate] = useState("Abia");
  let [drop, setdrop] = useState(false);
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-screen bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <section className="w-[95%] bg-white self-center sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-12 flex flex-col items-center gap-5 p-3">
          <div className="flex flex-row items-center w-full justify-start gap-1">
            <p className="text-base font-all font-medium">Profile Details</p>
            <svg
              onClick={() => setdrop(!drop)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-pen-icon lucide-user-pen text-emerald-700 cursor-pointer"
            >
              <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
              <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Name</p>
            <p className="ml-5 font-all font-medium text-xs">Martins Olumide</p>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Enter Email</p>
            <p className="ml-5 font-all font-medium text-xs">
              johndoe@gmail.com
            </p>
          </div>
          <div className="flex flex-col items-start w-full justify-start gap-4">
            <p className="font-all font-medium text-sm">Update password</p>
            <p className="ml-5 font-all font-medium text-xs">
              * * * * * * * * * * *
            </p>
          </div>
        </section>
        <section className="w-[95%] bg-white self-center sm:h-auto sm:w-3/5 mx-auto flex flex-col items-center p-3">
          <div className="flex flex-col items-start w-full justify-start gap-3">
            <p className="font-all font-medium text-base">Address Details</p>
            <p className="ml-5 font-all font-medium text-xs">
              11, 9idiffu street, Abia state, Nigeria
            </p>
          </div>
        </section>
        <div
          className={`${
            drop ? "flex" : "hidden"
          } fixed z-50 w-full sm:top-0 h-screen bg-black/30 flex justify-center`}
        >
          <div className="h-full sm:h-auto my-auto self-start sm:mt-3 py-4 px-7 relative flex flex-col items-center w-full md:w-3/5 lg:w-1/2 sm:w-3/4 mx-auto bg-white">
            <div className="w-full flex justify-end">
              <svg
                onClick={() => setdrop(!drop)}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x text-black cursor-pointer"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
            <div className="flex flex-col items-start w-full gap-1.5">
              <p className="font-all font-semibold text-sm text-black/80 sm:text-base text-start">
                Profile Details
              </p>
              <div className="flex flex-col w-full gap-1">
                <p className="font-medium text-[12px] text-start font-all">
                  Username
                </p>
                <input
                  type="text"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <p className="font-medium text-[12px] text-start font-all">
                  Email
                </p>
                <input
                  type="text"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <p className="font-medium text-[12px] text-start font-all">
                  Edit Password
                </p>
                <input
                  type="text"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full gap-3">
              <p className="font-all font-semibold text-base text-black/80 sm:text-lg text-start">
                Address Details
              </p>
              <div className="flex flex-col w-full gap-1">
                <p className="font-semibold text-black/80 text-[12px] text-start font-all">
                  Address
                </p>
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <p className="font-semibold text-black/80 text-[12px] text-start font-all">
                  Apartment/Suite (optional)
                </p>
                <input
                  type="text"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <p className="font-semibold text-black/80 text-[12px] text-start font-all">
                  Edit Password
                </p>
                <input
                  type="text"
                  className="outline-0 border font-all text-xs border-black/50 p-2"
                />
              </div>
            </div>
            <div className="flex flex-row items-center w-full gap-5 mt-2">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="state"
                  className="font-all text-xs font-semibold  text-start"
                >
                  State
                </label>
                <input
                  list="nigerian-states"
                  id="state"
                  name="state"
                  className="w-full p-2 border border-black/40 outline-none text-xs"
                  placeholder="Abia"
                />
                <datalist
                  onChange={(e: any) => setstate(e.target.value)}
                  id="nigerian-states"
                >
                  {nigerianStates.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item}
                        className="font-all text-xs"
                      />
                    );
                  })}
                </datalist>
              </div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="state"
                  className="font-all text-xs font-semibold  text-start"
                >
                  City
                </label>
                <input
                  list="nigerian-states"
                  id="state"
                  name="state"
                  className="w-full p-2 border border-black/40 outline-none text-xs"
                  placeholder="Abia"
                />
                <datalist
                  onChange={(e: any) => setstate(e.target.value)}
                  id="nigerian-states"
                >
                  {nigerianStates.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item}
                        className="font-all text-xs"
                      />
                    );
                  })}
                </datalist>
              </div>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="state"
                  className="font-all text-xs font-semibold  text-start"
                >
                  Zipcode
                </label>
                <input
                  id="state"
                  name="state"
                  className="w-full p-2 border border-black/40 outline-none text-xs"
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between mt-3 gap-4">
              <button
                type={"button"}
                className="border border-green-700 font-all text-sm p-2 text-center w-full self-stretch"
              >
                cancel
              </button>

              <button
                type={"button"}
                className="bg-green-700 font-all text-sm p-2 text-center w-full self-stretch text-white"
              >
                save
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

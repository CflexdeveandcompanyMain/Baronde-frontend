import { useState } from "react";
import { bdm } from "../index";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function UserSignInInterface() {
  let [viewPassword, setViewPassword] = useState<boolean>(false);
  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-center sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <div className="flex flex-row items-center justify-center gap-1">
          <img src={bdm} className="w-10 h-10 sm:w-3/5 rounded object-cover" />
          <div className="flex flex-col items-start self-center">
            <p className="font-all font-semibold text-2xl">Baron</p>
            <p className="font-all text-sm text-start -mt-1">DeMusical</p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full justify-start p-2 my-3">
          <p className="font-all font-semibold text-xl text-start w-full">
            Welcome Back
          </p>
          <small className="font-all font-medium text-stone-600 text-base text-start w-full">
            Hey!, good to see you again
          </small>
        </div>
        <div className="flex flex-col items-center w-full gap-2.5 p-2">
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Email</p>
            <input
              type="text"
              className="rounded-sm shadow outline-0 border font-all text-sm border-stone-700 p-2"
              placeholder="e.g johndoe@xyz.com"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Password</p>
            <div className="flex flex-row items-center w-full border text-sm border-stone-700 rounded-sm shadow">
              <input
                type={viewPassword ? "text" : "password"}
                className="w-full outline-0 p-2 font-all"
                placeholder="* * * * * * *"
              />
              <div
                onClick={() => setViewPassword(!viewPassword)}
                className="flex justify-center w-[4rem] cursor-pointer"
              >
                <EyeIcon
                  className={`${
                    viewPassword ? "hidden" : "flex"
                  }  lucide lucide-eye-icon lucide-eye`}
                />
                <EyeOffIcon
                  className={`${
                    viewPassword ? "flex" : "hidden"
                  } lucide lucide-eye-off-icon lucide-eye-off`}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Link to={"/forgot"}>
              <span className="font-all text-xs text-end font-normal text-orange-400">
                Forgot Password?
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="p-3 bg-green-700 rounded-sm shadow w-full font-all font-normal text-white"
          >
            Sign In
          </button>
          <div className="w-full flex justify-end">
            <p className="font-all text-xs text-end font-normal">
              Don't have an account?
              <Link to={"/signup"}>
                <span className="text-orange-400">sign up</span>
              </Link>
            </p>
          </div>
          <div className="flex flex-row items-center w-full gap-2">
            <div className="h-[1px] bg-black/30 w-1/2 self-center"></div>
            <p className="font-medium font-all text-sm self-center">or</p>
            <div className="h-[1px] bg-black/30 w-1/2 self-center"></div>
          </div>
        </div>
        <GoogleLogin
          width={"100%"}
          onSuccess={() => console.log("success")}
          onError={() => console.log("error")}
        />
        <div className="flex flex-row items-center self-start my-2 gap-2 justify-between sm:w-1/3 mx-0 w-1/2">
          <p className="font-all text-xs">Privacy policy</p>
          <p className="font-all text-xs">Terms of use</p>
        </div>
      </section>
    </section>
  );
}

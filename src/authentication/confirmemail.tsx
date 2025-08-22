import { Link } from "react-router-dom";
import { bdm } from "..";
import BrandLogo from "../utils/brand";

export default function ConfirmEmail() {
  <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
    <section className="w-full bg-white self-start mt-[10%] sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
      <BrandLogo img={bdm} color="black" />
      <div className="flex flex-col items-start w-full justify-start p-2 my-1.5">
        <p className="font-all font-semibold text-lg text-start w-full">
          Confirm your email
        </p>
        <small className="font-all font-medium text-stone-600 text-xs text-start w-full">
          Enter your email and we'll send you a verification code to verify your
          email
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
        <button
          type="button"
          className="p-3 bg-green-700 rounded-sm shadow w-full font-all font-normal text-white"
        >
          Send code
        </button>
      </div>
      <div className="flex flex-row items-center self-start my-2 gap-5 justify-between">
        <Link to={"/policy"} className="font-all text-xs">
          Privacy policy
        </Link>
        <Link to={"/term"} className="font-all text-xs">
          Terms of use
        </Link>
      </div>
    </section>
  </section>;
}

import { Link } from "react-router-dom";
import { bdm } from "..";

export default function ForgotPassword() {
  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-start mt-[10%] sm:self-center sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <div className="flex flex-row items-center justify-center gap-1 -ml-2">
          <img src={bdm} className="w-10 h-10 sm:w-3/5 rounded object-cover" />
          <div className="flex flex-col items-start">
            <p className="font-all font-semibold text-2xl">Baron</p>
            <p className="font-all text-sm text-start -mt-1">DeMusical</p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full justify-start p-2 my-1.5">
          <p className="font-all font-semibold text-lg text-start w-full">
            Forgot Password
          </p>
          <small className="font-all font-medium text-stone-600 text-xs text-start w-full">
            Enter your email and we'll send you a verification code to reset
            your password
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
          <div className="w-full flex justify-end">
            <p className="font-all text-xs text-end font-normal">
              Already have an account?
              <Link to={"/signin"}>
                <span className="text-orange-400"> sign in.</span>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center self-start my-2 gap-2 justify-between sm:w-1/3 mx-0 w-1/2">
          <p className="font-all text-xs">Privacy policy</p>
          <p className="font-all text-xs">Terms of use</p>
        </div>
      </section>
    </section>
  );
}

import { useState } from "react";
import { bdm } from "../index";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getGoogleUserInfo, getOTP } from "../utils/getFetch";
import { useAuthStore } from "../store/user";
import { LoaderCircleIcon } from "lucide-react";

export default function UserCreateAccount() {
  let [viewPassword, setViewPassword] = useState<boolean>(false);
  let [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  let [trigger, setTrigger] = useState(false);
  let { setOtpId } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { status, data, error } = useQuery({
    queryKey: ["getOTP", "create temp user"],
    queryFn: () => getOTP(userInfo.name, userInfo.email),
    enabled: trigger,
  });

  let { name, email, password } = userInfo;

  const handleSubmit = () => {
    if (name && email && password) {
      setTrigger(true);
      if (status == "success") {
        setOtpId(data.otpid);
        setTimeout(() => navigate("/code"), 1000);
      }
      if (status == "error") console.log(error);
    }
  };

  const sendUserToken = (token: CredentialResponse) => {
    if (token) {
      getGoogleUserInfo(token)
        .then((result) => console.log(result))
        .catch((err) => console.error(err));
    }
  };

  return (
    <section className="w-full bg-white h-screen sm:bg-gray-200 flex justify-center">
      <section className="w-full bg-white self-center sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <div className="flex flex-row items-center justify-center gap-1">
          <img src={bdm} className="w-10 h-10 sm:w-3/5 rounded object-cover" />
          <div className="flex flex-col items-start self-start">
            <p className="font-all font-semibold text-2xl">Baron</p>
            <p className="font-all text-sm text-start -mt-1">DeMusical</p>
          </div>
        </div>
        <p className="font-all font-semibold text-xl text-start w-full my-3">
          Create an Account
        </p>
        <div className="flex flex-col items-center w-full gap-2.5 p-2">
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Name</p>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="rounded-sm shadow outline-0 font-all border text-sm border-stone-700 p-2"
              placeholder="e.g John Doe..."
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Email</p>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="rounded-sm shadow outline-0 border font-all text-sm border-stone-700 p-2"
              placeholder="e.g johndoe@xyz.com"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Password</p>
            <div className="flex flex-row items-center w-full border text-sm border-stone-700 rounded-sm shadow">
              <input
                onChange={handleChange}
                name="password"
                type={viewPassword ? "text" : "password"}
                className="w-full outline-0 p-2 font-all"
                placeholder="* * * * * * *"
              />
              <div
                onClick={() => setViewPassword(!viewPassword)}
                className="flex justify-center w-[4rem] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    viewPassword ? "hidden" : "flex"
                  }  lucide lucide-eye-icon lucide-eye`}
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${
                    viewPassword ? "flex" : "hidden"
                  } lucide lucide-eye-off-icon lucide-eye-off`}
                >
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                  <path d="m2 2 20 20" />
                </svg>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            disabled={trigger && status === "pending"}
            className="p-3 bg-green-700 rounded-sm shadow w-full font-all font-normal flex justify-center text-white"
          >
            {trigger && status === "pending" ? (
              <LoaderCircleIcon className="animate-spin" size={16} />
            ) : (
              "Create account"
            )}
          </button>
          <div className="w-full flex justify-end">
            <p className="font-all text-xs text-end font-normal">
              Already have an account?
              <Link to={"/signin"}>
                <span className="text-orange-400"> sign in.</span>
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
          onSuccess={(token) => sendUserToken(token)}
          onError={() => console.log("error")}
        />
        <div className="flex flex-row items-center self-start my-2 gap-2 justify-between sm:w-1/3 mx-0 w-1/2">
          <Link to={"/policy"} className="font-all text-xs">
            Privacy policy
          </Link>
          <Link to={"/term"} className="font-all text-xs">
            Terms of use
          </Link>
        </div>
      </section>
    </section>
  );
}

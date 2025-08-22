import { useState } from "react";
import { bdm } from "../index";
// import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { userLogIn } from "../utils/getFetch";
import { useAuthStore } from "../store/user";
import ErrorMessage from "../utils/errorMessage";
import BrandLogo from "../utils/brand";

export default function UserSignInInterface() {
  let [viewPassword, setViewPassword] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(true);
  let [message, setMessage] = useState<string>("");
  let [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  let [lock, setLock] = useState(false);
  let [trigger, setTrigger] = useState(false);

  let navigate = useNavigate();

  let { setCredentials, verifyOtp } = useAuthStore();

  const fetchData = async () => {
    try {
      const result = await userLogIn(userInfo.email, userInfo.password);

      if (!result.user && result.message) {
        setMessage(result.message);

        if (result.message.startsWith("Account locked")) setLock(true);

        setTimeout(() => setMessage(""), 5000);
      } else {
        let { name, email, id, role } = result.user;
        if (role === "admin") {
          navigate("/admin");
          return;
        }

        setMessage("");

        sessionStorage.setItem(
          "baron:user",
          JSON.stringify({ name, email, isVerified: true })
        );

        setCredentials(name, email, "", id);

        verifyOtp();

        navigate("/");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessage(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTrigger(false);

    setLoading(true);

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-center sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <BrandLogo img={bdm} color="black" />
        <div className="flex flex-col items-start w-full justify-start p-2 my-3">
          <p className="font-all font-semibold text-xl text-start w-full">
            Welcome back
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
              onChange={handleChange}
              name="email"
              className="rounded-sm shadow outline-0 border font-all text-sm border-stone-700 p-2"
              placeholder="e.g johndoe@xyz.com"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">Password</p>
            <div className="flex flex-row items-center w-full border text-sm border-stone-700 rounded-sm shadow">
              <input
                name="password"
                type={viewPassword ? "text" : "password"}
                onChange={handleChange}
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
          <div className="w-full flex justify-between">
            <ErrorMessage message={message} />
            <Link to={"/forgot"}>
              <span className="font-all text-xs text-end font-normal text-orange-400">
                Forgot Password?
              </span>
            </Link>
          </div>
          <button
            onClick={async () => {
              setTrigger(true);
              await fetchData();
            }}
            disabled={lock}
            type="button"
            className={`p-3 ${
              lock ? "bg-[#D4D4D4]" : "bg-[#008236]"
            } rounded-sm shadow w-full justify-center flex font-all font-normal text-white`}
          >
            {trigger && loading ? (
              <LoaderCircleIcon
                className="animate-spin text-center"
                size={16}
              />
            ) : (
              "Sign in"
            )}
          </button>
          <div className="w-full flex justify-end">
            <p className="font-all text-xs text-end font-normal">
              Don't have an account?
              <Link to={"/signup"}>
                <span className="text-orange-400"> sign up</span>
              </Link>
            </p>
          </div>
          {/* <div className="flex flex-row items-center w-full gap-2">
            <div className="h-[1px] bg-black/30 w-1/2 self-center"></div>
            <p className="font-medium font-all text-sm self-center">or</p>
            <div className="h-[1px] bg-black/30 w-1/2 self-center"></div>
          </div> */}
        </div>
        {/* <GoogleLogin
          width={"100%"}
          onSuccess={() => console.log("success")}
          onError={() => console.log("error")}
        /> */}
        <div className="flex flex-row items-center self-start my-2 gap-5 justify-between">
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

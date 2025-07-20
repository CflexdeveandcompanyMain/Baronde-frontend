import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../utils/brand";
import { bdm } from "..";
import { useState } from "react";
import ErrorMessage from "../utils/errorMessage";
import { createAdmin } from "../utils/getFetch";

export default function AdminCreate() {
  let [viewPassword, setViewPassword] = useState<boolean>(false);
  let [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  let [trigger, setTrigger] = useState(false);
  let [message, setMessage] = useState("");
  let [loading, setLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const result = await createAdmin(
        userInfo.name,
        userInfo.email,
        userInfo.password,
        "admin",
        "",
        ""
      );
      if (!result.user && result.message) {
        setMessage(result.message);

        setTimeout(() => setMessage(""), 5000);
      } else {
        console.log(result);
        setMessage("");
        navigate("/admin");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessage(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  let { name, email, password } = userInfo;
  const handleSubmit = async () => {
    if (name && email && password) {
      setTrigger(true);
      await fetchData();
    }
  };

  return (
    <section className="w-full bg-white h-screen sm:bg-gray-200 flex justify-center">
      <section className="w-full bg-white self-center sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <BrandLogo img={bdm} />
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
          <div className="flex justify-start w-full">
            <ErrorMessage message={message} />
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            disabled={trigger && loading}
            className="p-3 bg-green-700 rounded-sm shadow w-full font-all font-normal flex justify-center text-white"
          >
            {trigger && loading ? (
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

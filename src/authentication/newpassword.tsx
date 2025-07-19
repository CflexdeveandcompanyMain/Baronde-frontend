import { Link, useNavigate } from "react-router-dom";
import { bdm } from "..";
import { resetPassword } from "../utils/getFetch";
import { useState } from "react";
import { useAuthStore } from "../store/user";
import ErrorMessage from "../utils/errorMessage";
import { LoaderCircleIcon } from "lucide-react";
import BrandLogo from "../utils/brand";

export default function NewPassword() {
  let [newpassword, setNewPassword] = useState("");
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(true);
  let { email, otp, otpid } = useAuthStore();
  let [trigger, setTrigger] = useState(false);

  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      console.log(email, otp, otpid, newpassword);
      const result = await resetPassword(email, otp, otpid, newpassword);
      console.log(result);

      if (result.message === "Password updated successfully") {
        setMessage(result.message);
        setTimeout(() => navigate("/signin"), 1000);
      } else {
        setMessage(message);
        setTimeout(() => navigate("/signup"), 2000);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Unknown error");

        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-start mt-[10%] sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <BrandLogo img={bdm} />
        <div className="flex flex-col items-start w-full justify-start p-2 my-1.5">
          <p className="font-all font-semibold text-lg text-start w-full">
            Reset password
          </p>
          <small className="font-all font-medium text-stone-600 text-xs text-start w-full">
            Enter your new password.
          </small>
        </div>
        <div className="flex flex-col items-center w-full gap-2.5 p-2">
          <div className="flex flex-col w-full gap-2">
            <p className="font-medium text-sm text-start font-all">
              New password
            </p>
            <input
              type="text"
              onChange={(e) => {
                setNewPassword(e.target.value);
                setTrigger(false);
              }}
              className="rounded-sm shadow outline-0 border font-all text-sm border-stone-700 p-2"
              placeholder="e.g johndoe@xyz.com"
            />
          </div>
          <button
            onClick={async () => {
              setTrigger(true);
              await fetchData();
            }}
            type="button"
            className={`p-3 bg-[#008236] rounded-sm shadow w-full justify-center flex font-all font-normal text-white`}
          >
            {trigger && loading ? (
              <LoaderCircleIcon
                className="animate-spin text-center"
                size={16}
              />
            ) : (
              "Reset password"
            )}
          </button>
          <div className="w-full flex flex-row items-center justify-between">
            <ErrorMessage message={message} />
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

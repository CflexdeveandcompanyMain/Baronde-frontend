import { Link, useNavigate } from "react-router-dom";
import { bdm } from "..";
import { requestOtp } from "../utils/getFetch";
import { useState } from "react";
import { useAuthStore } from "../store/user";
import ErrorMessage from "../utils/errorMessage";
import { LoaderCircleIcon } from "lucide-react";

export default function ForgotPassword() {
  let [Email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(true);
  let { setOtpId, email, otpid, setCredentials } = useAuthStore();
  let [trigger, setTrigger] = useState(false);

  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await requestOtp(Email);
      console.log(result);

      if (!result.otpId && result.message) {
        setMessage(result.message);

        setTimeout(() => setMessage(""), 7000);
      } else {
        if (result.otpId && result.message) {
          let { otpId, message } = result;

          setMessage(message);

          setOtpId(otpId);

          setCredentials("", email, "", "");

          console.log(email, otpid);
          navigate("/code");
        }
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
              onChange={(e) => {
                setEmail(e.target.value);
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
              "Send code"
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

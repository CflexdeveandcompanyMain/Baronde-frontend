import { useRef, useState } from "react";
import { bdm } from "..";
import { useAuthStore } from "../store/user";
import { createUser } from "../utils/getFetch";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [otp, setOtp] = useState(Array(5).fill(""));
  const inputsRef: any = useRef<HTMLInputElement[] | null[]>([]);

  let [trigger, setTrigger] = useState(false);

  let navigate = useNavigate();

  let { name, email, password, otpid, setCredentials } = useAuthStore();

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(`${value}`)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const inputComplete = otp.every((item) => item !== "");

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    console.log(name, email, password, otpid, otp.join(""));
    if (otpid && otp.join("")) {
      setTrigger(true);
      const result = await createUser(
        name,
        email,
        password,
        otp.join(""),
        otpid
      );
      if (result.user) {
        let { name, email, id } = result.user;
        localStorage.setItem(
          "baron:user",
          JSON.stringify({ name, email, isVerified: true })
        );
        setCredentials(name, email, password, id);
        navigate("/");
      }
      console.log(result);
    }
  };

  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-start mt-[10%] sm:mt-[10%] sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <div className="flex flex-row items-center justify-center gap-1 -ml-2">
          <img src={bdm} className="w-10 h-10 sm:w-3/5 rounded object-cover" />
          <div className="flex flex-col items-start">
            <p className="font-all font-semibold text-2xl">Baron</p>
            <p className="font-all text-sm text-start -mt-1">DeMusical</p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full justify-start p-2 my-1.5">
          <p className="font-all font-semibold text-lg text-start w-full">
            Enter verification code
          </p>
          <small className="font-all font-medium text-stone-600 text-xs text-start w-full">
            Check your mail we send you a verification code to verify your email
          </small>
        </div>
        <div className="flex flex-col items-start w-full gap-3 p-2">
          <p className="font-all font-medium text-sm text-start w-full">
            Enter code
          </p>
          <div className="flex flex-row items-center gap-3 w-auto">
            {otp.map((item, index) => {
              return (
                <input
                  key={index}
                  maxLength={1}
                  value={item}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el: any) => (inputsRef.current[index] = el)}
                  type="text"
                  className={`w-10 h-10 border rounded p-2 text-center font-all`}
                />
              );
            })}
          </div>
          <p className="font-all font-medium text-sm text-start w-full text-gray-400">
            Code resend in
            <span className="text-orange-500 text-[13px] ml-1">3:12</span>
          </p>
        </div>
        <button
          disabled={trigger && inputComplete}
          onClick={handleSubmit}
          type="button"
          className={`p-3 ${
            trigger ? "bg-[#D4D4D4]" : "bg-green-800"
          } rounded-sm shadow justify-center w-full font-all font-normal text-white`}
        >
          Send code
        </button>
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

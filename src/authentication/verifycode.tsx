import { useRef, useState } from "react";
import { bdm } from "..";
import BrandLogo from "../utils/brand";
import CountdownTimer from "./timer";

export default function VerifyCode() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef: any = useRef<HTMLInputElement[] | null[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(`${value}`)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const isCorrect = otp.join("") === "100100";
  console.log(otp.every((item) => item !== ""));
  const isCorrectI = otp.every((item) => item !== "") && isCorrect;
  return (
    <section className="w-full bg-white sm:bg-gray-200 h-screen flex justify-center">
      <section className="w-full bg-white self-start mt-[10%] sm:mt-[10%] sm:h-auto sm:w-1/2 mx-auto rounded-sm flex flex-col items-center gap-2 p-3">
        <BrandLogo img={bdm} />
        <div className="flex flex-col items-start w-full justify-start p-2 my-1.5">
          <p className="font-all font-semibold text-lg text-start w-full">
            Enter verification code
          </p>
          <small className="font-all font-medium text-stone-600 text-xs text-start w-full">
            Enter your email and we'll send you a verification code to reset
            your password
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
                  className={`w-10 h-10 border ${
                    !isCorrectI ? "border-red-500" : "border-stone-500"
                  } rounded p-2 text-center font-all`}
                />
              );
            })}
          </div>
          <CountdownTimer />
        </div>
        <button
          type="button"
          className={`p-3 ${
            isCorrect ? `bg-green-700` : "bg-gray-300"
          } rounded-sm shadow w-full font-all font-normal text-white`}
        >
          Send code
        </button>
        <div className="flex flex-row items-center self-start my-2 gap-2 justify-between sm:w-1/3 mx-0 w-1/2">
          <p className="font-all text-xs">Privacy policy</p>
          <p className="font-all text-xs">Terms of use</p>
        </div>
      </section>
    </section>
  );
}

import { Link } from "react-router-dom";
import { fb, google, ig, star, wha, youtube } from "..";
import { useState } from "react";

export default function Footer() {
  let [val, setVal] = useState("");
  return (
    <div className={"w-full bg-slate-100/50 py-4 sm:py-7 gap-3"}>
      <GoogleReview />
      <footer className="w-full p-7 sm:p-10 flex flex-col items-start bg-[#F0FDF4] mt-3">
        <section className="flex flex-col sm:flex-row items-center w-full sm:gap-2 gap-10 justify-between">
          <div className="flex flex-col items-start w-4/5 self-start">
            <p className="font-all font-semibold text-green-950 sm:text-lg text-[13px]">
              ABOUT barondemusical
            </p>
            <p className="font-all text-xs text-[#677279] w-full sm:w-4/5 leading-5">
              At Barondemusical, we pride ourselves on delivering the best in
              sound quality, durability, and performance, ensuring you have the
              right tools to create amazing music. Explore our collection and
              experience the difference that premium gear can make in your
              musical journey
            </p>
          </div>
          <div className="flex flex-row items-center gap-10 w-full sm:w-4/5 self-start">
            <div className="flex flex-col items-start gap-2 self-start min-w-[100px]">
              <p className="font-all text-sm font-medium text-[#677279]">
                POLICIES
              </p>
              <Link
                to={"/term"}
                className="font-all text-xs font-normal text-[#677279]"
              >
                Terms of Services
              </Link>
              <Link
                to={"/shipping"}
                className="font-all text-xs font-normal text-[#677279]"
              >
                Shipping policy
              </Link>
              <Link
                to={"/policy"}
                className="font-all text-xs font-normal text-[#677279]"
              >
                Privacy policy
              </Link>
              <Link
                to={"/about"}
                className="font-all text-xs font-normal text-[#677279]"
              >
                Contact information
              </Link>
            </div>
            <div className="flex flex-col items-center gap-3 justify-start self-start">
              <p className="font-all text-sm text-start w-full font-medium text-[#677279]">
                NEWSLETTER
              </p>
              <p className="font-all text-xs font-normal text-[#677279]">
                Subscribe to our newsletter and be the first to receive
                exclusive offers, discounts, and deals!
              </p>
              <div className="flex flex-col items-center w-full gap-3">
                <input
                  onChange={(e) => setVal(e.target.value)}
                  value={val}
                  type={"email"}
                  className="text-xs font-medium bg-white w-full p-3 outline-none border border-stone-300"
                  placeholder="email"
                />
                <button
                  onClick={() => setVal("")}
                  type="button"
                  className={`bg-green-900 shadow text-sm p-3 w-full font-all font-normal text-white`}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full flex sm:flex-row items-start sm:items-center flex-col justify-start sm:justify-between mt-4">
          <p className="font-all text-sm text-start font-medium text-[#677279] self-center sm:w-auto w-full">
            © 2025 BARONDEMUSICAL
          </p>
          <div className="flex flex-col items-start gap-2 self-center sm:w-auto w-full">
            <p className="font-all text-xs text-[#677279] font-medium text-start">
              Follow us
            </p>
            <div className="flex flex-row items-center gap-3">
              <Link
                to={
                  "https://web.facebook.com/people/Soundprincemusicalworld/61561311194823"
                }
                className="w-7 h-7 rounded-full bg-green-950 p-2 flex justify-center"
              >
                <img src={fb} className="object-contain" />
              </Link>
              <Link
                to={"https://www.instagram.com/soundprincemusicalworld/"}
                className="w-7 h-7 rounded-full bg-green-950 p-2 flex justify-center"
              >
                <img src={ig} className="object-contain" />
              </Link>
              <Link
                to={"https://www.youtube.com/@SoundprinceMusicalworld"}
                className="w-8 h-8 rounded-full bg-green-950 p-2 flex justify-center"
              >
                <img src={youtube} className="object-contain" />
              </Link>
              <Link
                to={
                  "https://wa.me/2349138254838?text=`Hello!, I'm interested in your servce`"
                }
                className="w-7 h-7 rounded-full bg-green-950 p-2 flex justify-center"
              >
                <img src={wha} className="object-cover" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GoogleReview() {
  return (
    <section className="sm:w-3/4 md:w-2/5 w-[90%] bg-white p-2 pt-4 justify-between sm:p-3 rounded-2xl shadow-lg pb-6 mx-auto flex flex-row items-center">
      <div className="flex flex-row items-center gap-1 sm:gap-3 self-center">
        <img src={google} className="sm:w-14 sm:h-14 w-10 h-10 object-cover" />
        <div className="flex flex-col items-start gap-1">
          <p className="font-all text-sm sm:text-base text-start font-semibold">
            barondemusical
          </p>
          <div className="flex flex-row items-center gap-3 justify-start">
            <p className="font-all text-xs font-semibold text-start">4.8</p>
            <div className="flex flex-row items-center gap-1.5">
              <img src={star} className="w-3 h-3 object-cover" />
              <img src={star} className="w-3 h-3 object-cover" />
              <img src={star} className="w-3 h-3 object-cover" />
              <img src={star} className="w-3 h-3 object-cover" />
              <img src={star} className="w-3 h-3 object-cover" />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          (window.location.href = "https://g.page/r/CRsI6LTBLEsxEAE/review")
        }
        className="rounded-2xl w-[45%] cursor-pointer sm:w-1/3 border border-stone-100 self-center items-center p-3 text-stone-600 font-all
      text-xs"
      >
        Leave a Review
      </button>
    </section>
  );
}

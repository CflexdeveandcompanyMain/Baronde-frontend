import { fb } from "..";

export default function Footer() {
  return (
    <footer className="w-full p-7 sm:p-10 flex flex-col items-start bg-[#F0FDF4]">
      <section className="flex flex-col sm:flex-row items-center w-full sm:gap-2 gap-10 justify-between">
        <div className="flex flex-col items-start w-4/5 self-start">
          <p className="font-all font-semibold text-green-950 sm:text-lg text-[13px]">
            ABOUT barondemusical
          </p>
          <p className="font-all text-xs text-[#677279] w-full sm:w-4/5 leading-5">
            At Barondemusical, we pride ourselves on delivering the best in
            sound quality, durability, and performance, ensuring you have the
            right tools to create amazing music. Explore our collection and
            experience the difference that premium gear can make in your musical
            journey
          </p>
        </div>
        <div className="flex flex-row items-center gap-10 w-full sm:w-4/5 self-start">
          <div className="flex flex-col items-start gap-2 self-start min-w-[100px]">
            <p className="font-all text-sm font-medium text-[#677279]">
              POLICIES
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Search
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Terms of Services
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Refund policy
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Shipping policy
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              privacy policy
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Contact information
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 justify-start self-start">
            <p className="font-all text-sm text-start w-full font-medium text-[#677279]">
              NEWSLETTER
            </p>
            <p className="font-all text-xs font-normal text-[#677279]">
              Subscribe to our newsletter and be the first to receive exclusive
              offers, discounts, and deals!
            </p>
            <div className="flex flex-col items-center w-full gap-3">
              <input
                type={"email"}
                className="text-xs font-medium bg-white w-full p-3 outline-none border border-stone-300"
                placeholder="email"
              />
              <button
                type="button"
                className={`bg-green-900 shadow text-sm p-3 w-full font-all font-normal text-white`}
              >
                Suscribe
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex sm:flex-row items-center flex-col">
          <p className="font-all text-sm text-start font-medium text-[#677279]">
            © 2025 BARONDEMUSICAL
          </p>
          <div className="flex flex-col items-start gap-2">
            <p className="font-all text-xs text-[#677279] font-medium text-start">
              Follow us
            </p>
            <div className="flex flex-row items-center gap-3">
              <div className="w-20 max-h-20 rounded-full bg-green-950 p-2 flex justify-center">
                <img src={fb} className="object-cover w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

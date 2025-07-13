import MainPageNavbar from "./navbar";

export default function Testimonial() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="flex justify-center w-full sm:min-h-[300px] min-h-[200px] bg-stone-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 fill-current self-center text-stone-100"
              viewBox="0 0 20 20"
            >
              <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
            </svg>
          </div>
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl text-center w-full text-green-600">
              Shop From
              <span className="text-[#E5A000] font-all"> The Best</span>
            </p>
            <p className="font-all text-sm text-center w-full">
              Discover premium musical instruments and audio equipment at
              Barondemusical, offering superior sound quality, durability, and
              unmatched performance for musicians.
            </p>
          </div>
          <section className="w-full gap-5 flex flex-col items-start">
            <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-5">
              <div className="flex justify-center sm:w-3/5 w-full bg-stone-300 self-stretch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 fill-current self-center text-stone-100"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              </div>
              <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
                <p className="font-all font-semibold text-2xl text-start w-full text-green-600 gap-3">
                  Shop From
                  <span className="text-[#E5A000] font-all"> The Best</span>
                </p>
                <p className="font-all text-[13px] text-start w-full">
                  Discover premium musical instruments and audio equipment at
                  Barondemusical, offering superior sound quality, durability,
                  and unmatched performance for musicians.Discover premium
                  musical instruments and audio equipment at Barondemusical,
                  offering superior sound quality, durability, and unmatched
                  performance for musicians.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-5">
              <div className="flex justify-center sm:w-3/5 w-full bg-stone-300 self-stretch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 fill-current self-center text-stone-100"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              </div>
              <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
                <p className="font-all font-semibold text-2xl text-start w-full text-green-600 gap-3">
                  Shop From
                  <span className="text-[#E5A000] font-all"> The Best</span>
                </p>
                <p className="font-all text-[13px] text-start w-full">
                  Discover premium musical instruments and audio equipment at
                  Barondemusical, offering superior sound quality, durability,
                  and unmatched performance for musicians.Discover premium
                  musical instruments and audio equipment at Barondemusical,
                  offering superior sound quality, durability, and unmatched
                  performance for musicians.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

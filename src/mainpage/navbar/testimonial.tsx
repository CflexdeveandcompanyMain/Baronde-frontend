import Footer from "../../footer/footer";
import MainPageNavbar from "./navbar";

export default function Testimonial() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="relative w-full pb-[56.25%] bg-stone-300">
            <video
              controls
              className="absolute top-0 left-0 w-full h-full object-contain"
            >
              <source
                src="https://res.cloudinary.com/dmaag3pvx/video/upload/v1755457790/vid1_obgsjs.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl text-center w-full text-green-600">
              Shop From
              <span className="text-[#E5A000] font-all"> The Best</span>
            </p>
            <p className="font-all text-sm text-center w-full font-medium">
              Discover premium musical instruments and audio equipment at
              Barondemusical, offering superior sound quality, durability, and
              unmatched performance for musicians.
            </p>
          </div>
          <section className="w-full gap-5 flex flex-col items-start"></section>
        </div>
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl animate-pulse text-center w-full text-black">
              Trusted by Musicians, Loved by Customers
            </p>
            <p className="font-all text-sm text-center w-full font-medium">
              At Barondemusical, we don't just sell instruments—we deliver
              experiences. Customers choose us because we consistently provide
              the best quality, the best service, and the best value for every
              musician.
            </p>
          </div>
          <section className="w-full gap-5 flex flex-col items-start"></section>
        </div>
      </section>
      <Footer />
    </>
  );
}

{
  /* <div className="relative w-full pb-[56.25%] bg-stone-300">
            <ReactPlayer
              src="https://res.cloudinary.com/dmaag3pvx/video/upload/v1755457790/vid1_obgsjs.mp4"
              controls
            />
            {/* <video
              controls
              className="absolute top-0 left-0 w-full h-full object-contain"
            >
              <source
                src="https://res.cloudinary.com/dmaag3pvx/video/upload/v1755458406/vid2_sbihoj.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */
}
//   </div> */}
// </section>*/

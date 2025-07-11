import { Phone, Star } from "lucide-react";
import { fb, ig, MainPageNavbar, map, whatsapp, x } from "../..";
import Footer from "../../footer/footer";

export default function About() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-full">
            <p className="font-all text-xl text-center w-full text-orange-500 font-semibold">
              <span className="text-emerald-700 font-all">Who</span> are we
            </p>
            <p className="font-all text-[12.5px] text-start">
              Welcome to Barondemusical, your go-to place for high-quality
              musical equipment! We specialize in offering top-notch SoundPrince
              and other products gear, carefully selected to meet the needs of
              musicians at all levels. Whether you're a seasoned pro or just
              starting out, we understand that choosing the right equipment can
              be overwhelming.
              <br />
              <br />
              That's why we're here to help you find the perfect setup with
              ease. Our platform is designed to make your decision process
              simpler by offering the best combinations of equipment, so you get
              the quality and value you deserve. At Barondemusical,we're
              passionate about music and committed to providing exceptional
              products and support. Let us guide you to the gear that will help
              you create your best sound! Feel free to reach out with any
              questions or for personalized recommendations—we're here to make
              your musical journey as smooth as possible.
            </p>
          </div>
          <div className="relative flex flex-col w-full">
            <img
              src={map}
              className="w-full object-cover sm:h-auto h-[330px]"
            />
            <div className="flex flex-col items-start gap-4 absolute w-3/4 sm:max-w-[40%] top-12 p-2 left-3 bg-white rounded-sm">
              <p className="font-semibold text-xs text-start w-full">
                Sound Prince Musical World
              </p>
              <div className="flex flex-col items-start gap-4 justify-start">
                <p className="font-medium text-xs text-start w-full">
                  Alaba Int'l Market, Sp Sampling Plaza, Opp Zenith Bank, off
                  Dobbil close, Ojo, Lagos 102115, Lagos
                </p>
                <div className="flex flex-row items-center w-full gap-4">
                  <p className="font-medium text-start text-xs font-all">4.0</p>
                  <div className="flex flex-row items-center gap-2">
                    <Star className="text-orange-600" size={"16"} />
                    <Star className="text-orange-600" size={"16"} />
                    <Star className="text-orange-600" size={"16"} />
                    <Star className="text-orange-600" size={"16"} />
                    <Star className="text-orange-600" size={"16"} />
                  </div>
                  <p className="font-medium text-start text-blue-600 text-xs font-all">
                    2 reviews
                  </p>
                </div>
                <p className="font-all text-sm text-start w-full">
                  View larger map
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-full flex justify-center bg-green-950">
              <Phone className="text-white self-center" size={13} />
            </div>
            <p className="font-bold text-green-900 font-all text-lg">
              Contact Us: <span className="text-orange-600">08138254832</span>
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 mt-2">
            <div className="w-9 h-9 rounded-full bg-green-950 p-2 flex justify-center">
              <img src={fb} className="object-contain scale-90" />
            </div>
            <div className="w-9 h-9 rounded-full bg-green-950 p-2 flex justify-center">
              <img src={ig} className="object-contain scale-90" />
            </div>
            <div className="w-9 h-9 rounded-full bg-green-950 p-2 flex justify-center">
              <img src={x} className="object-contain scale-90" />
            </div>
            <div className="w-9 h-9 rounded-full bg-green-950 p-2 flex justify-center">
              <img src={whatsapp} className="object-contain scale-90" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

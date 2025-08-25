import { Phone } from "lucide-react";
import { MainPageNavbar } from "../..";
import Footer from "../../footer/footer";

export default function Contact() {
  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[98%] gap-2 sm:h-auto sm:w-3/4 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center sm:w-3/4 w-full mx-auto">
            <div className="flex justify-center w-full bg-green-800 p-2 rounded-t">
              <p className="text-white font-all text-lg capitalize">
                Get in touch with us now!
              </p>
            </div>
            <div className="flex flex-row items-center w-full">
              <div className="flex justify-center min-h-[120px] rounded-b w-full bg-slate-50 border-r border-stone-400">
                <div className="flex flex-col items-center self-center">
                  <Phone className="text-green-900 self-center" size={20} />
                  <p className="font-all text-lg font-semibold text-green-800">
                    Phone Number
                  </p>
                  <p className="font-medium font-all text-base">09138254838</p>
                </div>
                {/* <div className="flex flex-col items-center self-center">
                  <Phone className="text-green-700 self-center" size={20} />
                  <p className="font-all text-lg font-semibold text-green-700">
                    Phone Number
                  </p>
                  <p className="font-medium font-all text-base">09138254838</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

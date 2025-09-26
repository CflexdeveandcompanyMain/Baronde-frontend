import { useQuery } from "@tanstack/react-query";
import { ShopBy } from "../../dynamic/productpage";
import Footer from "../../footer/footer";
import MainPageNavbar from "./navbar";
import { getTestimonyUser } from "../../utils/getFetch";
import { useEffect, useState, type ReactNode } from "react";
import { Loader } from "lucide-react";
import { star } from "../..";
import { formatUpdatedAt } from "../../utils/fetch";

export default function Testimonial() {
  let [ele, setele] = useState<ReactNode>(<></>);

  const { data, status } = useQuery({
    queryKey: ["fetch testimony"],
    queryFn: () => getTestimonyUser(),
  });

  useEffect(() => {
    if (status == "pending")
      setele(
        <div className="sm:w-1/2 w-4/5 mx-auto flex justify-center">
          <Loader className="animate-spin text-green-700" size={18} />
        </div>
      );

    if (status == "success" && data) {
      console.log(data);
      if (data.length > 0) {
        setele(
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
            {data.map((item: any, index: number) => {
              const { caption, image, updatedAt } = item;
              return (
                <div
                  key={index}
                  className="w-full rounded shadow p-4 flex flex-col items-center bg-gradient-to-r from-stone-50 via-silver-300 to-slate-100"
                >
                  <div className="flex flex-row items-center w-full justify-between">
                    <div className="flex flex-row items-center gap-1.5 w-2/3">
                      <img
                        src={image}
                        className="w-6 h-6 rounded-full object-cover border border-green-600"
                      />
                      <p className="font-all text-xs font-medium text-stone-500">
                        Customer
                      </p>
                    </div>
                    <div className="flex flex-row items-end gap-1.5 w-1/3">
                      <img src={star} className="w-2 h-2 object-cover" />
                      <img src={star} className="w-2 h-2 object-cover" />
                      <img src={star} className="w-2 h-2 object-cover" />
                      <img src={star} className="w-2 h-2 object-cover" />
                      <img src={star} className="w-2 h-2 object-cover" />
                    </div>
                  </div>
                  <p className="font-all text-sm font-medium w-full my-2">
                    {caption}
                  </p>
                  <div className="flex justify-end w-full my-1">
                    <p className="text-xs font-medium font-all w-full text-end">
                      {formatUpdatedAt(updatedAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      } else {
        setele(
          <div className="w-full flex justify-center">
            <p className="font-all text-lg text-center w-full">
              No testimonial yet.
            </p>
          </div>
        );
      }
    }
  }, [status]);

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
          <ShopBy />
          <section className="w-full gap-5 flex flex-col items-start"></section>
        </div>
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-4/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl text-center w-full text-black">
              Don't take our words for it.
              <br />
              <span className="text-emerald-600">Trust our customers</span>
            </p>
          </div>
          <section className="w-full flex items-center">{ele}</section>
        </div>
      </section>
      <Footer />
    </>
  );
}

import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import ProductAuthCard from "./product";
import { type HeroDataType } from "../mainpage/Hero/data";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { motion } from "framer-motion";
import { useGlobalState } from "../store/globalstate";
import BreadCrumb from "../utils/breadcrumb";

export default function ProductPage() {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  let { brand } = useGlobalState();

  let parameter = useParams();
  let cat: string = parameter.category?.toLowerCase().replaceAll(" ", "") ?? "";

  if (cat === "double+full_range_speaker") cat = "fullrangespeaker";
  if (cat === "piano+keyboard") cat = "piano";
  if (cat === "single+hanging_speaker") cat = "singlespeaker";
  if (cat === "floor+stage_monitor") cat = "floormonitor";
  if (cat === "power_surge+sequence") cat = "powersurge";
  if (cat === "amplifier_rack") cat = "amp_rack";
  if (cat === "drums") cat = "drum";
  if (cat === "guitars") cat = "guitar";
  if (cat === "mixer_amplifier") cat = "amplifier";

  if (status == "success" && data) {
    let result = data.filter((item: HeroDataType) => {
      if (brand) {
        return item.categories
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(cat.replaceAll("_", ""));
      }
    });

    const totalProducts = result?.length || 0;
    const startCount = totalProducts > 0 ? 1 : 0;
    const endCount = totalProducts;
    const path = ["Home", ...window.location.pathname.split("/")];

    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full pb-3 pt-0 bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-col items-start w-full sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
            <motion.div
              initial={{ scale: 0.4, opacity: 0.5 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.3 }}
              className="bg-[url('https://res.cloudinary.com/dmaag3pvx/image/upload/v1754139989/Frame_2147225481_t3syop.png')] relative bg-cover w-full flex justify-center min-h-[300px] sm:min-h-[400px] bg-center"
            >
              <div className="w-full h-full absolute z-10 inset-0 bg-green-900/50"></div>
              <div className="flex flex-col items-center gap-2 self-center absolute mx-auto z-30">
                <p className="font-all text-4xl font-black text-white">
                  Barondemusical
                </p>
                <p className="font-all sm:text-lg font-medium text-center w-full text-base text-white">
                  {formatString(
                    parameter.category
                      ?.replaceAll("_", " ")
                      .replaceAll("+", "/") ?? "Random"
                  )}
                </p>
              </div>
            </motion.div>

            <div className="w-[90%] sm:w-3/4 mx-auto sm:mt-10">
              <ShopBy />
            </div>
            <section className="flex flex-col items-start w-full gap-1 sm:gap-3 mt-2">
              <div className="flex flex-row items-center w-full">
                {<BreadCrumb path={path} url="product" />}
              </div>
              <div className="flex flex-col items-start gap-2 w-full px-3">
                <p className="font-all text-xs text-start w-full">
                  {totalProducts > 0
                    ? `showing ${startCount} - ${endCount} of ${totalProducts} products`
                    : "No products found"}
                </p>
              </div>
              <div className="w-full p-3 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {result?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="min-w-auto grow self-stretch h-full"
                    >
                      <ProductAuthCard data={item} />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

function formatString(category: string) {
  return (
    category[0].toUpperCase() +
    category.replaceAll("+", "/").replaceAll("_", " ").slice(1)
  );
}

export function ShopBy() {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0.2 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ width: "100%" }}
      className="flex flex-col items-center mx-auto self-center"
    >
      <p className="font-all font-semibold text-xl text-start sm:text-center w-full text-[#677279]">
        Shop the Best Deals and Discounts on Musical Instruments in Nigeria
      </p>
      <p className="font-all text-[12px] text-left font-medium sm:text-center w-full mt-2">
        Get extra value at BarondeMusical with our big deals and sales! Enjoy
        top prices on a wide range of professional sound and musical gear. Save
        big on{" "}
        <span className="text-orange-500 underline"> amplifier racks</span>,
        <span className="text-orange-500 underline"> power amps</span>,
        <span className="text-orange-500 underline"> subs</span>,
        <span className="text-orange-500 underline"> speakers</span>,
        <span className="text-orange-500 underline"> stage monitors</span>,
        <span className="text-orange-500 underline"> line arrays</span>,
        <span className="text-orange-500 underline"> mixers</span>,
        <span className="text-orange-500 underline"> DJ controllers</span>, and
        <span className="text-orange-500 underline">
          {" "}
          public address systems
        </span>
        . We've also got amazing deals on drums, guitars, keyboards, wind
        instruments, microphones, studio gear, and more! And because we’re
        BarondeMusical, you know our deals mean trusted brands, quality
        equipment, and reliable performance.
      </p>
    </motion.div>
  );
}

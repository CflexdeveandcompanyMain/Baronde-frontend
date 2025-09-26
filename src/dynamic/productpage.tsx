import { Link, useParams } from "react-router-dom";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import ProductAuthCard from "./product";
import { type HeroDataType } from "../mainpage/Hero/data";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { motion } from "framer-motion";
import { useGlobalState } from "../store/globalstate";
import BreadCrumb from "../utils/breadcrumb";
import ErrorComp from "../utils/Wrong";

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
  if (cat === "guitars") cat = "guitar";

  if (status == "error") {
    return <ErrorComp />;
  }

  if (status == "success" && data) {
    let result = data.filter((item: HeroDataType) => {
      const normalizedItemCategory = item.categories
        .toLowerCase()
        .replaceAll(" ", "");
      if (brand) {
        if (cat == "amp_rack") {
          return normalizedItemCategory == "amprack";
        } else
          return item.categories
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(cat.replaceAll("_", ""));
      }
    });

    const totalProducts = result?.length || 0;
    const path = ["Home", ...window.location.pathname.split("/")];
    const startCount = totalProducts > 0 ? 1 : 0;
    const endCount = totalProducts;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full pb-3 pt-0 bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-col items-start w-full sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
            <div className="flex flex-row items-center w-full my-1.5 px-2">
              {<BreadCrumb path={path} url="product" />}
            </div>
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

            <div className="flex flex-col items-start w-full justify-start gap-2 p-3 mt-5">
              <p className="font-all font-semibold text-xl text-start w-full text-[#677279]">
                {formatString(
                  parameter.category
                    ?.replaceAll("_", " ")
                    .replaceAll("+", "/") ?? "Random"
                )}
              </p>
              <div className="flex flex-col items-start gap-2 w-full my-1.5">
                <p className="font-all sm:flex hidden text-sm text-start w-full font-medium">
                  {totalProducts > 0
                    ? `Showing ${startCount} - ${endCount} of ${totalProducts} ${
                        totalProducts == 1 ? "product" : "products"
                      }`
                    : "No products found"}
                </p>
                <p className="font-all sm:hidden flex text-sm text-start w-full font-medium">
                  {totalProducts > 0
                    ? `${totalProducts} ${
                        totalProducts == 1 ? "product" : "products"
                      }`
                    : "No products found"}
                </p>
              </div>
            </div>

            <div className="p-3 w-full sm:w-[94%] sm:mt-10">
              <ShopBy />
            </div>
            <section className="flex flex-col items-start w-full gap-1 sm:gap-3 mt-2">
              <div className="w-full p-1.5 sm:p-3 grid lg:grid-cols-4 grid-cols-2">
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
      className="flex flex-col items-center mx-auto self-center w-full"
    >
      <p className="font-all font-semibold text-xl text-start w-full text-[#677279]">
        Shop the Best Deals and Discounts on Musical Instruments in Nigeria
      </p>
      <p className="font-all text-[13px] text-left font-medium w-full mt-2">
        Get extra value at BarondeMusical with our big deals and sales! Enjoy
        top prices on a wide range of professional sound and musical gear. Save
        big on{" "}
        <Link
          to={"/product/amplifier_rack"}
          className="text-orange-500 underline"
        >
          {" "}
          amplifier racks
        </Link>
        ,
        <Link
          to={"/product/power_amplifier"}
          className="text-orange-500 underline"
        >
          {" "}
          power amps
        </Link>
        ,
        <Link to={"/product/double_sub"} className="text-orange-500 underline">
          {" "}
          subs
        </Link>
        ,
        <Link
          to={"/product/double+full_range_speaker"}
          className="text-orange-500 underline"
        >
          {" "}
          speakers
        </Link>
        ,
        <Link
          to={"/product/floor+stage_monitor"}
          className="text-orange-500 underline"
        >
          {" "}
          stage monitors
        </Link>
        ,
        <Link to={"/product/line_array"} className="text-orange-500 underline">
          {" "}
          line arrays
        </Link>
        ,
        <Link
          to={"/product/mixer_amplifier"}
          className="text-orange-500 underline"
        >
          {" "}
          mixers
        </Link>
        , and{" "}
        <Link
          to={"/product/dj_controller"}
          className="text-orange-500 underline"
        >
          {" "}
          DJ controllers
        </Link>
        . We've also got amazing deals on drums, guitars, keyboards, wind
        instruments, microphones, studio gear, and more! And because we’re
        BarondeMusical, you know our deals mean trusted brands, quality
        equipment, and reliable performance.
      </p>
    </motion.div>
  );
}

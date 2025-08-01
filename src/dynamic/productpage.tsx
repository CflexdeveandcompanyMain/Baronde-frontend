import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import ProductAuthCard from "./product";
import { type HeroDataType } from "../mainpage/Hero/data";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { useGlobalState } from "../store/globalstate";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  let { brand } = useGlobalState();

  let parameter = useParams();
  let cat = parameter.category?.split("-")[0].toLowerCase();

  if (status == "success" && data) {
    let result = data.filter((item: HeroDataType) => {
      if (brand) {
        if (brand === "other")
          return item.categories.toLowerCase().includes(cat ?? "");
        return (
          item.categories.toLowerCase().includes(cat ?? "") &&
          item.brand == brand
        );
      }
    });

    const totalProducts = result?.length || 0;
    const startCount = totalProducts > 0 ? 1 : 0;
    const endCount = totalProducts;

    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full pb-3 pt-0 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-col items-start w-full sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
            <motion.div
              initial={{ scale: 0.4, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="bg-[url('./assets/Hero2.png')] bg-cover w-full flex justify-center min-h-[300px] sm:min-h-[400px] bg-center bg-emerald-950/95 bg-blend-overlay"
            >
              <div className="flex flex-col items-center gap-2 self-center">
                <p className="font-all text-3xl font-bold text-white">
                  BaronDeMusical
                </p>
                <p className="font-all sm:text-lg font-medium text-center w-full text-base text-white">
                  {formatString(parameter.category ?? "Random")}
                </p>
              </div>
            </motion.div>

            <div className="w-[90%] sm:w-3/4 mx-auto sm:mt-10">
              <ShopBy />
            </div>
            <section className="flex flex-col items-start w-full gap-1 sm:gap-3 mt-2">
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
  let seperated: string[] | string = category.split("-");
  if (seperated.length === 1)
    return category.charAt(0).toUpperCase() + category.slice(1);
  else
    return seperated
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
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
      <p className="font-all font-semibold text-2xl text-center w-full text-green-600">
        Shop From
        <span className="text-[#E5A000] font-all"> The Best</span>
      </p>
      <p className="font-all text-sm text-center w-full">
        Discover premium musical instruments and audio equipment at
        Barondemusical, offering superior sound quality, durability, and
        unmatched performance for musicians.
      </p>
    </motion.div>
  );
}

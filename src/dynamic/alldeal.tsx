import { useParams } from "react-router-dom";
import MainPageNavbar from "../mainpage/navbar/navbar";
import type { HeroDataType } from "../mainpage/Hero/data";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import ProductAuthCard from "./product";
import Footer from "../footer/footer";
import BreadCrumb from "../utils/breadcrumb";
import { ShopBy } from "./productpage";

export default function AllDeals() {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  let parameter = useParams();
  let brand = parameter.brand?.toLowerCase();
  if (status == "success" && data) {
    let result = data.filter((item: HeroDataType) => {
      if (brand) {
        if (brand === "all") return data;
        return item.brand.toLowerCase().includes(brand);
      }
    });

    // Calculate product count information
    const totalProducts = result?.length || 0;
    const startCount = totalProducts > 0 ? 1 : 0;
    const endCount = totalProducts;
    const path = ["Home", ...window.location.pathname.split("/")];

    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full py-3 bg-white sm:bg-gray-200 flex flex-col z-10 items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-row items-center w-full p-3">
            {<BreadCrumb path={path} url="brand" />}
          </div>
          <div className="w-[98%] sm:w-3/4 mx-auto sm:mt-10 px-1">
            <ShopBy />
          </div>
          <section className="flex flex-col items-start w-full gap-1 sm:gap-3 mt-2">
            <div className="flex flex-col items-start gap-2 w-full px-3">
              <p className="font-all sm:text-xl font-semibold text-start w-full text-lg">
                {formatString(parameter.brand ?? "Random")}
              </p>
              <p className="font-all text-xs text-start w-full">
                {totalProducts > 0
                  ? `showing ${startCount} - ${endCount} of ${totalProducts} products`
                  : "No products found"}
              </p>
            </div>
            <div className="w-full p-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
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
        </section>
        <Footer />
      </>
    );
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
}

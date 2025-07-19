import { useQuery } from "@tanstack/react-query";
import ProductAuthCard from "../../dynamic/product";
import { getProducts } from "../../utils/getFetch";
import { HeroData, type HeroDataType } from "./data";
import Skeleton from "../../utils/skeleton";
import { useGlobalState } from "../../store/globalstate";

export default function HeroProductCard({ category }: { category: string }) {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,
  });

  let { brand } = useGlobalState();

  if (status == "pending")
    return [1, 2, 3, 4].map((item, index) => {
      return (
        <div key={index + item} className="w-full">
          <Skeleton />
        </div>
      );
    });

  if (status == "success" && data) {
    let products = HeroData.filter((item: HeroDataType) => {
      if (brand)
        if (brand === "other")
          return item.categories.toLowerCase() === category.toLowerCase();
      return (
        item.categories.toLowerCase() === category.toLowerCase() &&
        item.brand == brand
      );
    });
    return (
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {products.map((item: HeroDataType, index: number) => {
          return (
            <div key={index} className="min-w-auto flex-shrink-0 self-stretch">
              <ProductAuthCard data={item} />
            </div>
          );
        })}
      </div>
    );
  }
}

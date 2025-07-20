import { useQuery } from "@tanstack/react-query";
import ProductAuthCard from "../../dynamic/product";
import { getProducts } from "../../utils/getFetch";
import { type HeroDataType } from "./data";
import { useGlobalState } from "../../store/globalstate";

function ProductCardSkeleton() {
  return (
    <div className="w-full p-1.5 border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: "shimmer 2s infinite linear",
            transform: "translateX(-100%)",
          }}
        ></div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: "shimmer 2s infinite linear",
              transform: "translateX(-100%)",
            }}
          ></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: "shimmer 2s infinite linear",
              transform: "translateX(-100%)",
            }}
          ></div>
        </div>
      </div>

      <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse relative overflow-hidden mb-3">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: "shimmer 2s infinite linear",
            transform: "translateX(-100%)",
          }}
        ></div>
      </div>

      <div className="h-10 bg-gray-200 rounded animate-pulse relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: "shimmer 2s infinite linear",
            transform: "translateX(-100%)",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default function HeroProductCard({ category }: { category: string }) {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  let { brand } = useGlobalState();

  if (status === "pending") {
    return (
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2 gap-1 ">
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index + item} className="w-full">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (status === "success" && data) {
    let products = data.filter((item: HeroDataType) => {
      if (brand) {
        if (brand === "other") {
          return item.categories.toLowerCase() === category.toLowerCase();
        }
      }
      return (
        item.categories.toLowerCase() === category.toLowerCase() &&
        item.brand === brand
      );
    });

    return (
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-2 gap-1">
        {products.map((item: HeroDataType, index: number) => (
          <div key={index} className="min-w-auto flex-shrink-0 self-stretch">
            <ProductAuthCard data={item} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

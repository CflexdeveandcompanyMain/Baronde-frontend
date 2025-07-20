import { useParams } from "react-router-dom";
import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { type HeroDataType } from "../mainpage/Hero/data";
import ProductAuthCard from "./product";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { useMemo } from "react";

function ProductCardSkeleton() {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
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

export default function SearchPage() {
  const { data, status, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const param = useParams();
  const keyword = param.keyword?.toLowerCase() || "";

  const filteredItems = useMemo(() => {
    if (status !== "success" || !data || !keyword) {
      return [];
    }

    return data.filter((item: HeroDataType) => {
      // Direct name match
      if (item.name.toLowerCase().includes(keyword)) {
        return true;
      }

      if (item.keyword && Array.isArray(item.keyword)) {
        return item.keyword.some((key: string) =>
          key.toLowerCase().includes(keyword)
        );
      }

      if (item.brand && item.brand.toLowerCase().includes(keyword)) {
        return true;
      }

      if (
        item.description &&
        item.description.toLowerCase().includes(keyword)
      ) {
        return true;
      }

      if (item.categories && item.categories.toLowerCase().includes(keyword)) {
        return true;
      }

      return false;
    });
  }, [data, keyword, status]);

  if (isLoading || status === "pending") {
    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full py-3 bg-gray-200 flex flex-col z-10 items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-col items-start w-full sm:gap-10 sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
            <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
              <p className="font-all font-semibold text-2xl text-center w-full text-green-600">
                Shop From
                <span className="text-[#E5A000] font-all"> The Best</span>
              </p>
              <p className="font-all text-sm text-center w-full">
                Discover premium musical instruments and audio equipment at
                Barondemusical, offering superior sound quality, durability, and
                unmatched performance for musicians.
              </p>
            </div>
            <div className="flex flex-col items-start w-full sm:px-5 px-2">
              <p className="font-all text-sm text-start w-full">
                Searching for "{param.keyword}"...
              </p>
            </div>
            <div className="w-full p-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="min-w-auto flex-shrink-0 self-stretch"
                >
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainPageNavbar />
        <section className="w-full h-full py-3 bg-gray-200 flex flex-col z-10 items-center sm:gap-5 justify-start gap-4">
          <div className="flex flex-col items-start w-full sm:gap-10 sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
            <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
              <p className="font-all font-semibold text-2xl text-center w-full text-red-600">
                Something went wrong
              </p>
              <p className="font-all text-sm text-center w-full text-gray-600">
                Unable to load products. Please try again later.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col z-10 items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-full sm:gap-10 sm:h-auto sm:w-[94%] mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-center w-[90%] sm:w-3/4 mx-auto self-center">
            <p className="font-all font-semibold text-2xl text-center w-full text-green-600">
              Shop From
              <span className="text-[#E5A000] font-all"> The Best</span>
            </p>
            <p className="font-all text-sm text-center w-full">
              Discover premium musical instruments and audio equipment at
              Barondemusical, offering superior sound quality, durability, and
              unmatched performance for musicians.
            </p>
          </div>
          <div className="flex flex-col items-start w-full sm:px-5 px-2">
            <p className="font-all text-sm text-start w-full">
              {filteredItems.length > 0
                ? `Found ${filteredItems.length} result${
                    filteredItems.length === 1 ? "" : "s"
                  } for "${param.keyword}"`
                : `No results found for "${param.keyword}"`}
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="w-full p-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {filteredItems.map((item: HeroDataType, index: number) => (
                <div
                  key={item._id || index}
                  className="min-w-auto flex-shrink-0 self-stretch"
                >
                  <ProductAuthCard data={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full p-3 flex flex-col items-center justify-center min-h-[300px]">
              <div className="text-center">
                <p className="font-all text-lg font-medium text-gray-600 mb-2">
                  No products found
                </p>
                <p className="font-all text-sm text-gray-500">
                  Try searching with different keywords or check your spelling
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

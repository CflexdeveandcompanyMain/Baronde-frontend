import ProductAuthCard from "../../dynamic/product";
import { HeroData, type HeroDataType } from "./data";

export default function HeroProductCard({ category }: { category: string }) {
  let products = HeroData.filter((item) => item.category === category);
  if (products.length === 0) return <></>;
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

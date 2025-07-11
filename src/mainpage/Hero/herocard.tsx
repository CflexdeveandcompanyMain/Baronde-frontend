import ProductCard from "../../product/productcard";
import { HeroData } from "./data";

export default function HeroProductCard({ category }: { category: string }) {
  let products = HeroData.filter((item) => item.category === category);
  if (products.length === 0) return <></>;
  return (
    <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
      {products.map((item: any, index: number) => {
        return (
          <div key={index} className="min-w-[200px] h-full">
            <ProductCard
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
            />
          </div>
        );
      })}
    </div>
  );
}

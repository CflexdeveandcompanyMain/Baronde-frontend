import ProductCard from "../../product/productcard";
import { HeroData, type HeroDataType } from "./data";

export default function HeroProductCard({ category }: { category: string }) {
  let products = HeroData.filter((item) => item.category === category);
  if (products.length === 0) return <></>;
  return (
    <div className="overflow-x-scroll w-full flex flex-row items-stretch gap-1">
      {products.map((item: HeroDataType, index: number) => {
        return (
          <div key={index} className="min-w-auto flex-shrink-0">
            <ProductCard
              stockQuantity={item.stockQuantity}
              id={item.id}
              discount={item.discount}
              category={item.category}
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

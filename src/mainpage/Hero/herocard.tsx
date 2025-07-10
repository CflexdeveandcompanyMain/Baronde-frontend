import ProductCard from "../../product/productcard";
import { HeroData } from "./data";

export default function HeroProductCard({ category }: { category: string }) {
  if (!HeroData[category]) return <></>;
  return (
    <div className="overflow-x-scroll w-full grid grid-cols-5 items-center gap-3">
      {HeroData[category].map((item: any, index: number) => {
        return (
          <div key={index}>
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

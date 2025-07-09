import { frs1, frs2, frs3, frs4, frs5 } from "../..";
import ProductCard from "../../product/productcard";

let FRS: any[] = [
  {
    image: frs1,
    name: "SP-137",
    description: "15 Inch / 4000watt / Pure Acostic / 75.5 coil /Double magnet",
    price: "N1,300,000",
  },
  {
    image: frs2,
    name: "SP-215GF",
    description: "15 Inch / 4000watt / Ply wood / 100 coil /Big Magnet",
    price: "N1,500,000",
  },
  {
    image: frs3,
    name: "SP-515",
    description:
      "18 Inch / 6000watt / Pure Acostic / 100 coil /passive speaker",
    price: "N2,500,000",
  },
  {
    image: frs4,
    name: "SP-215GF",
    description: "15 Inch / 4000watt / Ply wood / 100 coil /Big Magnet",
    price: "N1,500,000",
  },
  {
    image: frs5,
    name: "SP-215GF",
    description:
      "18 Inch / 6000watt / Pure Acostic / 100 coil /passive speaker",
    price: "N1,500,000",
  },
];

export default function FullRangeSpeaker() {
  return (
    <div className="overflow-x-scroll w-full flex flex-row items-center gap-3">
      {FRS.map((item: any, index: number) => {
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

import { useParams } from "react-router-dom";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
// import { getFetch } from "../utils/getFetch";
import { useEffect, useState } from "react";
import ProductAuthCard from "./product";

const drum = [
  {
    id: 1,
    category: "drum",
    image: [
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
    ],
    name: "Purple drum",
    description: "15 Inch / 4000watt / Pure Acostic / 75.5 coil /Double magnet",
    price: 300000,
    quantity: 3,
  },
  {
    id: 2,
    category: "drum",
    image: [
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
      "https://res.cloudinary.com/dmaag3pvx/image/upload/v1752301053/d3_rvdkfa.png",
    ],
    name: "Gold drum",
    description: "15 Inch / 4000watt / Pure Acostic / 75.5 coil /Double magnet",
    price: 300000,
    quantity: 3,
  },
];

export default function ProductPage() {
  let parameter = useParams();
  let [data, setData] = useState(drum);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await Promise.resolve(drum);
        console.log(result);
        if (result) setData(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] sm:gap-10 sm:h-auto sm:w-3/4 mx-auto mt-4 sm:mt-6">
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
          <section className="flex flex-col items-start w-full gap-3">
            <div className="flex flex-col items-start gap-2">
              <p className="font-all sm:text-xl font-semibold text-start w-full text-lg">
                {formatString(parameter.category ?? "Random")}
              </p>
              <p className="font-all text-xs text-start w-full">
                showing 1 - 24 of 35 products
              </p>
            </div>
            <div className="w-full p-3 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
              {data.map((item: any, index: number) => {
                return (
                  <div key={index} className="w-full">
                    <p>{item.name}</p>
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

function formatString(category: string) {
  let seperated: string[] | string = category.split("-");
  if (seperated.length === 1)
    return category.charAt(0).toUpperCase() + category.slice(1);
  else
    return seperated
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
}

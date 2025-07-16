import { useParams } from "react-router-dom";
import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { HeroData } from "../mainpage/Hero/data";
import ProductAuthCard from "./product";

export default function SearchPage() {
  let param = useParams();
  let word = param.keyword?.toLowerCase();
  let data = HeroData.filter((item) => {
    if (item.name.toLowerCase() === word) return true;
    for (let key of item.keyword) {
      if (word && key.includes(word)) return true;
    }
    return false;
  });
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
              {param.keyword}
            </p>
          </div>
          <div className="w-full p-3 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {data.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="min-w-auto flex-shrink-0 self-stretch"
                >
                  <ProductAuthCard data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

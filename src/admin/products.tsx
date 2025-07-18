import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { products } from "../raw-datas/rd1";
import { HeroData } from "../mainpage/Hero/data";
import AdminCard from "./card";
import EditForm from "./editform";
// import { useImage } from "./img";

let D = {
  brand: ["SoundPrince", "Rave"],
  product: products,
};

export default function AdminProducts() {
  let [brand, setBrand] = useState("soundprince");
  let [cat, setCat] = useState(products[0]);
  let [ebrand, setEBrand] = useState("soundprince");
  let [ecategory, setECategory] = useState(products[0]);
  let [eamount, setEAmount] = useState(0);
  let [ekeyword, setEKeyword] = useState(["product"]);
  let [ename, setEName] = useState("");
  let [ediscount, setEDiscount] = useState(0);
  let [edescription, setEDescription] = useState("");
  let [eImage, setEImage] = useState<File[]>([]);
  let [onIt, setIt] = useState(true);
  let [open, setopen] = useState(false);

  const getImage = useMemo(
    () => JSON.parse(localStorage.getItem("baron:img") || "[]"),
    []
  );

  console.log(getImage);

  if (
    // eImage.length > 0 &&
    eamount > 0 &&
    ebrand &&
    ecategory &&
    edescription &&
    ediscount > 0 &&
    ekeyword &&
    ename
  ) {
    setIt(!onIt);
  }

  const openorclose = () => setopen(!open);

  const result = HeroData.filter((item) => {
    return (
      brand.toLowerCase() === item.brand &&
      cat.toLowerCase().replaceAll(" ", "") === item.category
    );
  });

  const showIt = () => {
    console.log(
      eImage,
      eamount,
      ebrand,
      ecategory,
      edescription,
      ediscount,
      ekeyword,
      ename
    );
  };

  const getbrand = (val: string) => setBrand(val);
  const getcategory = (val: string) => setCat(val);
  const EBrand = (val: string) => setEBrand(val);
  const ECategory = (val: string) => setECategory(val);
  const EAmount = (val: number) => setEAmount(val);
  const EKeyword = (val: string) => setEKeyword(val.split(","));
  const EName = (val: string) => setEName(val);
  const EDiscount = (val: number) => setEDiscount(val);
  const EDescription = (val: string) => setEDescription(val);
  //   const EImage = (val: File[]) => useCallback(() => setEImage(val), [val]);

  return (
    <section className="flex flex-col items-start w-full gap-5">
      <div className="flex justify-start w-full">
        <p className="font-all text-lg sm:text-2xl font-medium text-start w-full">
          Your Product
        </p>
        <div className="w-full flex justify-end">
          <button
            onClick={openorclose}
            className="bg-green-700 p-2 rounded w-1/2 text-center flex flex-row items-center"
          >
            <Plus size={14} className="text-white" />
            <p className="font-all text-sm font-medium text-white">
              Add products
            </p>
          </button>
        </div>
      </div>
      <div className="fixed flex justify-center w-full h-screen bg-black/50 z-50 inset-0 py-5">
        <EditForm
          close={openorclose}
          show={showIt}
          onIT={onIt}
          which={D}
          keyFn={EKeyword}
          descFn={EDescription}
          nameFn={EName}
          brandFn={EBrand}
          amountFn={EAmount}
          categoryFn={ECategory}
          discountFn={EDiscount}
        />
      </div>
      <div className="flex sm:flex-row flex-col items-start w-full sm:gap-5 gap-2">
        <div className="flex flex-row items-center w-full sm:w-1/4 gap-1 self-stretch">
          <SimpleSelect options={D["brand"]} setSelectedValue={getbrand} />
          <SimpleSelect options={D["product"]} setSelectedValue={getcategory} />
        </div>
        <div className="flex flex-row items-center w-full sm:w-3/4 border border-stone-300 self-stretch rounded">
          <div className="p-2 flex justify-center">
            <Search size={18} className="text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 font-medium text-sm font-all w-full"
          />
        </div>
      </div>
      <div className="w-full p-3 grid md:grid-cols-3 grid-cols-2">
        {result.map((item: any, index: number) => {
          return (
            <div key={index} className="min-w-auto grow self-stretch h-full">
              <AdminCard data={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SimpleSelect({
  options,
  setSelectedValue,
}: {
  options: string[];
  setSelectedValue: (val: string) => void;
}) {
  return (
    <div className="w-full flex-col items-start flex gap-1 h-full">
      <select
        onChange={(e) => setSelectedValue(e.target.value)}
        className="w-full p-1 border border-gray-300 rounded font-all text-[13px] outline-none h-full"
      >
        {options.map((option: string, index: number) => (
          <option
            key={index}
            value={option}
            className="text-xs font-medium font-all"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

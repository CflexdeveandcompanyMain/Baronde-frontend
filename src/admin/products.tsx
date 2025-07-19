import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { products } from "../raw-datas/rd1";
import { HeroData, type HeroDataType } from "../mainpage/Hero/data";
import AdminCard from "./card";
import EditForm from "./editform";
import { submitProduct } from "./form";

interface ImageData {
  id: number;
  file: File;
  url: string;
  name: string;
}

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
  let [eImages, setEImages] = useState<ImageData[]>([]);
  let [onIt, setIt] = useState(true);
  let [open, setopen] = useState(false);
  let [search, setSearch] = useState("");
  let [items, setItems] = useState<HeroDataType[]>([]);
  let [trig, setTrig] = useState(false);

  const handleImagesChange = useCallback((images: ImageData[]) => {
    setEImages(images);
  }, []);

  useEffect(() => {
    const isValid =
      eImages.length > 0 &&
      eamount > 0 &&
      ebrand &&
      ecategory &&
      edescription &&
      ediscount >= 0 &&
      ekeyword.length > 0 &&
      ename;

    setIt(!isValid);
  }, [
    eImages,
    eamount,
    ebrand,
    ecategory,
    edescription,
    ediscount,
    ekeyword,
    ename,
  ]);

  const openorclose = () => setopen(!open);

  useEffect(() => {
    let newResult: HeroDataType[];

    if (search) {
      newResult = HeroData.filter((item) => {
        return item.name.toLowerCase() === search.toLowerCase();
      });
    } else {
      newResult = HeroData.filter((item) => {
        return (
          brand.toLowerCase() === item.brand &&
          cat.toLowerCase().replaceAll(" ", "") === item.categories
        );
      });
    }

    setItems(newResult);

    return () => setTrig(!trig);
  }, [search, brand, cat]);

  const handleClose = () => {
    setopen(false);
  };

  const showIt = () => {
    console.log({
      images: eImages,
      price: eamount,
      brand: ebrand,
      categories: ecategory,
      description: edescription,
      discount: ediscount,
      keyword: ekeyword,
      name: ename,
    });
    const f = eImages.map((item) => item.url);
    submitProduct({
      eImages: f,
      eamount,
      ebrand,
      ecategory,
      edescription,
      ediscount,
      ekeyword,
      ename,
    });
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

  return (
    <section className="flex flex-col items-start w-full gap-5">
      <div className="flex justify-start w-full">
        <p className="font-all text-lg sm:text-2xl font-medium text-start w-full">
          Your Product
        </p>
        <div className="w-full flex justify-end">
          <button
            onClick={openorclose}
            className="bg-green-700 p-2 rounded w-auto sm:w-1/2 text-center justify-center flex flex-row items-center"
          >
            <Plus size={14} className="text-white" />
            <p className="font-all text-xs sm:text-sm font-medium text-white">
              Add products
            </p>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed flex justify-center w-full h-screen bg-black/50 z-50 inset-0 sm:py-5">
          <EditForm
            close={handleClose}
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
            onImagesChange={handleImagesChange}
            currentImages={eImages}
          />
        </div>
      )}

      <div className="flex sm:flex-row flex-col items-start w-full sm:gap-5 gap-2">
        <div className="flex flex-row items-center w-full sm:w-1/4 gap-1 self-stretch">
          <SimpleSelect options={D["brand"]} setSelectedValue={getbrand} />
          <SimpleSelect options={D["product"]} setSelectedValue={getcategory} />
        </div>
        <div className="flex flex-row items-center w-full sm:w-3/4 border border-stone-300 self-stretch rounded">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="p-2 font-medium text-sm font-all w-full outline-none"
          />
          <div className="p-2 flex justify-center bg-stone-100 self-stretch">
            <Search size={18} className="text-stone-400" />
          </div>
        </div>
      </div>

      <div className="w-full sm:p-3 grid md:grid-cols-3 grid-cols-2">
        {items.map((item: any, index: number) => {
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
    <div className="w-full flex-col items-start flex gap-1 h-full p-1">
      <select
        onChange={(e) => setSelectedValue(e.target.value)}
        className="w-full p-1 border border-gray-300 rounded font-all text-[11px] sm:text-[13px] outline-none h-full"
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

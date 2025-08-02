import { Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { products, brand as BB } from "../raw-datas/rd1";
import { type HeroDataType } from "../mainpage/Hero/data";
import AdminCard from "./card";
import EditForm from "./editform";
import { submitProduct } from "./form";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { useGlobalState } from "../store/globalstate";

interface ImageData {
  id: number;
  file: File;
  url: string;
  name: string;
}

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

  const handleImagesChange = useCallback((images: ImageData[]) => {
    setEImages(images);
  }, []);

  const { del } = useGlobalState();

  console.log("Global del state:", del);

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

  const handleClose = () => {
    setopen(false);
  };

  const {
    data: rawData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const filteredItems = useMemo(() => {
    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }

    let filtered: HeroDataType[];

    if (search.trim()) {
      filtered = rawData.filter((item: HeroDataType) => {
        const searchTerm = search.toLowerCase().trim();
        const itemName = item.name?.toLowerCase() || "";
        const itemBrand = item.brand?.toLowerCase() || "";
        const itemCategory = item.categories?.toLowerCase() || "";

        return (
          itemName.includes(searchTerm) ||
          itemBrand.includes(searchTerm) ||
          itemCategory.includes(searchTerm)
        );
      });
    } else {
      filtered = rawData.filter((item: HeroDataType) => {
        const itemBrand = item.brand?.toLowerCase() || "";
        const itemCategory =
          item.categories?.toLowerCase().replaceAll(" ", "") || "";
        const filterBrand = brand.toLowerCase();
        const filterCategory = cat.toLowerCase().replaceAll(" ", "");
        const brandMatch = itemBrand === filterBrand;
        const categoryMatch = itemCategory === filterCategory;

        return brandMatch && categoryMatch;
      });
    }

    return filtered;
  }, [rawData, search, brand, cat]);

  useEffect(() => {
    if (del) refetch();
  }, [del, refetch]);

  const showIt = () => {
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
    })
      .then(() => {
        refetch();
        setEImages([]);
        setEAmount(0);
        setEName("");
        setEDescription("");
        setEDiscount(0);
        setEKeyword(["product"]);
        setopen(false);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
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

  if (isLoading) {
    return (
      <section className="flex flex-col items-start w-full gap-5">
        <div className="flex justify-start w-full">
          <p className="font-all text-lg sm:text-2xl font-medium text-start w-full">
            Loading Products...
          </p>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flex flex-col items-start w-full gap-5">
        <div className="flex justify-start w-full">
          <p className="font-all text-lg sm:text-2xl font-medium text-start w-full text-red-600">
            Error loading products
          </p>
          <button
            onClick={() => refetch()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start w-full gap-5">
      <div className="flex justify-start w-full">
        <p className="font-all text-lg sm:text-2xl font-medium text-start w-full">
          Your Product ({filteredItems.length})
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
          <SimpleSelect
            options={BB}
            setSelectedValue={getbrand}
            currentValue={brand}
          />
          <SimpleSelect
            options={products}
            setSelectedValue={getcategory}
            currentValue={cat}
          />
        </div>
        <div className="flex flex-row items-center w-full sm:w-3/4 border border-stone-300 self-stretch rounded">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by name, brand, or category..."
            className="p-2 font-medium text-sm font-all w-full outline-none"
          />
          <div className="p-2 flex justify-center bg-stone-100 self-stretch">
            <Search size={18} className="text-stone-400" />
          </div>
        </div>
      </div>

      <div className="w-full sm:p-3 grid md:grid-cols-2 grid-cols-1 gap-1 sm:gap-2">
        {filteredItems.length === 0 ? (
          <div className="col-span-full flex justify-center py-8">
            <p className="text-gray-500 font-all">
              {search
                ? `No products found for "${search}"`
                : "No products match the selected filters"}
            </p>
          </div>
        ) : (
          filteredItems.map((item: HeroDataType, index: number) => {
            console.log("Rendering item:", item.name, "ID:", item._id);
            return (
              <div
                key={item._id || index}
                className="min-w-auto grow self-stretch h-full"
              >
                <AdminCard data={item} />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export function SimpleSelect({
  options,
  setSelectedValue,
  currentValue,
}: {
  options: string[];
  setSelectedValue: (val: string) => void;
  currentValue?: string;
}) {
  return (
    <div className="w-full flex-col items-start flex gap-1 h-full p-1">
      <select
        value={currentValue}
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

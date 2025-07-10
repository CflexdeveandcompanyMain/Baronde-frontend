interface productCardType {
  name: string;
  image: string;
  description: string;
  price: string;
  discount?: string;
  cutoff?: string;
}
export default function ProductCard(data: productCardType) {
  return (
    <div className="flex flex-col items-center shadow self-stretch min-h-full justify-between min-w-[200px]">
      <div className="relative flex flex-col items-center">
        <img
          src={data.image}
          className="object-cover max-h-[200px] w-full bg-white"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
        <p className={`text-start font-medium font-all text-sm w-full`}>
          {data.name}
        </p>
        <p className="font-normal text-start font-all text-xs text-gray-600 w-full">
          {data.description}
        </p>
        <div className="flex items-center w-full justify-start">
          <p className="text-[#F0B100] text-sm text-start font-medium font-all">
            {data.price}
          </p>
        </div>
        <button
          type="button"
          className={`bg-green-700 shadow text-sm p-2 w-full font-all font-normal text-white`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

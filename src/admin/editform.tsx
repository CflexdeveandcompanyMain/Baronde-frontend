import { X } from "lucide-react";
import { SimpleSelect } from "./products";
import ImageUpload from "./image";

type Fnstring = (val: string) => void;
type Fnnumber = (val: number) => void;

export default function EditForm({
  which,
  brandFn,
  categoryFn,
  amountFn,
  discountFn,
  nameFn,
  keyFn,
  descFn,
  onIT,
  show,
  close,
}: {
  which: any;
  brandFn: Fnstring;
  categoryFn: Fnstring;
  amountFn: Fnnumber;
  discountFn: Fnnumber;
  nameFn: Fnstring;
  keyFn: Fnstring;
  descFn: Fnstring;
  onIT: boolean;
  show: () => void;
  close: () => void;
}) {
  return (
    <section className="flex flex-col items-center sm:w-3/4 w-full bg-white p-2 sm:p-5 overflow-y-scroll">
      <div onClick={close} className="flex justify-end w-full">
        <X className="text-end" size={14} />
      </div>
      <div className="flex flex-col items-start w-full gap-3">
        <p className="w-full text-start font-bold text-stone-600 font-all">
          Add New Product
        </p>
        <div className="flex sm:flex-row justify-between w-full flex-col gap-3 items-center">
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="brand"
              className="font-all text-sm text-start w-full"
            >
              Brand
            </label>
            <SimpleSelect options={which["brand"]} setSelectedValue={brandFn} />
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="brand"
              className="font-all text-sm text-start w-full"
            >
              Category
            </label>
            <SimpleSelect
              options={which["product"]}
              setSelectedValue={categoryFn}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start md:w-1/3 sm:w-1/2 w-full">
          <label htmlFor="brand" className="font-all text-sm text-start w-full">
            Amount
          </label>
          <Input input={"number"} placeholder="e.g 1500000" Fn={amountFn} />
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="brand"
              className="font-all text-sm text-start w-full"
            >
              Keyword
            </label>
            <p className="font-all text-xs text-start w-full">
              Add many descriptive (10+) keywords to make it easier for user to
              locate your products (include product name)
            </p>
          </div>
          <Input
            input={"text"}
            placeholder="plywood, magnet,speaker etc..."
            Fn={keyFn}
          />
        </div>
        <p className="w-full text-start font-bold text-stone-600 font-all mt-2">
          Product Details
        </p>
        <div className="flex sm:flex-row justify-between w-full flex-col gap-3 items-center">
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="brand"
              className="font-all text-xs text-start w-full"
            >
              Name
            </label>
            <Input input={"text"} placeholder="e.g SP-137" Fn={nameFn} />
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <label
              htmlFor="brand"
              className="font-all text-xs text-start w-full"
            >
              Discount (only for products on discount)
            </label>
            <Input
              input={"number"}
              placeholder="enter 0 for product without discount"
              Fn={discountFn}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-1">
          <label htmlFor="brand" className="font-all text-sm text-start w-full">
            Product Description (Optional)
          </label>
          <TextArea
            placeholder="Enter a well detailed description about the product, you can use chatgpt"
            Fn={descFn}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-1">
          <label htmlFor="brand" className="font-all text-xs text-start w-full">
            Product Image (JPG, PNG, Max size: 5MB)
          </label>
          <ImageUpload />
        </div>
        <div className="flex flex-row items-center w-full justify-between gap-3">
          <button className="w-full p-2 rounded border border-green-600 text-center text-green-600">
            Cancel
          </button>
          <button
            disabled={onIT}
            onClick={show}
            className={`w-full p-2 rounded text-center bg-green-700 disabled:bg-stone-400 text-white disabled:text-stone-100`}
          >
            Add product
          </button>
        </div>
      </div>
    </section>
  );
}

function Input({
  input,
  placeholder,
  Fn,
}: {
  input: string;
  placeholder: string;
  Fn: any;
}) {
  return (
    <input
      type={input}
      onChange={(e) => Fn(e.target.value)}
      placeholder={placeholder}
      className="p-2 rounded border border-stone-300 w-full text-xs"
    />
  );
}

function TextArea({
  placeholder,
  Fn,
}: {
  placeholder: string;
  Fn: (val: string) => void;
}) {
  return (
    <textarea
      placeholder={placeholder}
      onChange={(e) => Fn(e.target.value)}
      className="p-2 rounded border border-stone-300 w-full text-xs"
      cols={20}
    />
  );
}

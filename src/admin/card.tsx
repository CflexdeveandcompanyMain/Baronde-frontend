import type { HeroDataType } from "../mainpage/Hero/data";
import { formatPrice } from "../utils/priceconverter";
import { useState } from "react";

interface EditableData {
  name: string;
  description: string;
  price: number;
  brand: string;
  discount: number;
}

export default function AdminCard({ data }: { data: HeroDataType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditableData>({
    name: data.name,
    description: data.description,
    price: data.price,
    brand: data.brand,
    discount: 34000,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saved data:", editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      name: data.name,
      description: data.description,
      price: data.price,
      brand: data.brand,
      discount: 34000,
    });
    setIsEditing(false);
  };

  const handleInputChange = (
    field: keyof EditableData,
    value: string | number
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center sm:shadow justify-between w-auto min-h-full border border-green-100 sm:min-w-[200px] p-2 bg-white">
      <div className="flex flex-col items-center h-[50%] relative">
        <div className="absolute top-2 inset-x-0 flex justify-center w-full h-full">
          <p className="font-all font-bold text-lg text-[#E7FFC078] self-center text-center rotate-45">
            barondemusical
          </p>
        </div>
        <img
          src={data.image[0]}
          className="object-cover h-full w-full bg-white"
        />
        <div className="flex justify-center bg-[#fdb204f3] p-1 shadow absolute top-1.5 left-1.5">
          {isEditing ? (
            <input
              type="number"
              value={editedData.discount}
              onChange={(e) =>
                handleInputChange("discount", parseInt(e.target.value) || 0)
              }
              className="text-white font-all text-center text-xs font-semibold bg-transparent border border-white/50 rounded px-1 focus:outline-none focus:border-white w-16"
              placeholder="Discount"
            />
          ) : (
            <p className="text-white font-all text-center text-xs font-semibold">
              {formatPrice(editedData.discount, "NGN")}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-1.5 bg-slate-100/20 p-1.5">
        {isEditing ? (
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full text-start font-medium font-all text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-green-500"
          />
        ) : (
          <p className="text-start font-medium font-all text-sm w-full">
            {editedData.name}
          </p>
        )}

        {isEditing ? (
          <textarea
            value={editedData.description.replaceAll("||", "/")}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full font-normal text-justify font-all text-[13px] text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-green-500 min-h-[60px] resize-vertical"
          />
        ) : (
          <p className="font-normal text-justify font-all text-[13px] text-gray-600 w-full">
            {editedData.description.replaceAll("/", "||")}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-between">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Price:</span>
              <input
                type="number"
                value={editedData.price}
                onChange={(e) =>
                  handleInputChange("price", parseInt(e.target.value) || 0)
                }
                className="text-[#fdb100] text-sm font-medium font-all border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-green-500 w-24"
              />
            </div>
          ) : (
            <>
              <p className="text-[#fdb100] text-sm text-start font-medium font-all">
                {formatPrice(editedData.price - editedData.discount, "NGN")}
              </p>
              <p className="text-black text-[11px] text-start font-medium font-all line-through">
                {formatPrice(editedData.price, "NGN")}
              </p>
            </>
          )}
        </div>

        <div className="w-full flex justify-start gap-1">
          <p className="font-all text-xs font-medium self-center">Brand:</p>
          {isEditing ? (
            <input
              type="text"
              value={editedData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              className="bg-green-100 border border-green-400 py-[1px] px-1 rounded-lg text-start font-medium font-all text-xs focus:outline-none focus:border-green-500"
            />
          ) : (
            <div className="bg-green-100 border flex justify-center self-center border-green-400 py-[1px] px-1 rounded-lg">
              <p className="text-start font-medium font-all self-center text-xs">
                {editedData.brand}
              </p>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-1 sm:gap-2 mt-2 w-full">
            <button
              type="button"
              onClick={handleSave}
              className="border w-full w-full-green-700/40 text-[10px] sm:text-xs p-1.5 sm:p-2.5 flex-1 font-all font-medium text-green-700 hover:bg-green-50"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="border w-full border-red-700/40 text-[10px] sm:text-xs p-1.5 sm:p-2.5 flex-1 font-all font-medium text-red-700 hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="border border-green-700/40 text-xs mt-2 p-2.5 w-full font-all font-medium text-green-700 hover:bg-green-50"
          >
            Edit Product
          </button>
        )}
      </div>
    </div>
  );
}

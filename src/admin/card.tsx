import { Trash } from "lucide-react";
import type { HeroDataType } from "../mainpage/Hero/data";
import { formatPrice } from "../utils/priceconverter";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFn, editFn } from "../utils/getFetch";
import { useGlobalState } from "../store/globalstate";

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
    discount: data.discount,
  });

  const { setDel } = useGlobalState();
  const queryClient = useQueryClient();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const editMutation = useMutation({
    mutationFn: (item: HeroDataType) => {
      console.log("Editing product with ID:", data._id);
      return editFn(data._id, item);
    },
    mutationKey: ["AdminEdit", data._id],
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(
        ["products"],
        (old: HeroDataType[] | undefined) => {
          if (!old) return old;
          return old.map((product) =>
            product._id === data._id ? { ...product, ...updatedItem } : product
          );
        }
      );

      return { previousProducts };
    },
    onSuccess: (result) => {
      console.log("Edit success:", result);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDel();
      setIsEditing(false);
    },
    onError: (error, _, context) => {
      console.error("Edit error:", error);
      // Rollback on error
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      alert("Failed to update product. Please try again.");
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => {
      console.log("Deleting product with ID:", data._id);
      if (!data._id) {
        throw new Error("No product ID provided");
      }
      return removeFn(data._id);
    },
    mutationKey: ["adminremove", data._id],
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(
        ["products"],
        (old: HeroDataType[] | undefined) => {
          if (!old) return old;
          return old.filter((product) => product._id !== data._id);
        }
      );

      return { previousProducts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDel();
    },
    onError: (error, _, context) => {
      console.error("Delete error:", error);
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
      alert("Failed to delete product. Please try again.");
    },
  });

  const handleSave = () => {
    if (!data._id) {
      alert("Error: Cannot save changes - no product ID found");
      return;
    }

    console.log({ ...data, ...editedData });

    editMutation.mutate({ ...data, ...editedData });
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

  const handleDelete = () => {
    if (!data._id) {
      alert("Error: Cannot delete - no product ID found");
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${data.name}"?`)) {
      removeMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col items-center sm:shadow justify-between relative w-auto min-h-full border border-green-100 sm:min-w-[200px] p-2 bg-white">
      <div className="flex flex-col items-center h-[50%] relative">
        <div className="absolute top-2 inset-x-0 flex justify-center w-full h-full">
          <p className="font-all font-bold text-lg text-[#E7FFC078] self-center text-center rotate-45">
            barondemusical
          </p>
        </div>
        {data.images?.[0]?.url ? (
          <img
            src={data.images[0].url}
            className="object-cover h-full w-full bg-white"
            alt={data.name}
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-xs">No Image</p>
          </div>
        )}
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
            <p className="text-white font-all text-center text-xs font-medium">
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
          <div className="flex flex-row items-center w-full">
            <p className="text-start font-medium font-all text-sm w-full">
              {editedData.name}
            </p>
            <div
              onClick={handleDelete}
              className="flex justify-center self-center cursor-pointer hover:bg-red-100 p-1 rounded transition-colors"
              title="Delete product"
            >
              {removeMutation.isPending ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash size={16} className="text-red-600" />
              )}
            </div>
          </div>
        )}

        {isEditing ? (
          <textarea
            value={editedData.description.replaceAll("||", "/")}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full font-normal text-justify font-all text-[13px] text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-green-500 min-h-[60px] resize-vertical"
          />
        ) : (
          <p className="font-normal text-start font-all text-[13px] text-gray-600 w-full">
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
            <div className="flex items-center gap-2">
              <p className="text-[#fdb100] text-sm text-start font-medium font-all">
                {formatPrice(editedData.price - editedData.discount, "NGN")}
              </p>
              <p className="text-black text-[10px] text-start font-medium font-all line-through">
                {formatPrice(editedData.price, "NGN")}
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex justify-start gap-1">
          <p className="font-all text-xs font-medium self-center">Brand:</p>
          {isEditing ? (
            <input
              type="text"
              value={editedData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              className="border border-stone-400 py-[1px] px-1 rounded text-start font-medium font-all w-full text-xs focus:outline-none focus:border-green-500"
            />
          ) : (
            <div className="bg-green-100 border flex justify-center self-center border-green-400 py-[1px] px-1 rounded w-auto">
              <p className="text-start font-medium font-all self-center text-xs text-green-600">
                {editedData.brand}
              </p>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-1 sm:gap-2 mt-2 w-full">
            <button
              type="button"
              onClick={handleSave}
              disabled={editMutation.isPending}
              className="border w-full border-green-700/40 text-[10px] sm:text-xs p-1.5 sm:p-2.5 flex-1 font-all font-medium text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={editMutation.isPending}
              className="border w-full border-red-700/40 text-[10px] sm:text-xs p-1.5 sm:p-2.5 flex-1 font-all font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
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

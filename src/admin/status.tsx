import { useQuery } from "@tanstack/react-query";
import { adminAnalytics } from "../utils/getFetch";
import { useCallback, useState } from "react";
import { dateEE } from "../utils/priceconverter";

export default function AdminUpdateStatus() {
  const [tab, setTab] = useState<any[]>([]);
  const { status, data } = useQuery({
    queryKey: ["getAnalytics"],
    queryFn: () => adminAnalytics(),
  });

  let Info: any[];
  useCallback(() => {
    if (data) {
      const { usersWithOrders } = data.data;
      Info = usersWithOrders.filter((item: any) => item.orders.length > 0);
      Info.map((item) => {
        let {
          orders,
          user: { name },
        } = item;
        orders.forEach((order: any) => {
          let { orderStatus, _id, totalAmount, updatedAt } = order;
          console.log(name, orderStatus, _id, totalAmount, dateEE(updatedAt));
          setTab((prev: any) => [
            ...prev,
            { name, orderStatus, _id, totalAmount, date: dateEE(updatedAt) },
          ]);
        });
      });
      setTab(Array.from(new Map(tab.map((item) => [item._id, item])).values()));
    }
  }, [status]);
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-lg sm:text-2xl text-start font-semibold font-all">
            Status Update
          </p>
          <p className="text-sm text-stone-400 text-start font-medium font-all">
            Update order Items status here
          </p>
        </div>
      </div>
    </>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminAnalytics, updateOrderstateFn } from "../utils/getFetch";
import { useEffect, useState } from "react";
import { formatPrice } from "../utils/priceconverter";

export default function AdminUpdateStatus() {
  const [tab, setTab] = useState<any[]>([]);
  const { status, data } = useQuery({
    queryKey: ["getAnalytics"],
    queryFn: () => adminAnalytics(),
  });

  useEffect(() => {
    if (status === "success" && data) {
      const { usersWithOrders } = data.data;
      const filteredUsers = usersWithOrders.filter(
        (item: any) => item.orders.length > 0
      );

      // Reset tab array to prevent duplicates
      const newTab: any[] = [];

      filteredUsers.forEach((item: any) => {
        const {
          orders,
          user: { name },
        } = item;

        const od: any[] = [];
        orders.forEach((order: any) => {
          const {
            orderStatus,
            _id,
            totalAmount,
            updatedAt,
            items,
            paymentDetails: { status },
            shippingAddress: { city, street },
          } = order;

          const obg = {
            orderStatus,
            id: _id,
            totalAmount,
            date: updatedAt,
            items,
            status,
            city,
            street,
          };
          od.push(obg);
        });

        const ObjInfo = {
          name: name,
          order: od,
        };

        newTab.push(ObjInfo);
      });

      setTab(newTab);
    }
  }, [status, data]); // Remove Info.length dependency and use data instead

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-lg sm:text-2xl text-start font-semibold font-all">
            Status Update
          </p>
          <p className="text-sm font-all text-stone-400 text-start font-medium">
            Update order Items status here
          </p>
        </div>
        <section className="grid grid-cols-1 w-full gap-6 mt-8">
          {tab.length > 0 ? (
            tab.map((item, index: number) => {
              const { name, order } = item;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg font-all">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 capitalize font-all">
                          {name}
                        </h2>
                        <p className="text-sm font-all text-gray-600">
                          {order.length} order{order.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    {order.map((item: any, index: number) => {
                      const {
                        city,
                        street,
                        status,
                        orderStatus,
                        totalAmount,
                        items,
                        id,
                      } = item;
                      return (
                        <OrderComponent
                          key={id}
                          city={city}
                          street={street}
                          orderStatus={orderStatus}
                          totalAmount={totalAmount}
                          index={index}
                          items={items}
                          status={status}
                          id={id}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="font-all text-xl font-semibold">No Orders yet!</p>
          )}
        </section>
      </div>
    </>
  );
}

function OrderComponent({
  index,
  totalAmount,
  street,
  city,
  items,
  orderStatus,
  status,
  id,
}: {
  id: string;
  status: string;
  index: number;
  totalAmount: number;
  street: string;
  city: string;
  items: any;
  orderStatus: string;
}) {
  const [ordstatus, setOrderStatus] = useState(orderStatus);
  const queryClient = useQueryClient();

  // Reset local state when orderStatus prop changes (after refetch)
  useEffect(() => {
    setOrderStatus(orderStatus);
  }, [orderStatus]);

  const statusMutation = useMutation({
    mutationFn: () => updateOrderstateFn(id, ordstatus),
    onSuccess: () => {
      console.log("Status updated successfully");
      // Invalidate and refetch the analytics data
      queryClient.invalidateQueries({
        queryKey: ["getAnalytics"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Failed to update status:", error);
      // Reset the local state on error
      setOrderStatus(orderStatus);
    },
  });

  const handleSaveChanges = () => {
    if (ordstatus !== orderStatus) {
      statusMutation.mutate();
    }
  };

  // Status badge styling
  const getStatusBadge = (status: string, type: "payment" | "order") => {
    const baseClasses =
      "inline-flex px-2 py-1 rounded-full text-xs font-medium";

    if (type === "payment") {
      const paymentStyles = {
        paid: "bg-green-100 text-green-800`",
        failed: "bg-red-100 text-red-800`",
      };
      return `${baseClasses} ${
        paymentStyles[status as keyof typeof paymentStyles] ||
        "bg-gray-100 text-gray-800`"
      }`;
    } else {
      const orderStyles = {
        processing: "bg-indigo-100 text-indigo-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
      };
      return `${baseClasses} ${
        orderStyles[status as keyof typeof orderStyles] ||
        "bg-gray-100 text-gray-800`"
      }`;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-2 sm:p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-1">
        <h3 className="text-lg font-semibold text-gray-900 font-all">
          Order #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`${getStatusBadge(status, "payment")} font-all`}>
            {status}
          </span>
          <span className={`${getStatusBadge(orderStatus, "order")} font-all`}>
            {orderStatus}
          </span>
        </div>
      </div>

      {/* Amount */}
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-all text-gray-600">Total Amount</span>
          <span className="text-lg font-bold text-green-600 font-all">
            {formatPrice(totalAmount, "NGN")}
          </span>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <span className="text-sm font-all text-gray-600">Delivery Address</span>
        <p className="text-sm font-all font-medium text-gray-900 mt-1 capitalize">
          {street}, {city}
        </p>
      </div>

      {/* Items Grid */}
      <div className="mb-6">
        <span className="text-sm font-all text-gray-600 block mb-3">
          Order Items
        </span>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item: any, index: number) => {
            const { product, quantity } = item;
            const { name, images } = product;
            const firstImage = images[0].url;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={firstImage}
                  className="h-12 w-12 rounded-lg object-cover shadow-sm"
                  alt={name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-all font-medium text-gray-900 truncate">
                    {name}
                  </p>
                  <p className="text-xs text-gray-600 font-all">
                    Qty: {quantity}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Update Controls */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-all font-medium text-gray-700 mb-2">
              Update Status
            </label>
            <select
              value={ordstatus}
              onChange={(e) => {
                setOrderStatus(e.target.value);
              }}
              name="orderStatus"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-all text-gray-900 shadow-sm outline-none"
            >
              <option className="font-all" value="paid">
                Paid
              </option>
              <option className="font-all" value="shipped">
                Shipped
              </option>
              <option className="font-all" value="delivered">
                Delivered
              </option>
              <option className="font-all" value="processing">
                Processing
              </option>
            </select>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleSaveChanges}
              disabled={orderStatus === ordstatus || statusMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white font-medium -mb-20 text-sm font-all rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-colors duration-200"
            >
              {statusMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 font-all border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

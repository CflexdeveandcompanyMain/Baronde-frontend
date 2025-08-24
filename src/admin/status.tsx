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
      console.log(data);
      const { usersWithOrders } = data.data;
      const filteredUsers = usersWithOrders.filter(
        (item: any) => item.orders.length > 0
      );
      const newTab: any[] = [];

      filteredUsers.forEach((item: any) => {
        const {
          orders,
          user: { name, email },
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
            shippingAddress: { city, street, zipCode },
            phoneNumber,
          } = order;

          const obg = {
            orderStatus,
            id: _id,
            totalAmount,
            date: updatedAt,
            items,
            status,
            city,
            phoneNumber,
            street,
            zipcode: zipCode,
          };
          od.push(obg);
        });

        const ObjInfo = {
          name,
          email,
          order: od,
        };

        newTab.push(ObjInfo);
      });

      setTab(newTab);
    }
  }, [status, data]);

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
              const { name, order, email } = item;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-base font-all">
                          {name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-gray-900 capitalize font-all">
                          {name}
                        </h2>
                        <p className="text-sm font-all text-gray-600">
                          {order.length} order{order.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    {order.map((item: any, index: number) => {
                      const {
                        city,
                        street,
                        status,
                        orderStatus,
                        totalAmount,
                        items,
                        id,
                        zipcode,
                        phoneNumber,
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
                          zipcode={zipcode}
                          email={email}
                          phoneNumber={phoneNumber}
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
  zipcode,
  email,
  phoneNumber,
}: {
  phoneNumber: string;
  email: string;
  zipcode: string;
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

  useEffect(() => {
    setOrderStatus(orderStatus);
  }, [orderStatus]);

  const statusMutation = useMutation({
    mutationFn: () => updateOrderstateFn(id, ordstatus),
    onSuccess: (data) => {
      console.log("Status updated successfully", data);
      queryClient.invalidateQueries({
        queryKey: ["getAnalytics"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Failed to update status:", error);
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
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-all text-gray-600">Total Amount</span>
          <span className="text-lg font-bold text-green-600 font-all">
            {formatPrice(totalAmount, "NGN")}
          </span>
        </div>
      </div>
      <div className="my-2">
        <span className="text-sm font-all text-gray-600">Delivery Address</span>
        <p className="text-sm font-all font-medium text-gray-900 mt-1 capitalize">
          {street}, {city}
        </p>
      </div>

      <div className="my-2">
        <span className="text-sm font-all text-gray-600">Zipcode</span>
        <p className="text-sm font-all font-medium text-gray-900 mt-1 capitalize">
          {zipcode}
        </p>
      </div>
      <div className="my-2">
        <span className="text-sm font-all text-gray-600">Contact Email</span>
        <p className="text-sm font-all font-medium text-gray-900 mt-1">
          {email}
        </p>
      </div>
      <div className="my-2">
        <span className="text-sm font-all text-gray-600">Phone Number</span>
        <p className="text-sm font-all font-medium text-gray-900 mt-1">
          {phoneNumber ?? ""}
        </p>
      </div>

      <div className="my-2">
        <span className="text-sm font-all text-gray-600 block mb-3">
          Order Items
        </span>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item: any, index: number) => {
            const { product, quantity } = item;
            const name = product && product.name;
            const images = product && product.images;
            const firstImage = images && images[0].url;
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

      <div className="border-t border-stone-500 pt-2">
        <div className="flex flex-row items-center gap-3">
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
              className="w-full rounded border border-gray-300 bg-white p-2 text-sm font-all text-gray-900 outline-none"
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
              <option className="font-all" value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
          <div className="flex-shrink-0 mt-4">
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

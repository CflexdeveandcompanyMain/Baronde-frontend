import { useQuery } from "@tanstack/react-query";
import { getOrderFn } from "../utils/getFetch";
import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { formatPrice } from "../utils/priceconverter";
import { Clock, Truck } from "lucide-react";
import { useState, useEffect } from "react";

export default function UserOrderHistory() {
  const { status, data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrderFn(),
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (status === "success" && data?.data) {
      setOrders(data.data);
    }
  }, [status, data]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (isLoading) {
    return (
      <>
        <MainPageNavbar />
        <section className="w-full min-h-screen bg-white sm:bg-gray-200 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="font-all text-lg">Loading your orders...</p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainPageNavbar />
        <section className="w-full min-h-screen bg-white sm:bg-gray-200 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="font-all text-lg text-red-600 mb-2">
              Error loading orders
            </p>
            <p className="font-all text-sm text-gray-500">
              Please try again later
            </p>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainPageNavbar />
      <section className="w-full min-h-screen bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-4/5 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-start w-full gap-2">
            <p className="font-all text-lg font-semibold text-start w-full">
              My Orders
            </p>
            <p className="font-all text-sm text-start w-full">
              Track your recent purchases and deliveries
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full py-20">
              <p className="font-all text-lg text-gray-500 mb-2">
                No orders found
              </p>
              <p className="font-all text-sm text-gray-400">
                Your order history will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-start w-full gap-3">
              {orders
                .sort((a: any, b: any) => a.updatedAt - b.updatedAt)
                .map((order: any, orderIndex: number) => {
                  const orderItems = order.items || [];
                  const orderDate = formatDate(order.createdAt);

                  return (
                    <div
                      key={order._id || orderIndex}
                      className="flex flex-col items-start w-full bg-white sm:p-5 p-4 rounded shadow-sm"
                    >
                      <div className="flex flex-col items-start w-full justify-start gap-2">
                        <p className="font-all text-sm text-start w-full font-semibold">
                          Order ID: {order._id}
                        </p>
                        <div className="flex flex-row items-center w-full sm:gap-7 gap-2 py-1">
                          <p className="font-all text-xs text-start text-gray-500">
                            Order date:{" "}
                            <span className="text-black/90">{orderDate}</span>
                          </p>
                          <div className="flex flex-row items-center gap-1">
                            <Truck
                              className="text-green-700 self-center"
                              size={16}
                            />
                            <p className="font-all text-xs text-center self-center">
                              Status: {order.orderStatus || "Processing"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col w-full items-center gap-3 mt-3">
                        {orderItems.map((item: any, itemIndex: number) => (
                          <OrderCard
                            key={item._id || itemIndex}
                            product={item.product}
                          />
                        ))}
                      </div>
                      {order.totalAmount && (
                        <div className="flex justify-end w-full mt-3 pt-3 border-t border-gray-200">
                          <p className="font-all text-sm font-semibold">
                            Total: {formatPrice(order.totalAmount, "NGN")}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

function OrderCard({ product }: { product: any }) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-200 border-green-400 text-green-700";
      case "shipped":
      case "on route":
        return "bg-blue-200 border-blue-400 text-blue-700";
      case "processing":
        return "bg-yellow-200 border-yellow-400 text-yellow-700";
      case "cancelled":
        return "bg-red-200 border-red-400 text-red-700";
      default:
        return "bg-green-200 border-green-400 text-green-700";
    }
  };

  const formatDate = (dateString: any) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "TBD";
    }
  };

  const productImage = product.images?.[0].url || "/placeholder-image.jpg";
  const productStatus = product.status || "On Route";
  const estimatedDelivery = formatDate(product.updatedAt);

  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-3 justify-between p-3 bg-white/80 border-t border-stone-400 pt-3">
      <div className="flex flex-row items-center gap-3 w-full self-start">
        <img
          src={productImage}
          alt={product.name || "Product"}
          className="w-20 h-20 self-start object-cover rounded-sm"
          onError={(e: any) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />
        <div className="flex sm:flex-row flex-col items-start gap-1 w-full sm:gap-5 sm:self-center">
          <div className="flex flex-col items-start gap-2">
            <p className="w-full text-sm font-semibold text-start font-all">
              {product.name || "Product Name"}
            </p>
            <p className="w-full sm:text-xs text-sm font-normal text-gray-500 text-start font-all">
              {product.description.substring(0, 100) ||
                "No description available"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-2">
        <div className="flex flex-row items-start justify-start w-full gap-4 self-center">
          <p className="self-center font-all text-start sm:text-center text-gray-400 text-sm">
            Qty:
            <span className="text-black/90">{product.quantity || 1}</span>
          </p>
          <p className="self-center font-all text-xs font-semibold text-start sm:text-center text-orange-600/80">
            {formatPrice(product.price || 0, "NGN")}
          </p>
        </div>
        <div className="flex flex-row items-start gap-2 self-center justify-start w-full">
          <Clock className="text-gray-500" size={14} />
          <p className="font-all text-xs font-semibold self-center text-gray-500 w-full text-start items-start">
            Est Delivery:
            <span className="text-black/90 pl-1">{estimatedDelivery}</span>
          </p>
        </div>
      </div>
      <div
        className={`w-1/3 px-2 p-2 rounded-lg sm:rounded-2xl border gap-1 flex flex-row sm:justify-center self-start sm:self-center ${getStatusColor(
          productStatus
        )}`}
      >
        <Truck className="self-center" size={16} />
        <p className="font-all text-xs text-center self-center">
          {productStatus}
        </p>
      </div>
    </div>
  );
}

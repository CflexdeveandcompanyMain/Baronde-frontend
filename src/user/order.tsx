import { useQuery } from "@tanstack/react-query";
import { getFetch } from "../utils/getFetch";
import MainPageNavbar from "../mainpage/navbar/navbar";
import Footer from "../footer/footer";
import { formatPrice } from "../utils/priceconverter";
import { Clock, Truck } from "lucide-react";

export default function UserOrderHistory() {
  let { status, data } = useQuery({
    queryKey: ["order"],
    queryFn: () => getFetch("http://localhost:3000/drum"),
  });

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-screen bg-white sm:bg-gray-200 flex flex-col items-center sm:gap-5 justify-start gap-4">
        <div className="flex flex-col items-start w-[95%] gap-2 sm:h-auto sm:w-3/4 mx-auto mt-4 sm:mt-6">
          <div className="flex flex-col items-start w-full gap-2">
            <p className="font-all text-lg font-semibold text-start w-full">
              My Orders
            </p>
            <p className="font-all text-sm text-start w-full">
              Track your recent purchases and deliveries
            </p>
          </div>
          <div className="flex flex-col items-start w-full bg-white sm:p-5 rounded">
            <div className="flex flex-col items-start w-full justify-start gap-2">
              <p className="font-all text-sm text-start w-full font-semibold">
                Order ID: 3354654654526
              </p>
              <div className="flex flex-row items-center w-full sm:gap-7 gap-2 py-1">
                <p className="font-all text-xs text-start text-gray-500">
                  Order date:
                  <span className="text-black/90">
                    {new Date().getUTCDay()}
                  </span>
                </p>
                <div className="flex flex-row items-center gap-1">
                  <Truck className="text-green-700 self-center" size={16} />
                  <p className="font-all text-xs text-center self-center">
                    Estimated Delivery: May 16, 2022
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full items-center gap-3">
              {status == "success" &&
                data.map((item: any, index: number) => {
                  return (
                    <div key={index} className="w-full">
                      <OrderCard product={item} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function OrderCard({ product }: { product: any }) {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full justify-between p-3 bg-white/80 border-t border-stone-400 pt-3">
      <div className="flex flex-row items-center gap-3 w-full self-start">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-20 h-20 self-start object-cover rounded-sm"
        />
        <div className="flex sm:flex-row flex-col items-start gap-1 w-full sm:gap-5 sm:self-center">
          <div className="flex flex-col items-start gap-2">
            <p className="w-full text-base font-semibold text-start font-all">
              {product.name}
            </p>
            <p className="w-full sm:text-xs text-sm font-normal text-gray-500 text-start font-all">
              {product.description}
            </p>
          </div>
          <div className="flex flex-row items-start justify-start w-full gap-4 self-center">
            <p className="self-center font-all text-start sm:text-center text-gray-400 text-sm">
              Qty: <span className="text-black/90">{product.quantity}</span>
            </p>
            <p className="self-center font-all text-xs font-semibold text-start sm:text-center text-orange-600/80">
              {formatPrice(product.price, "NGN")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start self-center sm:-mt-2 sm:w-3/4 w-full gap-1.5 sm:gap-4 justify-start mt-2">
        <div className="flex flex-row items-center gap-2 self-center sm:w-auto w-full">
          <Clock className="text-gray-500" size={16} />
          <p className="font-all text-sm font-semibold self-center text-gray-500">
            Est Delivery: <span className="text-black/90">Dec 15, 2024</span>
          </p>
        </div>
        <div className="w-auto bg-green-200 px-2 p-2 rounded-lg sm:rounded-2xl border gap-1 border-green-400 flex flex-row sm:justify-center self-start sm:self-center">
          <Truck className="text-green-700 self-center" size={16} />
          <p className="font-all text-xs text-center self-center">On Route</p>
        </div>
      </div>
    </div>
  );
}

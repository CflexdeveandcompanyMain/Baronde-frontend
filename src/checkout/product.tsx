import { useState } from "react";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import { Check, ChevronDown, ShoppingBag, Truck } from "lucide-react";
import { nigerianStates } from "../user/data";
import { pay } from "..";
import { countries } from "./data";
import { formatPrice } from "../utils/priceconverter";
import type { HeroDataType } from "../mainpage/Hero/data";
import { useCart } from "../utils/storage";

export default function Checkout() {
  let [deliveryOption, setDeliveryOption] = useState("ship");
  let [state, setstate] = useState("Abia");
  let { cart, totals } = useCart();

  return (
    <>
      <MainPageNavbar />
      <section className="w-full h-full py-3 bg-gray-200 items-center sm:gap-5 justify-start gap-4">
        <section className="w-full sm:w-4/5 flex sm:flex-row flex-col mx-auto gap-7 p-3 sm:py-10">
          <section className="flex flex-col items-center w-full gap-5 sm:w-3/5">
            <section className="flex flex-col items-center shadow w-full p-4 bg-white rounded">
              <div className="flex justify-start w-full">
                <p className="font-all text-lg sm:text-xl font-semibold text-[#333333]">
                  Delivery
                </p>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-row items-center w-full py-2 border-b border-stone-500 justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="ship"
                      checked={deliveryOption === "ship"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                    />
                    <span className="text-sm font-all font-medium">Ship</span>
                  </label>
                  <Truck className="text-green-500" size={16} />
                </div>
                <div className="flex flex-row items-center w-full py-2 border-b border-stone-500 justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={deliveryOption === "pickup"}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                    />
                    <span className="text-sm font-all font-medium">
                      Pick up in store
                    </span>
                  </label>
                  <ShoppingBag className="text-green-500" size={16} />
                </div>
              </div>
              <div className="flex flex-col items-center w-full gap-3">
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    htmlFor="country"
                    className="font-all text-lg w-full text-start"
                  >
                    Country
                  </label>
                  <div className="flex flex-row justify-between border border-stone-700 w-full">
                    <input
                      id="country"
                      name="country"
                      placeholder="Select country..."
                      className="w-4/5 p-2 outline-0"
                      list="country"
                    />
                    <ChevronDown className="w-1/5 self-center" />
                  </div>
                  <datalist id="country">
                    {countries.map((item: string, index: number) => {
                      return (
                        <option
                          key={index}
                          className="font-all text-sm font-medium p-2"
                          value={item}
                        />
                      );
                    })}
                  </datalist>
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    className="font-all text-sm font-medium text-start w-full"
                    htmlFor="firstname"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g doe"
                    className="font-all text-sm font-medium w-full p-2 outline-none border border-stone-600"
                  />
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    className="font-all text-sm font-medium text-start w-full"
                    htmlFor="firstname"
                  >
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="font-all text-sm font-medium w-full p-2 outline-none border border-stone-600"
                  />
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    className="font-all text-sm font-medium text-start w-full"
                    htmlFor="firstname"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="font-all text-sm font-medium w-full p-2 outline-none border border-stone-600"
                  />
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    className="font-all text-sm font-medium text-start w-full"
                    htmlFor="firstname"
                  >
                    Apartment/suit etc (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="font-all text-sm font-medium w-full p-2 outline-none border border-stone-600"
                  />
                </div>
                <div className="flex flex-row items-center w-full gap-5 mt-2">
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="state"
                      className="font-all text-xs font-semibold  text-start"
                    >
                      State
                    </label>
                    <input
                      list="nigerian-states"
                      id="state"
                      name="state"
                      className="w-full p-2 border border-black/40 outline-none text-xs"
                      placeholder="Abia"
                    />
                    <datalist
                      onChange={(e: any) => setstate(e.target.value)}
                      id="nigerian-states"
                    >
                      {nigerianStates.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item}
                            className="font-all text-xs"
                          />
                        );
                      })}
                    </datalist>
                  </div>
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="state"
                      className="font-all text-xs font-semibold  text-start"
                    >
                      City
                    </label>
                    <input
                      list="nigerian-states"
                      id="state"
                      name="state"
                      className="w-full p-2 border border-black/40 outline-none text-xs"
                      placeholder="Abia"
                    />
                    <datalist
                      onChange={(e: any) => setstate(e.target.value)}
                      id="nigerian-states"
                    >
                      {nigerianStates.map((item: string, index: number) => {
                        return (
                          <option
                            key={index}
                            value={item}
                            className="font-all text-xs"
                          />
                        );
                      })}
                    </datalist>
                  </div>
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="state"
                      className="font-all text-xs font-semibold  text-start"
                    >
                      Zipcode
                    </label>
                    <input
                      id="state"
                      name="state"
                      className="w-full p-2 border border-black/40 outline-none text-xs"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                  <label
                    className="font-all text-sm font-medium text-start w-full"
                    htmlFor="firstname"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="font-all text-sm font-medium w-full p-2 outline-none border border-stone-600"
                  />
                </div>
              </div>
            </section>
            <section className="w-full p-3 py-7 rounded shadow flex flex-col items-center bg-white">
              <div className="flex flex-col items-start w-full gap-2">
                <p className="font-all text-lg sm:text-xl font-semibold text-start w-full">
                  Payment
                </p>
                <p className="font-all text-sm text-stone-700 w-full text-start">
                  All transactions are secured and encrypted
                </p>
              </div>
              <div className="flex flex-row items-center w-full py-2 border-b border-stone-500 justify-between">
                <label className="flex items-center space-x-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="delivery"
                    value="ship"
                    checked={deliveryOption === "ship"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                  />
                  <span className="text-sm font-all font-medium">Paystack</span>
                </label>
                <div className="flex flex-row items-center gap-1 justify-end w-full">
                  <img src={pay} className="object-cover w-3/5" />
                </div>
              </div>
              <div className="flex flex-row items-center w-full py-2 border-b border-stone-500 justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                  />
                  <span className="text-sm font-all font-medium">
                    Cash on delivery
                  </span>
                </label>
                <div></div>
              </div>
            </section>
            <section className="w-full p-3 py-7 rounded shadow flex flex-col items-center bg-white">
              <div className="flex flex-col items-start w-full gap-2">
                <p className="font-all text-lg sm:text-xl font-semibold text-start w-full">
                  Billing Address
                </p>
                <p className="font-all text-sm text-stone-700 w-full text-start">
                  All transactions are secured and encrypted
                </p>
              </div>
              <div className="flex flex-row items-center w-full py-2 border-b border-stone-500 justify-between">
                <label className="flex items-center space-x-3 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="delivery"
                    value="ship"
                    checked={deliveryOption === "ship"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                  />
                  <span className="text-sm font-all font-medium">
                    Same as shipping address
                  </span>
                </label>
                <div></div>
              </div>
              <div className="flex flex-row items-center w-full py-2 pt-5 justify-between">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full"
                  />
                  <span className="text-sm font-all font-medium">
                    Use a different billing address
                  </span>
                </label>
                <div></div>
              </div>
              <div className="flex flex-row items-center w-full py-2 pt-5 justify-between">
                <label className="flex items-center space-x-3 cursor-pointer relative">
                  <input
                    type="checkbox"
                    name="delivery"
                    value="pickup"
                    checked={true}
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="w-4 h-4 text-green-600 border-[1.5px] border-orange-700 appearance-none rounded relative"
                  />
                  <Check
                    className="text-orange-700 top-1 font-medium left-0.5 absolute"
                    size={13}
                  />
                  <span className="text-sm font-all font-medium">
                    Use a different billing address
                  </span>
                </label>
                <div></div>
              </div>
            </section>
          </section>
          <section className="bg-white sm:w-2/5 w-full rounded shadow p-2 h-auto self-start">
            <div className="flex flex-col items-center w-full gap-2">
              {cart.map((item) => {
                let { name, description, id, price, image } = item;
                return (
                  <CheckoutCard
                    name={name}
                    id={id}
                    image={image}
                    description={description}
                    price={price}
                  />
                );
              })}
            </div>
            <div className="flex flex-row items-center w-full gap-2 my-3">
              <input
                type="text"
                placeholder="Discount code"
                className="p-1.5 w-3/4 border border-stone-400 font-all self-stretch text-xs"
              />
              <button
                type="button"
                className="bg-green-700 text-xs text-center text-white font-medium font-all p-2 self-stretch w-1/4"
              >
                Apply
              </button>
            </div>
            <div className="flex flex-row items-center w-full justify-between pb-1.5">
              <p className="font-all text-xs font-medium text-stone-500">
                Subtotal - {cart.length} items
              </p>
              <p className="font-all text-xs font-medium text-green-700">
                {formatPrice(totals.total, "NGN")}
              </p>
            </div>
            <div className="flex flex-row items-center w-full justify-between pt-4 mt-2 pb-2 border-t border-stone-300">
              <p className="font-all text-xs font-semibold text-stone-500">
                Total
              </p>
              <p className="font-all text-xs font-semibold text-green-700">
                {formatPrice(totals.total, "NGN")}
              </p>
            </div>
            <div className="w-full flex justify-start mt-3">
              <p className="font-all text-xs font-medium text-start">
                Tax fee of <span className="text-orange-500">#10,883.58 </span>
                included
              </p>
            </div>
          </section>
        </section>
      </section>
      <Footer />
    </>
  );
}

type checkoutcard = Pick<
  HeroDataType,
  "name" | "image" | "id" | "description" | "price"
>;

function CheckoutCard({ name, image, id, description, price }: checkoutcard) {
  let { getProductQuantity } = useCart();
  const quantity = getProductQuantity(id);
  return (
    <div className="flex flex-row items-center w-full justify-between">
      <div className="flex flex-row items-center gap-3 w-3/5 self-start">
        <img
          src={image[0]}
          alt={name}
          className="w-16 h-16 self-start object-cover rounded-sm"
        />
        <div className="flex flex-col items-start gap-2 w-full sm:self-center">
          <div className="flex flex-col items-start">
            <p className="w-full text-sm font-semibold text-start font-all">
              {name}
            </p>
            <p className="w-full text-[11px] sm:text-[10px] font-normal text-gray-500 text-start font-all">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className=" w-2/5 flex flex-col justify-start sm:my-auto mt-3 sm:justify-end self-center sm:self-center">
        <p className="font-all text-xs font-semibold text-end">1 item</p>
        <p className="font-all text-xs text-end font-medium text-green-700">
          {formatPrice(quantity * price, "NGN")}
        </p>
      </div>
    </div>
  );
}

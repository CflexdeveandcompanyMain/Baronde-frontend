import { useEffect, useState } from "react";
import Footer from "../footer/footer";
import MainPageNavbar from "../mainpage/navbar/navbar";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "../utils/priceconverter";
import type { HeroDataType } from "../mainpage/Hero/data";
import { useCart, type LocalCartItem } from "../utils/storage";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/getFetch";
import { PaymentSection } from "./paymentsection";
import { BillingSection } from "./billingsection";
import { useNavigate } from "react-router-dom";
import DeliverySection from "./delivery";

// Types
type DeliveryOption = "ship" | "pickup";
type PaymentOption = "paystack" | "cash";
type BillingOption = "same" | "different";

interface FormData {
  delivery: {
    option: DeliveryOption;
    country: string;
    fullName: string;
    company: string;
    address: string;
    apartment: string;
    state: string;
    city: string;
    zipcode: string;
    phoneNumber: string;
    email: string;
  };
  payment: {
    option: PaymentOption;
  };
  billing: {
    option: BillingOption;
    saveInfo: boolean;
  };
  discountCode: string;
}

export default function Checkout() {
  const { cart, totals } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    delivery: {
      option: "ship",
      country: "Nigeria",
      fullName: "",
      company: "",
      address: "",
      apartment: "",
      state: "Abia",
      city: "",
      zipcode: "",
      phoneNumber: "",
      email: "",
    },
    payment: {
      option: "paystack",
    },
    billing: {
      option: "same",
      saveInfo: true,
    },
    discountCode: "",
  });

  const updateFormData = (
    section: keyof FormData,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDiscountCode = (value: string) => {
    setFormData((prev) => ({ ...prev, discountCode: value }));
  };

  const applyDiscount = () => {
    console.log("Applying discount code:", formData.discountCode);
  };

  const handleCheckout = async () => {
    setError("");
    setIsProcessing(true);

    try {
      const { fullName, address, phoneNumber, email, city } = formData.delivery;

      if (!fullName || !address || !phoneNumber || !email || !city) {
        throw new Error("Please fill in all required fields");
      }

      const navigate = useNavigate();

      if (cart.length === 0) {
        throw new Error("Your cart is empty");
      }
      const user = JSON.parse(
        sessionStorage.getItem("baron:user") || "{}"
      ).isVerified;
      const token = user.token || sessionStorage.getItem("baron:token");

      if (!user.isVerified) navigate("/signup");

      if (!token) {
        throw new Error("Please log in to continue");
      }
      const shippingAddress = {
        fullName: formData.delivery.fullName,
        email: formData.delivery.email,
        phoneNumber: formData.delivery.phoneNumber,
        address: formData.delivery.address,
        apartment: formData.delivery.apartment,
        city: formData.delivery.city,
        state: formData.delivery.state,
        zipcode: formData.delivery.zipcode,
        country: formData.delivery.country,
        deliveryOption: formData.delivery.option,
      };

      const response = await fetch("/api/order/v1/initiate-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shippingAddress }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate checkout");
      }

      if (data.status === "success" && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      setError(error.message || "An error occurred during checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    console.log(cart);
  }, []);

  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return (
    <>
      <MainPageNavbar />
      <section className="w-full min-h-screen py-3 bg-gray-200">
        <div className="w-full sm:w-4/5 flex sm:flex-row flex-col mx-auto gap-7 p-3 sm:py-10">
          <div className="flex flex-col w-full sm:w-3/5 gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <DeliverySection
              formData={formData.delivery}
              updateFormData={(field: any, value: any) =>
                updateFormData("delivery", field, value)
              }
            />

            <PaymentSection
              paymentOption={formData.payment.option}
              updatePayment={(value: any) =>
                updateFormData("payment", "option", value)
              }
            />

            <BillingSection
              billingData={formData.billing}
              updateBilling={(field: any, value: any) =>
                updateFormData("billing", field, value)
              }
            />
          </div>

          <OrderSummary
            status={status}
            data={data}
            cart={cart}
            totals={totals}
            discountCode={formData.discountCode}
            onDiscountChange={handleDiscountCode}
            onApplyDiscount={applyDiscount}
            onCheckout={handleCheckout}
            isProcessing={isProcessing}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

function OrderSummary({
  cart,
  totals,
  status,
  data,
  discountCode,
  onDiscountChange,
  onApplyDiscount,
  onCheckout,
  isProcessing,
}: {
  cart: LocalCartItem[];
  totals: any;
  status: string;
  data: HeroDataType[];
  discountCode: string;
  onDiscountChange: any;
  onApplyDiscount: any;
  onCheckout: () => void;
  isProcessing: boolean;
}) {
  return (
    <section className="bg-white sm:w-2/5 w-full rounded shadow p-4 h-fit">
      <div className="flex flex-col gap-4">
        {status === "pending" ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 border-b border-stone-200 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="text-right flex-shrink-0 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : status === "success" && data ? (
          <div className="space-y-3">
            {cart.map((item: any) => {
              const product = data.find((p: any) => p._id === item.productId);
              if (!product) return null;

              const { name, description, _id, price, images } = product;
              return (
                <CheckoutCard
                  key={_id}
                  stockQuantity={item.count}
                  name={name}
                  _id={_id}
                  images={images}
                  description={description}
                  price={price}
                />
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item: any) => {
              const { name, description, _id, price, images } = item.product;
              return (
                <CheckoutCard
                  key={_id}
                  stockQuantity={item.count}
                  name={name}
                  _id={_id}
                  images={images}
                  description={description}
                  price={price}
                />
              );
            })}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => onDiscountChange(e.target.value)}
            placeholder="Discount code"
            className="p-2 flex-1 border border-stone-400 font-all text-sm rounded"
          />
          <button
            type="button"
            onClick={onApplyDiscount}
            className="bg-green-700 text-sm text-white font-medium font-all px-4 py-2 rounded hover:bg-green-800 transition-colors"
          >
            Apply
          </button>
        </div>
        <div className="space-y-2 pt-4 border-t border-stone-300">
          <div className="flex justify-between">
            <p className="font-all text-sm font-medium text-stone-500">
              Subtotal ({cart.length} items)
            </p>
            <p className="font-all text-sm font-medium text-green-700">
              {formatPrice(totals.total, "NGN")}
            </p>
          </div>

          <div className="flex justify-between pt-2 border-t border-stone-300">
            <p className="font-all text-sm font-semibold text-stone-500">
              Total
            </p>
            <p className="font-all text-sm font-semibold text-green-700">
              {formatPrice(totals.total, "NGN")}
            </p>
          </div>

          <p className="font-all text-xs text-stone-600 mt-2">
            Tax fee of
            <span className="text-orange-500">
              ₦{(totals.total * 0.00023).toFixed(2)}
            </span>
            included
          </p>
        </div>
        <button
          onClick={onCheckout}
          disabled={isProcessing || cart.length === 0}
          className={`w-full p-2 text-center text-xs text-white font-all rounded transition-colors ${
            isProcessing || cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800"
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </section>
  );
}

export function DeliveryOption({
  value,
  checked,
  onChange,
  label,
  icon,
}: {
  value: string;
  checked: boolean;
  onChange: any;
  label: string;
  icon: any;
}) {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-stone-300">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          name="delivery"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full checked:bg-green-600"
        />
        <span className="text-sm font-all font-medium">{label}</span>
      </label>
      {icon}
    </div>
  );
}

export function FormField({
  label,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  required = false,
}: {
  value?: any;
  onChange?: any;
  label: string;
  options?: any;
  placeholder?: any;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <label className="font-all text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex border border-stone-600 w-full">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-2 outline-0 font-all text-sm"
          list={`${label.toLowerCase().replace(/\s+/g, "-")}-options`}
          required={required}
        />
        <ChevronDown className="w-8 self-center text-stone-500" size={16} />
      </div>
      {options && (
        <datalist id={`${label.toLowerCase().replace(/\s+/g, "-")}-options`}>
          {options.map((option: any, index: number) => (
            <option key={index} value={option} />
          ))}
        </datalist>
      )}
    </div>
  );
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  required = false,
}: {
  value?: any;
  onChange?: any;
  label?: any;
  placeholder?: string;
  className?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <label className="font-all text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="font-all text-sm w-full p-2 outline-none border border-stone-600 rounded"
        required={required}
      />
    </div>
  );
}

// Checkout Card Component (unchanged)
type CheckoutCardProps = Pick<
  HeroDataType,
  "name" | "images" | "_id" | "description" | "price" | "stockQuantity"
>;

function CheckoutCard({
  name,
  images,
  _id,
  description,
  stockQuantity,
  price,
}: CheckoutCardProps) {
  const { getProductQuantity } = useCart();
  const quantity = getProductQuantity(_id);

  return (
    <div className="flex items-start gap-3 p-3 border-b border-stone-200 last:border-b-0">
      <img
        src={images[0]?.url}
        alt={name}
        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-all text-sm font-semibold text-gray-900 truncate">
          {name}
        </h4>
        <p className="font-all text-xs text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-all text-xs font-semibold text-gray-600">
          {stockQuantity} item{stockQuantity > 1 ? "s" : ""}
        </p>
        <p className="font-all text-sm font-medium text-green-700">
          {formatPrice(quantity * price, "NGN")}
        </p>
      </div>
    </div>
  );
}

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
import { PaystackButton } from "react-paystack";

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
  const { cart, totals, filterReduce } = useCart();

  const [formData, setFormData] = useState<FormData>({
    delivery: {
      option: "ship",
      country: "",
      fullName: "",
      company: "",
      address: "",
      apartment: "",
      state: "Abia",
      city: "",
      zipcode: "",
      phoneNumber: "",
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

  // Generic handler for updating nested form data
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
    // Implement discount logic here
    console.log("Applying discount code:", formData.discountCode);
  };

  return (
    <>
      <MainPageNavbar />
      <section className="w-full min-h-screen py-3 bg-gray-200">
        <div className="w-full sm:w-4/5 flex sm:flex-row flex-col mx-auto gap-7 p-3 sm:py-10">
          {/* Left Column - Forms */}
          <div className="flex flex-col w-full sm:w-3/5 gap-5">
            {/* Delivery Section */}
            <DeliverySection
              formData={formData.delivery}
              updateFormData={(field: any, value: any) =>
                updateFormData("delivery", field, value)
              }
            />

            {/* Payment Section */}
            <PaymentSection
              paymentOption={formData.payment.option}
              updatePayment={(value: any) =>
                updateFormData("payment", "option", value)
              }
            />

            {/* Billing Section */}
            <BillingSection
              billingData={formData.billing}
              updateBilling={(field: any, value: any) =>
                updateFormData("billing", field, value)
              }
            />
          </div>

          {/* Right Column - Order Summary */}
          <OrderSummary
            formData={formData}
            cart={cart}
            totals={totals}
            filterReduce={filterReduce}
            discountCode={formData.discountCode}
            onDiscountChange={handleDiscountCode}
            onApplyDiscount={applyDiscount}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

// Delivery Section Component
function DeliverySection({
  formData,
  updateFormData,
}: {
  formData: any;
  updateFormData: any;
}) {
  return (
    <section className="flex flex-col shadow w-full p-4 bg-white rounded">
      <div className="flex justify-start w-full mb-4">
        <p className="font-all text-lg sm:text-xl font-semibold text-[#333333]">
          Delivery
        </p>
      </div>

      {/* Delivery Options */}
      <div className="flex flex-col w-full mb-4">
        <DeliveryOption
          value="ship"
          checked={formData.option === "ship"}
          onChange={(value: any) => updateFormData("option", value)}
          label="Ship"
          icon={<Truck className="text-green-500" size={16} />}
        />
        <DeliveryOption
          value="pickup"
          checked={formData.option === "pickup"}
          onChange={(value: any) => updateFormData("option", value)}
          label="Pick up in store"
          icon={<ShoppingBag className="text-green-500" size={16} />}
        />
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        <FormField
          label="Country"
          value={formData.country}
          onChange={(value: any) => updateFormData("country", value)}
          options={countries}
          placeholder="Select country..."
        />

        <InputField
          label="Full Name"
          value={formData.fullName}
          onChange={(value: any) => updateFormData("fullName", value)}
          placeholder="Enter your full name"
          required
        />

        <InputField
          label="Email"
          value={formData.company}
          onChange={(value: any) => updateFormData("email", value)}
          placeholder="Enter your email"
        />

        <InputField
          label="Address"
          value={formData.address}
          onChange={(value: any) => updateFormData("address", value)}
          placeholder="Enter your delivery address"
          required
        />

        <InputField
          label="Apartment/suite etc (optional)"
          value={formData.apartment}
          onChange={(value: any) => updateFormData("apartment", value)}
          placeholder="Apartment, suite, unit, etc."
        />

        {/* Location Fields */}
        <div className="flex flex-row gap-3 mt-2">
          <FormField
            label="State"
            value={formData.state}
            onChange={(value: any) => updateFormData("state", value)}
            options={nigerianStates}
            placeholder="Select state"
            className="flex-1"
          />

          <InputField
            label="City"
            value={formData.city}
            onChange={(value: any) => updateFormData("city", value)}
            placeholder="Enter city"
            className="flex-1"
          />

          <InputField
            label="Zipcode"
            value={formData.zipcode}
            onChange={(value: any) => updateFormData("zipcode", value)}
            placeholder="Zipcode"
            className="flex-1"
          />
        </div>

        <InputField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(value: any) => updateFormData("phoneNumber", value)}
          placeholder="Enter your phone number"
          type="tel"
          required
        />
      </div>
    </section>
  );
}

// Payment Section Component
function PaymentSection({
  paymentOption,
  updatePayment,
}: {
  paymentOption: string;
  updatePayment: any;
}) {
  return (
    <section className="w-full p-4 py-7 rounded shadow flex flex-col bg-white">
      <div className="flex flex-col items-start w-full gap-2 mb-4">
        <p className="font-all text-lg sm:text-xl font-semibold">Payment</p>
        <p className="font-all text-sm text-stone-700">
          All transactions are secured and encrypted
        </p>
      </div>

      <PaymentOption
        value="paystack"
        checked={paymentOption === "paystack"}
        onChange={updatePayment}
        label="Paystack"
        extra={
          <img src={pay} className="object-cover w-3/5" alt="Payment methods" />
        }
      />

      <PaymentOption
        extra={<></>}
        value="cash"
        checked={paymentOption === "cash"}
        onChange={updatePayment}
        label="Cash on delivery"
      />
    </section>
  );
}

// Billing Section Component
function BillingSection({
  billingData,
  updateBilling,
}: {
  billingData: any;
  updateBilling: any;
}) {
  return (
    <section className="w-full p-4 py-7 rounded shadow flex flex-col bg-white">
      <div className="flex flex-col items-start w-full gap-2 mb-4">
        <p className="font-all text-lg sm:text-xl font-semibold">
          Billing Address
        </p>
        <p className="font-all text-sm text-stone-700">
          Select your billing address option
        </p>
      </div>

      <BillingOption
        value="same"
        checked={billingData.option === "same"}
        onChange={(value: any) => updateBilling("option", value)}
        label="Same as shipping address"
      />

      <BillingOption
        value="different"
        checked={billingData.option === "different"}
        onChange={(value: any) => updateBilling("option", value)}
        label="Use a different billing address"
      />

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-300">
        <label className="flex items-center space-x-3 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={billingData.saveInfo}
              onChange={(e) => updateBilling("saveInfo", e.target.checked)}
              className="w-4 h-4 border-[1.5px] border-orange-700 appearance-none rounded"
            />
            {billingData.saveInfo && (
              <Check
                className="text-orange-700 absolute top-0.5 left-0.5"
                size={12}
              />
            )}
          </div>
          <span className="text-sm font-all font-medium">
            Save this information for next time
          </span>
        </label>
      </div>
    </section>
  );
}

// Order Summary Component
function OrderSummary({
  cart,
  totals,
  filterReduce,
  discountCode,
  onDiscountChange,
  onApplyDiscount,
  formData,
}: {
  cart: HeroDataType[];
  totals: any;
  filterReduce: (cart: HeroDataType[]) => any[];
  discountCode: string;
  onDiscountChange: any;
  onApplyDiscount: any;
  formData: any;
}) {
  const puBlic_key = "pk_test_55b5c8784df9c619e9bcb82982aef69c61978c0e";
  const { fullName, phoneNumber } = formData.delivery;
  const email = JSON.parse(sessionStorage.getItem("baron:user") || "{}").email;

  const prop = {
    amount: totals.total / 1000,
    email,
    currency: "NGN",
    name: fullName,
    phone: phoneNumber,
    publicKey: puBlic_key,
    text: "Continue payment",
    onSuccess() {
      alert("Payment was successful");
    },
    onClose() {
      alert("Are you sure you want to close?");
    },
  };

  return (
    <section className="bg-white sm:w-2/5 w-full rounded shadow p-4 h-fit">
      <div className="flex flex-col gap-4">
        {/* Cart Items */}
        <div className="space-y-3">
          {filterReduce(cart).map((item: any) => {
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

        {/* Discount Code */}
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

        {/* Totals */}
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
            Tax fee of{" "}
            <span className="text-orange-500">
              ₦{(totals.total * 0.00023).toFixed(2)}
            </span>{" "}
            included
          </p>
        </div>
        {/* <button
          onClick={() => console.log(formData)}
          className="w-full p-2 bg-green-700 text-center text-xs text-white font-all"
        >
          Pay Now
        </button> */}

        <PaystackButton
          {...prop}
          text="Pay Now"
          className="w-full p-2 bg-green-700 text-center text-xs text-white font-all"
        />
      </div>
    </section>
  );
}

// Reusable Components
function DeliveryOption({
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

function PaymentOption({
  value,
  checked,
  onChange,
  label,
  extra,
}: {
  value: any;
  checked: any;
  onChange: any;
  label: any;
  extra: any;
}) {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-stone-300">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full checked:bg-green-600"
        />
        <span className="text-sm font-all font-medium">{label}</span>
      </label>
      {extra && <div className="flex items-center">{extra}</div>}
    </div>
  );
}

function BillingOption({
  value,
  checked,
  onChange,
  label,
}: {
  value: any;
  checked: any;
  onChange: any;
  label: any;
}) {
  return (
    <div className="flex items-center justify-between w-full py-3 border-b border-stone-300 last:border-b-0">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="radio"
          name="billing"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          className="w-4 h-4 text-green-600 border border-green-700 appearance-none rounded-full checked:bg-green-600"
        />
        <span className="text-sm font-all font-medium">{label}</span>
      </label>
    </div>
  );
}

function FormField({
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

function InputField({
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

// Checkout Card Component (cleaned up)
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

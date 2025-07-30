import { ShoppingBag, Truck } from "lucide-react";
import { DeliveryOption, FormField, InputField } from "./product";
import { countries } from "./data";
import { nigerianStates } from "../user/data";

export default function DeliverySection({
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
          value={formData.email}
          onChange={(value: any) => updateFormData("email", value)}
          placeholder="Enter your email"
          type="email"
          required
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
            required
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

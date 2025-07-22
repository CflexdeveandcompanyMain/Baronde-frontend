import { Check } from "lucide-react";
import { BillingOption } from "./billingoption";

// Billing Section Component
export function BillingSection({
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

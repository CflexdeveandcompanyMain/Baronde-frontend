import { pay } from "..";

// Payment Section Component
export function PaymentSection({
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

export function PaymentOption({
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

export function BillingOption({
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

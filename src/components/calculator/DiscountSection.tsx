"use client";

interface DiscountSectionProps {
  discountPercent: string;
  onDiscountChange: (value: string) => void;
  error?: string;
}

export default function DiscountSection({
  discountPercent,
  onDiscountChange,
  error,
}: DiscountSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-3">Discount</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="discount-input" className="sr-only">
          Discount percentage
        </label>
        <div className="relative flex-1 max-w-40">
          <input
            id="discount-input"
            type="number"
            inputMode="decimal"
            value={discountPercent}
            onChange={(e) => onDiscountChange(e.target.value)}
            placeholder="0"
            min="0"
            max="100"
            step="any"
            className={`w-full px-3 py-2.5 pr-8 border rounded-lg text-sm text-gray-900 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              ${error ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            aria-label="Discount percentage"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
            %
          </span>
        </div>
        <span className="text-sm text-gray-500">
          applied to entire purchase
        </span>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

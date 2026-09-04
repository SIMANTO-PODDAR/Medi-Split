"use client";

import { formatCurrency } from "@/lib/format";
import {
  calcGrandTotal,
  calcDiscountAmount,
  roundCurrency,
} from "@/lib/calculations";
import type { Product } from "@/lib/types";

interface CalculationSummaryProps {
  products: Product[];
  discountPercent: number;
}

export default function CalculationSummary({
  products,
  discountPercent,
}: CalculationSummaryProps) {
  const grandTotal = calcGrandTotal(products);
  const discountAmount = calcDiscountAmount(grandTotal, discountPercent);
  const finalPayable = roundCurrency(grandTotal - discountAmount);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Summary</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Product Price</span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(grandTotal)}
          </span>
        </div>

        {discountPercent > 0 && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-gray-900 font-medium">
                {discountPercent}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discount Amount</span>
              <span className="text-red-600 font-medium">
                - {formatCurrency(discountAmount)}
              </span>
            </div>
          </>
        )}

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900">
              Final Payable
            </span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(finalPayable)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

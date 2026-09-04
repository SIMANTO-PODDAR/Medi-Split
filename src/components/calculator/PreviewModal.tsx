"use client";

import { FiX } from "react-icons/fi";
import type { Product } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/format";
import {
  calcAfterDiscount,
  calcDiscountAmount,
  calcGrandTotal,
  roundCurrency,
} from "@/lib/calculations";

interface PreviewModalProps {
  products: Product[];
  discountPercent: number;
  onClose: () => void;
}

export default function PreviewModal({
  products,
  discountPercent,
  onClose,
}: PreviewModalProps) {
  const grandTotal = calcGrandTotal(products);
  const discountAmount = calcDiscountAmount(grandTotal, discountPercent);
  const finalPayable = roundCurrency(grandTotal - discountAmount);
  const { combined } = formatDateTime(new Date());

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Calculation preview"
    >
      <div className="bg-white w-full max-w-xl rounded-lg shadow-xl my-4 sm:my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Preview</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="px-5 py-5 space-y-5">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900">
              Medicine Discount Calculator
            </h3>
            <p className="text-xs text-gray-500 mt-1">{combined}</p>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-3 py-2 text-center font-medium">SL</th>
                  <th className="px-3 py-2 text-left font-medium">Product</th>
                  <th className="px-3 py-2 text-right font-medium">Price</th>
                  <th className="px-3 py-2 text-center font-medium">Qty</th>
                  <th className="px-3 py-2 text-right font-medium">Total</th>
                  <th className="px-3 py-2 text-right font-medium">
                    After Disc.
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p, idx) => (
                  <tr key={p.id}>
                    <td className="px-3 py-2 text-center text-gray-500">
                      {idx + 1}
                    </td>
                    <td className="px-3 py-2 text-gray-900 font-medium max-w-35 truncate">
                      {p.name}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700">
                      {formatCurrency(p.unitPrice)}
                    </td>
                    <td className="px-3 py-2 text-center text-gray-700">
                      {p.quantity}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-900 font-medium">
                      {formatCurrency(p.total)}
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-green-700">
                      {formatCurrency(
                        calcAfterDiscount(p.total, discountPercent)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold text-gray-900">
                  <td
                    colSpan={4}
                    className="px-3 py-2 text-right"
                  >
                    Grand Total
                  </td>
                  <td className="px-3 py-2 text-right">
                    {formatCurrency(grandTotal)}
                  </td>
                  <td className="px-3 py-2 text-right text-green-700">
                    {formatCurrency(finalPayable)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2.5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Product Price</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(grandTotal)}
              </span>
            </div>
            {discountPercent > 0 && (
              <>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium text-gray-900">
                    {discountPercent}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount Amount</span>
                  <span className="font-medium text-red-600">
                    - {formatCurrency(discountAmount)}
                  </span>
                </div>
              </>
            )}
            <div className="border-t border-gray-200 pt-2.5">
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Final Payable
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(finalPayable)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg
              hover:bg-gray-800 active:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
              transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

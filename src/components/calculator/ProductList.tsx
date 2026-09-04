"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { calcAfterDiscount } from "@/lib/calculations";

interface ProductListProps {
  products: Product[];
  discountPercent: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductList({
  products,
  discountPercent,
  onEdit,
  onDelete,
}: ProductListProps) {
  const hasDiscount = discountPercent > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-3 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">
          Added Products
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({products.length})
          </span>
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 text-center font-medium w-10">SL</th>
              <th className="px-4 py-3 text-left font-medium">Product Name</th>
              <th className="px-4 py-3 text-right font-medium">Unit Price</th>
              <th className="px-4 py-3 text-center font-medium">Qty</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-right font-medium">
                After Discount
              </th>
              <th className="px-4 py-3 text-center font-medium w-24">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, idx) => {
              const afterDiscount = hasDiscount
                ? calcAfterDiscount(product.total, discountPercent)
                : null;
              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3 text-center text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium max-w-50 truncate">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatCurrency(product.unitPrice)}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-900 font-medium">
                    {formatCurrency(product.total)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {afterDiscount !== null ? (
                      <span className="text-green-700">
                        {formatCurrency(afterDiscount)}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label={`Edit ${product.name}`}
                        title="Edit"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        aria-label={`Delete ${product.name}`}
                        title="Delete"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-gray-100">
        {products.map((product, idx) => {
          const afterDiscount = hasDiscount
            ? calcAfterDiscount(product.total, discountPercent)
            : null;
          return (
            <div key={product.id} className="px-4 py-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-xs text-gray-500 font-medium shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ml-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                    aria-label={`Edit ${product.name}`}
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    aria-label={`Delete ${product.name}`}
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs ml-7">
                <div>
                  <span className="text-gray-500 block">Price</span>
                  <span className="text-gray-800 font-medium">
                    {formatCurrency(product.unitPrice)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Qty</span>
                  <span className="text-gray-800 font-medium">
                    {product.quantity}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Total</span>
                  <span className="text-gray-900 font-semibold">
                    {formatCurrency(product.total)}
                  </span>
                </div>
              </div>
              {afterDiscount !== null && (
                <div className="mt-1.5 ml-7">
                  <span className="text-xs text-gray-500">After Discount: </span>
                  <span className="text-xs font-semibold text-green-700">
                    {formatCurrency(afterDiscount)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

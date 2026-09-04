"use client";

import { useState, useCallback } from "react";
import { FiTrash } from "react-icons/fi";
import type { Product } from "@/lib/types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import DiscountSection from "./DiscountSection";
import CalculationSummary from "./CalculationSummary";
import EmptyState from "./EmptyState";

export default function Calculator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [discount, setDiscount] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const discountPercent = (() => {
    const val = parseFloat(discount);
    if (isNaN(val) || val < 0 || val > 100) return 0;
    return val;
  })();

  const handleAddProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product]);
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setEditingProduct((current) => (current?.id === id ? null : current));
  }, []);

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveEdit = useCallback((updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingProduct(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null);
  }, []);

  const handleDiscountChange = useCallback((value: string) => {
    setDiscount(value);
    const val = parseFloat(value);
    if (value.trim() && (isNaN(val) || val < 0 || val > 100)) {
      setDiscountError("Discount must be between 0 and 100");
    } else {
      setDiscountError("");
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setProducts([]);
    setDiscount("");
    setEditingProduct(null);
    setShowClearConfirm(false);
    setDiscountError("");
  }, []);

  return (
    <div className="space-y-4">
      {/* Product Form */}
      <ProductForm
        onAdd={handleAddProduct}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
      />

      {/* Product List or Empty State */}
      {products.length > 0 ? (
        <>
          <ProductList
            products={products}
            discountPercent={discountPercent}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          {/* Discount */}
          <DiscountSection
            discountPercent={discount}
            onDiscountChange={handleDiscountChange}
            error={discountError}
          />

          {/* Summary */}
          <CalculationSummary
            products={products}
            discountPercent={discountPercent}
          />

          {/* Clear All */}
          <div>
            {!showClearConfirm ? (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg
                  hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                  transition-colors cursor-pointer"
                aria-label="Clear all products"
              >
                <FiTrash className="w-4 h-4" />
                Clear All
              </button>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-sm text-red-700">
                  Clear all products?
                </span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md
                    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors cursor-pointer"
                  aria-label="Confirm clear all"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1.5 border border-red-200 text-red-700 text-xs font-medium rounded-md
                    hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors cursor-pointer"
                  aria-label="Cancel clear"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

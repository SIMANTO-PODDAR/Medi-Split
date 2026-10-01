"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import type { Product, SavedProduct } from "@/lib/types";
import { calcProductTotal } from "@/lib/calculations";
import { findMatchingProducts, saveProduct } from "@/lib/storage";
import Link from "next/link";
import { GrCircleQuestion } from "react-icons/gr";

interface ProductFormProps {
  onAdd: (product: Product) => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
  onSaveEdit: (product: Product) => void;
}

export default function ProductForm({
  onAdd,
  editingProduct,
  onCancelEdit,
  onSaveEdit,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [suggestions, setSuggestions] = useState<SavedProduct[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    unitPrice?: string;
    quantity?: string;
  }>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // When editing, fill the form
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setUnitPrice(editingProduct.unitPrice.toString());
      setQuantity(editingProduct.quantity.toString());
      setErrors({});
      nameInputRef.current?.focus();
    }
  }, [editingProduct]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: undefined }));
    if (value.trim().length > 0) {
      const matches = findMatchingProducts(value);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleSelectSuggestion = useCallback((product: SavedProduct) => {
    setName(product.name);
    setUnitPrice(product.price.toString());
    setSuggestions([]);
    setShowSuggestions(false);
    setErrors({});
    // Focus quantity since name and price are auto-filled
    document.getElementById("quantity-input")?.focus();
  }, []);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Product name is required";
    }

    const priceNum = parseFloat(unitPrice);
    if (!unitPrice.trim() || isNaN(priceNum) || priceNum < 0) {
      newErrors.unitPrice = "Enter a valid price";
    }

    const qtyNum = parseFloat(quantity);
    if (!quantity.trim() || isNaN(qtyNum) || qtyNum <= 0) {
      newErrors.quantity = "Enter a valid quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const priceNum = parseFloat(unitPrice);
    const qtyNum = parseFloat(quantity);
    const total = calcProductTotal(priceNum, qtyNum);

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: name.trim(),
        unitPrice: priceNum,
        quantity: qtyNum,
        total,
      };
      onSaveEdit(updated);
      saveProduct(updated.name, updated.unitPrice);
    } else {
      const product: Product = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        name: name.trim(),
        unitPrice: priceNum,
        quantity: qtyNum,
        total,
      };
      onAdd(product);
      saveProduct(product.name, product.unitPrice);
    }

    resetForm();
    nameInputRef.current?.focus();
  };

  const resetForm = () => {
    setName("");
    setUnitPrice("");
    setQuantity("");
    setErrors({});
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-md sm:text-2xl font-semibold text-gray-900 leading-tight">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Link
          href="/how-to-use#medi-split"
          aria-label="How to use Medi-Split"
          title="How to use Medi-Split"
          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[#085698] hover:bg-[#085698]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#085698]/40"
        >
          <GrCircleQuestion className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="space-y-4">
        {/* Product Name */}
        <div className="relative" ref={suggestionsRef}>
          <label
            htmlFor="product-name-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            ref={nameInputRef}
            id="product-name-input"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter product name"
            autoComplete="off"
            className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
            aria-label="Product name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((s, idx) => (
                <button
                  key={`${s.name}-${idx}`}
                  type="button"
                  className="w-full text-left px-3 py-2.5 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center justify-between text-sm"
                  onClick={() => handleSelectSuggestion(s)}
                  aria-label={`Select ${s.name} at ৳${s.price}`}
                >
                  <span className="text-gray-900 font-medium">{s.name}</span>
                  <span className="text-gray-500 text-xs">৳{s.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Unit Price & Quantity — side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="unit-price-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unit Price
            </label>
            <input
              id="unit-price-input"
              type="number"
              inputMode="decimal"
              value={unitPrice}
              onChange={(e) => {
                setUnitPrice(e.target.value);
                setErrors((prev) => ({ ...prev, unitPrice: undefined }));
              }}
              onKeyDown={handleKeyDown}
              placeholder="৳ Price"
              min="0"
              step="any"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                ${
                  errors.unitPrice
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                }`}
              aria-label="Unit price"
            />
            {errors.unitPrice && (
              <p className="mt-1 text-xs text-red-500">{errors.unitPrice}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity
            </label>
            <input
              id="quantity-input"
              type="number"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setErrors((prev) => ({ ...prev, quantity: undefined }));
              }}
              onKeyDown={handleKeyDown}
              placeholder="Qty"
              min="1"
              step="1"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                ${
                  errors.quantity
                    ? "border-red-400 bg-red-50"
                    : "border-gray-300"
                }`}
              aria-label="Quantity"
            />
            {errors.quantity && (
              <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg
              hover:bg-gray-800 active:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
              transition-colors cursor-pointer"
            aria-label={editingProduct ? "Save changes" : "Add product"}
          >
            <FiPlus className="w-4 h-4" />
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg
                hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                transition-colors cursor-pointer"
              aria-label="Cancel editing"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

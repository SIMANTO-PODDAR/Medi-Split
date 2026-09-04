import type { Product } from "./types";

/**
 * Calculate total for a single product.
 */
export function calcProductTotal(unitPrice: number, quantity: number): number {
  return roundCurrency(unitPrice * quantity);
}

/**
 * Calculate discount amount for a given total and discount percentage.
 */
export function calcDiscountAmount(total: number, discountPercent: number): number {
  return roundCurrency((total * discountPercent) / 100);
}

/**
 * Calculate price after discount for a given total and discount percentage.
 */
export function calcAfterDiscount(total: number, discountPercent: number): number {
  return roundCurrency(total - calcDiscountAmount(total, discountPercent));
}

/**
 * Calculate the grand total (sum of all product totals).
 */
export function calcGrandTotal(products: Product[]): number {
  return roundCurrency(products.reduce((sum, p) => sum + p.total, 0));
}

/**
 * Round to 2 decimal places to avoid floating-point currency issues.
 */
export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

import type { SavedProduct } from "./types";

const STORAGE_KEY = "medi-split-saved-products";

/**
 * Read saved products from LocalStorage safely.
 */
export function getSavedProducts(): SavedProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    // Validate each entry
    return parsed.filter(
      (item: unknown): item is SavedProduct =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as SavedProduct).name === "string" &&
        typeof (item as SavedProduct).price === "number" &&
        (item as SavedProduct).name.trim().length > 0
    );
  } catch {
    // Malformed JSON — gracefully reset
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

/**
 * Save or update a product in LocalStorage.
 * Case-insensitive matching for product names.
 */
export function saveProduct(name: string, price: number): void {
  if (typeof window === "undefined") return;
  const products = getSavedProducts();
  const existingIndex = products.findIndex(
    (p) => p.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (existingIndex >= 0) {
    // Update existing product's price
    products[existingIndex].price = price;
    // Preserve the newer casing
    products[existingIndex].name = name.trim();
  } else {
    products.push({ name: name.trim(), price });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Find products matching a query string (case-insensitive).
 */
export function findMatchingProducts(query: string): SavedProduct[] {
  if (!query.trim()) return [];
  const products = getSavedProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lowerQuery));
}

/**
 * Delete a product from LocalStorage by name.
 */
export function deleteProduct(name: string): void {
  if (typeof window === "undefined") return;
  const products = getSavedProducts();
  const filtered = products.filter(
    (p) => p.name.toLowerCase() !== name.trim().toLowerCase()
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Update an existing product. 
 * Allows changing the name (removes the old entry, saves the new one) and price.
 */
export function updateProduct(oldName: string, newName: string, newPrice: number): void {
  if (typeof window === "undefined") return;
  const products = getSavedProducts();
  const existingIndex = products.findIndex(
    (p) => p.name.toLowerCase() === oldName.trim().toLowerCase()
  );

  if (existingIndex >= 0) {
    // If the name is changing and the new name already exists elsewhere, 
    // we should ideally handle it, but for simplicity we can just update it in place.
    const newNameExistsIndex = products.findIndex(
      (p, idx) => idx !== existingIndex && p.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (newNameExistsIndex >= 0) {
      // If the new name already exists, we might want to just update that one and remove the old one.
      // But let's just replace the old one's properties and if there's a duplicate, we remove the duplicate.
      products[existingIndex].name = newName.trim();
      products[existingIndex].price = newPrice;
      products.splice(newNameExistsIndex, 1);
    } else {
      products[existingIndex].name = newName.trim();
      products[existingIndex].price = newPrice;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
}

/**
 * Clear all saved products from LocalStorage.
 */
export function clearAllProducts(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

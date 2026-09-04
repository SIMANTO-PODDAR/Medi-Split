export interface Product {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface SavedProduct {
  name: string;
  price: number;
}

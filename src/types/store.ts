export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports";

export interface Product {
  _id: string;
  dbId?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  category: ProductCategory;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

import { mockProducts } from "@/lib/mock-data";
import { Product } from "@/types/store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
const ACCESS_TOKEN_KEY = "urbancart_access_token";
const REFRESH_TOKEN_KEY = "urbancart_refresh_token";

interface BackendProduct {
  id: number;
  product_id: string;
  title: string;
  description: string | null;
  category: { level1: string; level2: string; level3: string };
  price: { selling_price: number };
  inventory: { stock: number };
  ratings: { average: number };
  images: string[];
}

interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface OrderItem {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

function mapProduct(item: BackendProduct): Product {
  return {
    _id: item.product_id,
    dbId: item.id,
    name: item.title,
    description: item.description ?? "",
    price: item.price.selling_price,
    image: item.images[0] ?? "https://via.placeholder.com/600x400?text=Product",
    stock: item.inventory.stock,
    rating: item.ratings.average,
    category: item.category.level1 as Product["category"],
  };
}

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let detail = "";
    try {
      const errorBody = (await response.json()) as { detail?: string };
      detail = errorBody.detail ? ` - ${errorBody.detail}` : "";
    } catch {
      // Ignore JSON parse failures for non-JSON error responses.
    }
    throw new Error(`API request failed: ${response.status}${detail}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await apiRequest<BackendProduct[]>("/products/");
    return products.map(mapProduct);
  } catch {
    return mockProducts;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await apiRequest<BackendProduct>(`/products/${id}`);
    return mapProduct(product);
  } catch {
    return mockProducts.find((product) => product._id === id) ?? null;
  }
}

export async function registerUser(payload: {
  email: string;
  password: string;
  full_name?: string;
}) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  const tokens = await apiRequest<TokenPair>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  }
  return tokens;
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(getAccessToken());
}

export async function addToBackendCart(productId: number, quantity = 1) {
  return apiRequest("/cart/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export async function checkoutOrder() {
  return apiRequest<Order>("/orders/checkout", { method: "POST" });
}

export async function getOrders() {
  return apiRequest<Order[]>("/orders/");
}

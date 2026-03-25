"use client";

import { CartItem, Product } from "@/types/store";

const CART_KEY = "urbancart_cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(CART_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addItemToCart(product: Product) {
  const cart = readCart();
  const existingItem = cart.find((item) => item.product._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  writeCart(cart);
}

export function clearCart() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CART_KEY);
}

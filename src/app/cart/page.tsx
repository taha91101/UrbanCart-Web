"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import { readCart, writeCart, clearCart } from "@/lib/cart";
import { CartItem } from "@/types/store";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0),
    [items],
  );

  function updateQuantity(productId: string, delta: number) {
    const next = items
      .map((item) => {
        if (item.product._id !== productId) return item;
        return { ...item, quantity: item.quantity + delta };
      })
      .filter((item) => item.quantity > 0);

    setItems(next);
    writeCart(next);
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900">Your Cart</h1>
          <button
            type="button"
            onClick={() => {
              clearCart();
              setItems([]);
            }}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            Clear cart
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
            <p className="text-zinc-700">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="rounded-xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-zinc-900">{item.product.name}</h2>
                    <p className="text-sm text-zinc-600">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product._id, -1)}
                      className="rounded-md border border-zinc-300 px-3 py-1"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product._id, 1)}
                      className="rounded-md border border-zinc-300 px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between text-lg">
                <span className="font-semibold text-zinc-800">Subtotal</span>
                <span className="font-bold text-zinc-900">${subtotal.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="block rounded-md bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

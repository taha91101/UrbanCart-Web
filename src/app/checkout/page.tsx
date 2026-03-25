"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import { checkoutOrder } from "@/lib/api";
import { clearCart, readCart } from "@/lib/cart";

export default function CheckoutPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const items = readCart();
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const order = await checkoutOrder();
      clearCart();
      setMessage(`Order #${order.id} placed successfully.`);
    } catch {
      setError("Checkout failed. Sign in and ensure your backend cart has items.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-zinc-900">Checkout</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Fill in your shipping and payment details.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Shipping address"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Card number"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white"
            >
              {loading ? "Placing..." : "Place order"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          </form>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-bold text-zinc-900">Order Summary</h2>
          <div className="mt-5 space-y-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

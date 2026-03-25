"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { getOrders, Order } from "@/lib/api";

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("Sign in to view your orders."));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-zinc-900">My Account</h1>
        <p className="mt-2 text-zinc-600">
          View your profile details and recent order activity.
        </p>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-900">Profile</h2>
            <div className="mt-3 space-y-1 text-sm text-zinc-700">
              <p>Name: Demo User</p>
              <p>Email: user@example.com</p>
              <p>Phone: +1 000-000-0000</p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-900">Saved Address</h2>
            <p className="mt-3 text-sm text-zinc-700">
              123 Urban Street, Central City, 00000
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-zinc-900">Recent Orders</h2>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-100 text-zinc-700">
                    <td className="py-3">#{order.id}</td>
                    <td className="py-3">{new Date(order.created_at).toISOString().slice(0, 10)}</td>
                    <td className="py-3 capitalize">{order.status}</td>
                    <td className="py-3">${order.total_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!orders.length && !error ? (
              <p className="mt-2 text-sm text-zinc-600">No orders found yet.</p>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}

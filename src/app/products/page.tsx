"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { addToBackendCart, getProducts, isLoggedIn } from "@/lib/api";
import { addItemToCart } from "@/lib/cart";
import { Product } from "@/types/store";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const queryMatch = product.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [products, query, selectedCategory]);

  async function handleAddToCart(item: Product) {
    addItemToCart(item);
    if (isLoggedIn() && item.dbId) {
      try {
        await addToBackendCart(item.dbId);
      } catch {
        // Keep local cart as fallback when backend cart fails.
      }
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold text-zinc-900">All Products</h1>
        <p className="mt-2 text-zinc-600">
          Browse our catalog and add products to your cart.
        </p>

        <div className="mt-6 grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2"
          />
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-200 focus:ring-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

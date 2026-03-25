import Link from "next/link";
import { Header } from "@/components/header";
import { getProducts } from "@/lib/api";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await getProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 px-8 py-14 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-200">
            UrbanCart Marketplace
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight">
            Shop smarter with fast delivery and trusted sellers.
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-200">
            Browse curated products, add to cart in one click, and checkout with a
            clean shopping experience.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/products"
              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
            >
              Explore products
            </Link>
            <Link
              href="/register"
              className="rounded-md border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Create account
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">Featured products</h2>
            <Link href="/products" className="text-sm font-semibold text-zinc-700">
              View all
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Product } from "@/types/store";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600">
            {product.category}
          </span>
          <span className="text-xs font-medium text-amber-600">
            {product.rating.toFixed(1)} / 5
          </span>
        </div>
        <h3 className="text-base font-semibold text-zinc-900">{product.name}</h3>
        <p className="text-sm text-zinc-600">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-zinc-900">${product.price.toFixed(2)}</p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

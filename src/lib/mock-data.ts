import { Product } from "@/types/store";

export const mockProducts: Product[] = [
  {
    _id: "p-101",
    name: "Nova X Wireless Earbuds",
    description: "Low-latency earbuds with active noise cancellation.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    stock: 16,
    rating: 4.5,
    category: "Electronics",
  },
  {
    _id: "p-102",
    name: "Urban Flex Hoodie",
    description: "Breathable cotton hoodie built for all-day comfort.",
    price: 49.0,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    stock: 22,
    rating: 4.3,
    category: "Fashion",
  },
  {
    _id: "p-103",
    name: "AeroPulse Smartwatch",
    description: "Track heart rate, sleep, and daily workouts on the go.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    stock: 10,
    rating: 4.6,
    category: "Electronics",
  },
  {
    _id: "p-104",
    name: "Glow Ritual Skincare Set",
    description: "Daily cleanser, serum, and moisturizer combo pack.",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
    stock: 28,
    rating: 4.2,
    category: "Beauty",
  },
  {
    _id: "p-105",
    name: "Stride Pro Running Shoes",
    description: "Lightweight performance shoes with high-grip outsole.",
    price: 89.5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    stock: 15,
    rating: 4.7,
    category: "Sports",
  },
  {
    _id: "p-106",
    name: "Minimal Desk Lamp",
    description: "Warm LED lamp with adjustable brightness levels.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    stock: 30,
    rating: 4.1,
    category: "Home",
  },
];

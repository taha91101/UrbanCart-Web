"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/header";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser({ email, password });
      window.location.href = "/products";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-bold text-zinc-900">Sign in</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Enter your account credentials.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold text-white"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-sm text-zinc-600">
            New customer?{" "}
            <Link href="/register" className="font-semibold text-zinc-900">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

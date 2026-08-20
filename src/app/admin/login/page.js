"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-lg font-semibold text-text-primary mb-1">
          Admin Access
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          Enter the admin password to continue.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none mb-3"
          autoFocus
        />

        {error && (
          <p className="text-xs text-accent mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-accent text-white text-sm font-medium py-3 rounded-xl"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
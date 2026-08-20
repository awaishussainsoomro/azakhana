"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const popularTags = [
  { label: "Muharram", href: "/search?munasabat=Muharram" },
  { label: "Nadeem Sarwar", href: "/search?nohakhan=Nadeem+Sarwar" },
  { label: "2026", href: "/search?year=2026" },
];

export default function Hero() {

  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border pb-10 pt-12 mb-10 text-center">
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-125 h-125 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(185,28,28,0.18) 0%, rgba(185,28,28,0) 70%)",
        }}
      />

      <div className="relative z-10">
        <p className="text-xs tracking-[0.2em] text-text-muted mb-4">
          REMEMBER · LISTEN · KEEP ALIVE
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5 text-text-primary">
          Every Noha.
          <span className="text-accent"> One place.</span>
        </h1>

        <p className="text-sm text-text-secondary mb-7 max-w-md mx-auto">
          Search, discover and listen to Nohay by Nohakhan, Munasabat and year.
        </p>

                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-surface border border-border rounded-full pl-4 sm:pl-5 pr-1 py-1 max-w-lg mx-auto shadow-lg shadow-black/40 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-text-muted shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
                    <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Nohay..."
            className="flex-1 min-w-0 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none py-3"
          />
          <button
            type="submit"
            className="bg-accent text-white text-sm font-medium px-4 sm:px-6 py-2.5 rounded-full flex-shrink-0 whitespace-nowrap"
          >
            Search
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
          <span className="text-xs text-text-muted">Popular:</span>
          {popularTags.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className="bg-surface border border-border text-text-secondary text-xs px-3 py-1 rounded-full hover:border-accent hover:text-text-primary transition-colors"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

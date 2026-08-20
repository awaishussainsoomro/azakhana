"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getYoutubeThumbnail } from "@/lib/youtube";

const filterConfig = {
  language: ["All", "Urdu", "Punjabi", "Saraiki", "Sindhi", "Arabic", "English", "Other"],
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [tag, setTag] = useState(searchParams.get("tag") || "");
  const [filters, setFilters] = useState({
    nohakhan: searchParams.get("nohakhan") || "All",
    year: searchParams.get("year") || "All",
    munasabat: searchParams.get("munasabat") || "All",
    language: searchParams.get("language") || "All",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nohakhanOptions, setNohakhanOptions] = useState(["All"]);
  const [munasabatOptions, setMunasabatOptions] = useState(["All"]);
  const [yearOptions, setYearOptions] = useState(["All"]);

  useEffect(() => {
    fetch("/api/admin/nohakhan/list")
      .then((res) => res.json())
      .then((data) =>
        setNohakhanOptions(["All", ...(data.nohakhans || []).map((n) => n.name)])
      );

    fetch("/api/admin/munasabat/list")
      .then((res) => res.json())
      .then((data) =>
        setMunasabatOptions(["All", ...(data.munasabat || []).map((m) => m.name)])
      );

    fetch("/api/years")
      .then((res) => res.json())
      .then((data) => setYearOptions(["All", ...(data.years || [])]));
  }, []);

  const runSearch = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (filters.nohakhan !== "All") params.set("nohakhan", filters.nohakhan);
    if (filters.year !== "All") params.set("year", filters.year);
    if (filters.munasabat !== "All") params.set("munasabat", filters.munasabat);
    if (filters.language !== "All") params.set("language", filters.language);
    if (tag) params.set("tag", tag);
    params.set("page", page);

    fetch(`/api/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      });
  }, [query, filters, tag, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runSearch();
    }, 400);
    return () => clearTimeout(timer);
  }, [runSearch]);


  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-full pl-4 pr-1 py-1 mb-5 max-w-lg">
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
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by title, Nohakhan, or year"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none py-2"
            autoFocus
          />
        </div>

        <div className="flex gap-2 flex-wrap mb-5">
          <select
            value={filters.nohakhan}
            onChange={(e) => handleFilterChange("nohakhan", e.target.value)}
            className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none"
          >
            {nohakhanOptions.map((opt) => (
              <option key={opt} value={opt}>Nohakhan: {opt}</option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none"
          >
            {yearOptions.map((opt) => (
              <option key={opt} value={opt}>Year: {opt}</option>
            ))}
          </select>

          <select
            value={filters.munasabat}
            onChange={(e) => handleFilterChange("munasabat", e.target.value)}
            className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none"
          >
            {munasabatOptions.map((opt) => (
              <option key={opt} value={opt}>Munasabat: {opt}</option>
            ))}
          </select>

          <select
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none"
          >
            {filterConfig.language.map((opt) => (
              <option key={opt} value={opt}>Language: {opt}</option>
            ))}
          </select>

          <input
            type="text"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by tag..."
            className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full outline-none w-32"
          />
        </div>

        <p className="text-xs text-text-muted mb-4">
          {loading ? "Searching..." : `${results.length} results`}
        </p>

        <div className="flex flex-col gap-2">
          {!loading && results.length === 0 && (
            <p className="text-sm text-text-secondary">
              No Nohay found. Try different filters.
            </p>
          )}

          {results.map((nohay) => (
            <Link
              key={nohay._id}
              href={`/nohay/${nohay.slug}`}
              className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2.5 hover:border-accent transition-colors"
            >
              <div className="w-14 h-9 rounded-lg bg-surface-tint relative overflow-hidden shrink-0">
                {getYoutubeThumbnail(nohay.youtubeUrl) && (
                  <img
                    src={getYoutubeThumbnail(nohay.youtubeUrl)}
                    alt={nohay.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {nohay.title}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {nohay.nohakhanId?.name} · {nohay.year} ·{" "}
                  {nohay.munasabatIds?.[0]?.name || "General"} · {nohay.language}
                </p>
              </div>
            </Link>
          ))}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs text-text-secondary border border-border px-4 py-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs text-text-muted">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs text-text-secondary border border-border px-4 py-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
           </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <SearchContent />
    </Suspense>
  );
}

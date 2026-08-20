"use client";
import Link from "next/link";

import { useState } from "react";
import { getYoutubeThumbnail } from "@/lib/youtube";

export default function YearAlbum({ year, nohayList, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3"
      >
        <span className="text-sm font-medium text-text-primary">
          {year}{" "}
          <span className="text-text-muted font-normal">
            ({nohayList.length} Nohay)
          </span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-accent transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 px-1">
          {nohayList.map((nohay) => (
            <Link key={nohay._id} href={`/nohay/${nohay.slug}`}>
              <div className="aspect-square rounded-lg bg-surface-tint relative overflow-hidden mb-1.5">
                {getYoutubeThumbnail(nohay.youtubeUrl) && (
                  <img
                    src={getYoutubeThumbnail(nohay.youtubeUrl)}
                    alt={nohay.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <p className="text-xs text-text-primary line-clamp-2 leading-snug min-h-[2.2em]">
                {nohay.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

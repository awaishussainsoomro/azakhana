import { getYoutubeThumbnail } from "@/lib/youtube";
import Link from "next/link";

export default function NewReleases({ nohayList }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-accent">✨</span>
          <h2 className="text-sm font-medium text-text-primary">
            New Releases
          </h2>
        </div>
        <Link href="/search" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {nohayList.map((nohay) => (
          <Link
            key={nohay._id}
            href={`/nohay/${nohay.slug}`}
            className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2.5 hover:border-accent transition-colors"
          >
            <div className="w-13 h-9 rounded-lg bg-surface-tint relative overflow-hidden flex items-center justify-center shrink-0">
              {getYoutubeThumbnail(nohay.youtubeUrl) && (
                <img
                  src={getYoutubeThumbnail(nohay.youtubeUrl)}
                  alt={nohay.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white relative z-10 drop-shadow"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {nohay.title}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {nohay.nohakhanId?.name} · {nohay.year} ·{" "}
                {nohay.munasabatIds?.[0]?.name || "General"}
              </p>
            </div>
            <span className="bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
              NEW
            </span>
          </Link>
        ))}

        {nohayList.length === 0 && (
          <p className="text-xs text-text-secondary">
            No Nohay added yet.
          </p>
        )}
      </div>
    </section>
  );
}
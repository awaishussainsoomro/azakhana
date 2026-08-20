import { getYoutubeThumbnail } from "@/lib/youtube";
import Link from "next/link";

export default function Trending({ nohayList }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-accent">🔥</span>
          <h2 className="text-sm font-medium text-text-primary">
            Trending this week
          </h2>
        </div>
        <Link href="/search" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {nohayList.map((nohay, index) => {
          const thumbnail = getYoutubeThumbnail(nohay.youtubeUrl);

          return (
            <Link key={nohay._id} href={`/nohay/${nohay.slug}`}>
              <div className="aspect-square rounded-lg bg-surface-tint relative overflow-hidden flex items-center justify-center mb-2">
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={nohay.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <span className="absolute top-2 left-2 text-lg font-bold text-white drop-shadow-lg z-10">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white relative z-10 drop-shadow-lg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-xs font-medium text-text-primary truncate">
                {nohay.title}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {nohay.nohakhanId?.name} · {nohay.year}
              </p>
            </Link>
          );
        })}

        {nohayList.length === 0 && (
          <p className="text-xs text-text-secondary col-span-full">
            No Nohay added yet.
          </p>
        )}
      </div>
    </section>
  );
}
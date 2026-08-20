import Link from "next/link";

export default function PopularNohakhans({ nohakhans }) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-text-primary">
          Popular Nohakhans
        </h2>
        <Link href="/nohakhans" className="text-xs text-text-secondary hover:text-text-primary transition-colors">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {nohakhans.map((nohakhan) => (
          <Link
            key={nohakhan._id}
            href={`/nohakhan/${nohakhan.slug}`}
            className="bg-surface border border-border rounded-xl p-3 text-center hover:border-accent transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-surface-tint mx-auto mb-2 overflow-hidden">
              {nohakhan.imageUrl && (
                <img
                  src={nohakhan.imageUrl}
                  alt={nohakhan.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-xs font-medium text-text-primary truncate">
              {nohakhan.name}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {nohakhan.nohayCount} Nohay
            </p>
          </Link>
        ))}

        {nohakhans.length === 0 && (
          <p className="text-xs text-text-secondary col-span-full">
            No Nohakhans added yet.
          </p>
        )}
      </div>
    </section>
  );
}
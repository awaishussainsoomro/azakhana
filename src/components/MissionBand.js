import Link from "next/link";

export default function MissionBand() {
  return (
    <section className="mb-6 border border-surface-tint rounded-2xl p-7 bg-linear-to-br from-bg via-bg to-surface-tint flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <p className="text-xs tracking-widest text-accent font-semibold mb-2">
          OUR MISSION
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
          Keep the message of <span className="text-accent">Karbala</span> alive.
        </h2>
        <p className="text-sm text-text-secondary max-w-sm">
          AzaKhana is a humble effort to make Nohay easily accessible for
          everyone, everywhere.
        </p>
      </div>

      <Link href="/mission" className="border border-accent text-text-primary text-sm px-5 py-2 rounded-full inline-flex items-center gap-1.5 shrink-0 self-start md:self-center">
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
}
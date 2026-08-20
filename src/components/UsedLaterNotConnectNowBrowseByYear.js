const years = [2026, 2025, 2024, 2023, 2022, 2021];

export default function BrowseByYear() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-text-primary">
          Browse by Year
        </h2>
        <span className="text-xs text-text-secondary">View all years</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {years.map((year, index) => (
          <span
            key={year}
            className={
              index === 0
                ? "bg-accent text-white text-sm font-medium px-4 py-1.5 rounded-full"
                : "bg-surface border border-border text-text-secondary text-sm px-4 py-1.5 rounded-full"
            }
          >
            {year}
          </span>
        ))}
        <span className="bg-surface border border-border text-text-muted text-sm px-4 py-1.5 rounded-full">
          More
        </span>
      </div>
    </section>
  );
}
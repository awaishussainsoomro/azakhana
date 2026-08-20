import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";
import Nohay from "@/models/Nohay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import YearAlbum from "@/components/YearAlbum";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function NohakhanPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const nohakhan = await Nohakhan.findOne({ slug }).lean();

  if (!nohakhan) {
    notFound();
  }

  const nohayEntries = await Nohay.find({ nohakhanId: nohakhan._id })
    .sort({ year: -1 })
    .lean();

  const cleanNohayEntries = JSON.parse(JSON.stringify(nohayEntries));

  const yearGroups = {};
  for (const nohay of cleanNohayEntries) {
    const year = nohay.year;
    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }
    yearGroups[year].push(nohay);
  }

  const years = Object.keys(yearGroups).sort((a, b) => b - a);

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-start gap-4 mb-8">
          <div className="w-18 h-18 rounded-full bg-surface-tint shrink-0 overflow-hidden">
            {nohakhan.imageUrl && (
              <img
                src={nohakhan.imageUrl}
                alt={nohakhan.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary mb-1">
              {nohakhan.name}
            </h1>
            <p className="text-xs text-text-secondary">
              {nohayEntries.length} Nohay
            </p>
          </div>
        </div>

        {years.length === 0 && (
          <p className="text-sm text-text-secondary">
            No Nohay added yet for this Nohakhan.
          </p>
        )}

        {years.map((year, index) => (
          <YearAlbum
            key={year}
            year={year}
            nohayList={yearGroups[year]}
            defaultOpen={index === 0}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";
import Nohay from "@/models/Nohay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 300;

export const metadata = {
  title: "Munasabat — AzaKhana",
  description: "Browse Nohay by occasion on AzaKhana.",
};

export default async function MunasabatPage() {
  await connectDB();

  const munasabatDocs = await Munasabat.find({}).sort({ createdAt: 1 }).lean();

  const counts = await Nohay.aggregate([
    { $unwind: "$munasabatIds" },
    { $group: { _id: "$munasabatIds", count: { $sum: 1 } } },
  ]);

  const countMap = {};
  for (const item of counts) {
    countMap[item._id.toString()] = item.count;
  }

  const munasabatList = JSON.parse(
    JSON.stringify(
      munasabatDocs.map((m) => ({ ...m, nohayCount: countMap[m._id.toString()] || 0 }))
    )
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <h1 className="text-xl font-bold text-text-primary mb-6">
          All Munasabat
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {munasabatList.map((munasabat) => (
            <Link
              key={munasabat._id}
              href={`/search?munasabat=${encodeURIComponent(munasabat.name)}`}
              className="bg-surface border border-border rounded-xl p-4 hover:border-accent transition-colors"
            >
              <p className="text-sm font-medium text-text-primary mb-1">
                {munasabat.name}
              </p>
              {munasabat.description && (
                <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                  {munasabat.description}
                </p>
              )}
              <p className="text-xs text-text-muted">
                {munasabat.nohayCount} Nohay
              </p>
            </Link>
          ))}

          {munasabatList.length === 0 && (
            <p className="text-xs text-text-secondary col-span-full">
              No Munasabat added yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
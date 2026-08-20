import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";
import Nohay from "@/models/Nohay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 300;

export const metadata = {
  title: "Nohakhans — AzaKhana",
  description: "Browse all Nohakhans on AzaKhana.",
};

export default async function NohakhansPage() {
  await connectDB();

  const nohakhanDocs = await Nohakhan.find({})
    .sort({ priority: -1, name: 1 })
    .lean();

  const counts = await Nohay.aggregate([
    { $group: { _id: "$nohakhanId", count: { $sum: 1 } } },
  ]);

  const countMap = {};
  for (const item of counts) {
    countMap[item._id.toString()] = item.count;
  }

  const nohakhans = JSON.parse(
    JSON.stringify(
      nohakhanDocs.map((n) => ({ ...n, nohayCount: countMap[n._id.toString()] || 0 }))
    )
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <h1 className="text-xl font-bold text-text-primary mb-6">
          All Nohakhans
        </h1>

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
      </main>
      <Footer />
    </>
  );
}
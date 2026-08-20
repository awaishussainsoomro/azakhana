import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";
import Nohay from "@/models/Nohay";
import Nohakhan from "@/models/NohaKhan";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import NewReleases from "@/components/NewReleases";
import PopularNohakhans from "@/components/PopularNohakhans";
import MissionBand from "@/components/MissionBand";
import Footer from "@/components/Footer";

export const revalidate = 60;


export default async function Home() {
  await connectDB();

  const trendingDocs = await Nohay.find({})
    .populate("nohakhanId", "name")
    .sort({ views: -1 })
    .limit(4)
    .lean();

  const newReleaseDocs = await Nohay.find({ featured: true })
    .populate("nohakhanId", "name")
    .populate("munasabatIds", "name")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const nohakhanDocs = await Nohakhan.find({})
    .sort({ priority: -1, name: 1 })
    .limit(4)
    .lean();

  const nohakhanCounts = await Nohay.aggregate([
    { $group: { _id: "$nohakhanId", count: { $sum: 1 } } },
  ]);

  const countMap = {};
  for (const item of nohakhanCounts) {
    countMap[item._id.toString()] = item.count;
  }

  const nohakhansWithCounts = nohakhanDocs.map((n) => ({
    ...n,
    nohayCount: countMap[n._id.toString()] || 0,
  }));

  const trending = JSON.parse(JSON.stringify(trendingDocs));
  const newReleases = JSON.parse(JSON.stringify(newReleaseDocs));
  const nohakhans = JSON.parse(JSON.stringify(nohakhansWithCounts));

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <Hero />
        <Trending nohayList={trending} />
        <NewReleases nohayList={newReleases} />
        <PopularNohakhans nohakhans={nohakhans} />
        <MissionBand />
      </main>
      <Footer />
    </>
  );
}
import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";
import Nohakhan from "@/models/NohaKhan";
import Munasabat from "@/models/Munasabat";
import { getYoutubeThumbnail } from "@/lib/youtube";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NohayPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const nohayDoc = await Nohay.findOne({ slug })
    .populate("nohakhanId", "name slug imageUrl")
    .populate("munasabatIds", "name")
    .lean();

  if (!nohayDoc) {
    notFound();
  }

  Nohay.findByIdAndUpdate(nohayDoc._id, { $inc: { views: 1 } }).exec();

  const nohay = JSON.parse(JSON.stringify(nohayDoc));

  const moreDocs = await Nohay.find({
    nohakhanId: nohay.nohakhanId._id,
    _id: { $ne: nohay._id },
  })
    .populate("munasabatIds", "name imageUrl")
    .limit(4)
    .lean();

  const moreFromNohakhan = JSON.parse(JSON.stringify(moreDocs));

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">
        <VideoPlayer youtubeUrl={nohay.youtubeUrl} title={nohay.title} />

        <div className="flex items-start justify-between mt-5 mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-lg font-semibold text-text-primary mb-2">
              {nohay.title}
            </h1>
            <p className="text-xs text-text-muted mb-2">
              {nohay.views} {nohay.views === 1 ? "view" : "views"}
            </p>
            <Link
              href={`/nohakhan/${nohay.nohakhanId.slug}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-6 h-6 rounded-full bg-surface-tint overflow-hidden">
                {nohay.nohakhanId.imageUrl && (
                  <img
                    src={nohay.nohakhanId.imageUrl}
                    alt={nohay.nohakhanId.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-sm text-text-secondary">
                {nohay.nohakhanId.name}
              </span>
            </Link>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full">
              {nohay.year}
            </span>
            {nohay.munasabatIds?.map((m) => (
              <span key={m._id} className="bg-surface-tint text-accent text-xs px-3 py-1.5 rounded-full">
                {m.name}
              </span>
            ))}
            <span className="bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full">
              {nohay.language}
            </span>
          </div>
        </div>

        {moreFromNohakhan.length > 0 && (
          <>
            <div className="border-t border-border pt-5 mb-3">
              <p className="text-sm font-medium text-text-secondary">
                More from {nohay.nohakhanId.name}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {moreFromNohakhan.map((item) => (
                <Link
                  key={item._id}
                  href={`/nohay/${item.slug}`}>
                  <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2.5">
                    <div className="w-13 h-9 rounded-lg bg-surface-tint relative overflow-hidden shrink-0">
                      {getYoutubeThumbnail(item.youtubeUrl) && (
                        <img
                          src={getYoutubeThumbnail(item.youtubeUrl)}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {item.year} · {item.munasabatIds?.[0]?.name || "General"}
                      </p>
                    </div>
                  </div>

                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
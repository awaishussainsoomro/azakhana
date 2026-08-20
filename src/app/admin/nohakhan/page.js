import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";
import Link from "next/link";

export default async function AdminNohakhanList() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  await connectDB();
  const nohakhanDocs = await Nohakhan.find({})
    .sort({ priority: -1, name: 1 })
    .lean();
  const nohakhans = JSON.parse(JSON.stringify(nohakhanDocs));

  return (
    <main className="min-h-screen bg-bg px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-text-primary">
          Manage Nohakhans
        </h1>
        <Link
          href="/admin/nohakhan/new"
          className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-full"
        >
          + Add New
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {nohakhans.map((nohakhan) => (
          <div
            key={nohakhan._id}
            className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3"
          >
            <div className="w-9 h-9 rounded-full bg-surface-tint overflow-hidden shrink-0">
              {nohakhan.imageUrl && (
                <img
                  src={nohakhan.imageUrl}
                  alt={nohakhan.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {nohakhan.name}
              </p>
              <p className="text-xs text-text-muted">
                Priority: {nohakhan.priority || 0}
              </p>
            </div>
            <Link
              href={`/admin/nohakhan/${nohakhan._id}/edit`}
              className="text-xs text-accent border border-accent px-3 py-1.5 rounded-full shrink-0"
            >
              Edit
            </Link>
          </div>
        ))}

        {nohakhans.length === 0 && (
          <p className="text-xs text-text-secondary">No Nohakhans added yet.</p>
        )}
      </div>
    </main>
  );
}
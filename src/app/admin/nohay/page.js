import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";
import Link from "next/link";

export default async function AdminNohayList() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        redirect("/admin/login");
    }

    await connectDB();
    const nohayDocs = await Nohay.find({})
        .populate("nohakhanId", "name")
        .sort({ createdAt: -1 })
        .lean();
    const nohayList = JSON.parse(JSON.stringify(nohayDocs));

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold text-text-primary">Manage Nohay</h1>
                <Link
                    href="/admin/nohay/new"
                    className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-full"
                >
                    + Add New
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                {nohayList.map((nohay) => (
                    <div
                        key={nohay._id}
                        className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                                {nohay.title}
                            </p>
                            <p className="text-xs text-text-muted">
                                {nohay.nohakhanId?.name} · {nohay.year}
                            </p>
                        </div>
                        <Link
                            href={`/admin/nohay/${nohay._id}/edit`}
                            className="text-xs text-accent border border-accent px-3 py-1.5 rounded-full shrink-0"
                        >
                            Edit
                        </Link>
                    </div>
                ))}

                {nohayList.length === 0 && (
                    <p className="text-xs text-text-secondary">No Nohay added yet.</p>
                )}
            </div>
        </main>
    );
}
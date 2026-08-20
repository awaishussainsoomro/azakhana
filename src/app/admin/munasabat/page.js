import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";
import Link from "next/link";

export default async function AdminMunasabatList() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        redirect("/admin/login");
    }

    await connectDB();
    const munasabatDocs = await Munasabat.find({}).sort({ createdAt: 1 }).lean();
    const munasabatList = JSON.parse(JSON.stringify(munasabatDocs));

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-lg font-semibold text-text-primary">Manage Munasabat</h1>
                <Link
                    href="/admin/munasabat/new"
                    className="bg-accent text-white text-xs font-medium px-4 py-2 rounded-full"
                >
                    + Add New
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                {munasabatList.map((m) => (
                    <div
                        key={m._id}
                        className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{m.name}</p>
                            {m.description && (
                                <p className="text-xs text-text-muted truncate">{m.description}</p>
                            )}
                        </div>
                        <Link
                            href={`/admin/munasabat/${m._id}/edit`}
                            className="text-xs text-accent border border-accent px-3 py-1.5 rounded-full shrink-0"
                        >
                            Edit
                        </Link>
                    </div>
                ))}

                {munasabatList.length === 0 && (
                    <p className="text-xs text-text-secondary">No Munasabat added yet.</p>
                )}
            </div>
        </main>
    );
}
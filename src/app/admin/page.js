import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-2xl mx-auto">
            <h1 className="text-xl font-semibold text-text-primary mb-1">
                Admin Dashboard
            </h1>
            <p className="text-sm text-text-secondary mb-8">
                Manage Nohakhans and Nohay entries.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin/nohakhan"
                    className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                >
                    <p className="text-sm font-medium text-text-primary mb-1">
                        Manage Nohakhans
                    </p>
                    <p className="text-xs text-text-secondary">
                        View, add, and edit reciters
                    </p>
                </Link>

                <Link
                    href="/admin/nohay"
                    className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                >
                    <p className="text-sm font-medium text-text-primary mb-1">
                        Manage Nohay
                    </p>
                    <p className="text-xs text-text-secondary">
                        View, add, and edit Nohay entries
                    </p>
                </Link>
                <Link
                    href="/admin/munasabat"
                    className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                >
                    <p className="text-sm font-medium text-text-primary mb-1">
                        Manage Munasabat
                    </p>
                    <p className="text-xs text-text-secondary">
                        View, add, and edit occasions
                    </p>
                </Link>
                <Link
                    href="/admin/nohay/bulk-import"
                    className="bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
                >
                    <p className="text-sm font-medium text-text-primary mb-1">
                        Bulk Import
                    </p>
                    <p className="text-xs text-text-secondary">
                        Import Nohay from a YouTube playlist
                    </p>
                </Link>
            </div>
        </main>
    );
}
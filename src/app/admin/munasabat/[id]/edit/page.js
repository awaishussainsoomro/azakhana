"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMunasabat() {
    const router = useRouter();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        fetch(`/api/admin/munasabat/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.munasabat) {
                    setName(data.munasabat.name);
                    setDescription(data.munasabat.description || "");
                }
                setLoadingData(false);
            });
    }, [params.id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch(`/api/admin/munasabat/${params.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });

        setLoading(false);

        if (res.ok) {
            router.push("/admin/munasabat");
        } else {
            const data = await res.json();
            setError(data.error || "Something went wrong");
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this Munasabat? Nohay tagged with it will keep the reference but it won't resolve. This cannot be undone.")) return;

        const res = await fetch(`/api/admin/munasabat/${params.id}`, { method: "DELETE" });
        if (res.ok) {
            router.push("/admin/munasabat");
        }
    }

    if (loadingData) {
        return (
            <main className="min-h-screen bg-bg px-6 py-10 max-w-lg mx-auto">
                <p className="text-sm text-text-secondary">Loading...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-lg mx-auto">
            <h1 className="text-lg font-semibold text-text-primary mb-6">Edit Munasabat</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none resize-none"
                    />
                </div>

                {error && <p className="text-xs text-accent">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-white text-sm font-medium py-3 rounded-xl disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-accent text-xs font-medium py-2"
                >
                    Delete this Munasabat
                </button>
            </form>
        </main>
    );
}
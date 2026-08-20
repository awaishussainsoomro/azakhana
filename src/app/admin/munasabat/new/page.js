"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function NewMunasabat() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const slug = slugify(name);

        const res = await fetch("/api/admin/munasabat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, slug, description }),
        });

        setLoading(false);

        if (res.ok) {
            router.push("/admin");
        } else {
            const data = await res.json();
            setError(data.error || "Something went wrong");
        }
    }

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-lg mx-auto">
            <h1 className="text-lg font-semibold text-text-primary mb-6">
                Add Munasabat
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. 1st Muharram"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                    {name && (
                        <p className="text-xs text-text-muted mt-1">
                            Slug: {slugify(name)}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">
                        Description (optional)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Short context about this occasion"
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
                    {loading ? "Saving..." : "Save Munasabat"}
                </button>
            </form>
        </main>
    );
}
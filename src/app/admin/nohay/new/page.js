"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}


const languages = ["Urdu", "Punjabi", "Sindhi", "Arabic", "Saraiki", "Other"];

export default function NewNohay() {
    const [nohakhans, setNohakhans] = useState([]);
    const [title, setTitle] = useState("");
    const [nohakhanId, setNohakhanId] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [munasabatList, setMunasabatList] = useState([]);
    const [selectedMunasabat, setSelectedMunasabat] = useState([]);
    function toggleMunasabat(id) {
        setSelectedMunasabat((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    }
    const [year, setYear] = useState(new Date().getFullYear());
    const [language, setLanguage] = useState("Urdu");
   const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/admin/nohakhan/list")
            .then((res) => res.json())
            .then((data) => setNohakhans(data.nohakhans || []));

        fetch("/api/admin/munasabat/list")
            .then((res) => res.json())
            .then((data) => setMunasabatList(data.munasabat || []));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const slug = slugify(title);

        const res = await fetch("/api/admin/nohay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
        title, slug, nohakhanId, youtubeUrl, munasabatIds: selectedMunasabat, year, language, tags, featured,
      }),
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
                Add Nohay
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Ya Hussain Ya Hussain"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                    {title && (
                        <p className="text-xs text-text-muted mt-1">
                            URL: /nohay/{slugify(title)}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Nohakhan</label>
                    <select
                        value={nohakhanId}
                        onChange={(e) => setNohakhanId(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    >
                        <option value="">Select a Nohakhan</option>
                        {nohakhans.map((n) => (
                            <option key={n._id} value={n._id}>{n.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">YouTube URL</label>
                    <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-text-secondary mb-1.5 block">
                            Munasabat (select one or more)
                        </label>
                        <div className="flex flex-wrap gap-2 bg-surface border border-border rounded-xl p-3">
                            {munasabatList.map((m) => {
                                const isSelected = selectedMunasabat.includes(m._id);
                                return (
                                    <button
                                        key={m._id}
                                        type="button"
                                        onClick={() => toggleMunasabat(m._id)}
                                        className={
                                            isSelected
                                                ? "bg-accent text-white text-xs px-3 py-1.5 rounded-full"
                                                : "bg-bg border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full"
                                        }
                                    >
                                        {m.name}
                                    </button>
                                );
                            })}
                            {munasabatList.length === 0 && (
                                <p className="text-xs text-text-muted">No Munasabat available yet.</p>
                            )}
                        </div>
                        {selectedMunasabat.length === 0 && (
                            <p className="text-xs text-accent mt-1">Select at least one</p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs text-text-secondary mb-1.5 block">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Language</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                    >
                        {languages.map((l) => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">
                        Tags (comma-separated, optional)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Karbala, Zainab, Shahadat"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                    />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-text-secondary">
            Show in New Releases
          </span>
        </label>

                {error && <p className="text-xs text-accent">{error}</p>}

               
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-accent text-white text-sm font-medium py-3 rounded-xl disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Nohay"}
                </button>
            </form>
        </main>
    );
}
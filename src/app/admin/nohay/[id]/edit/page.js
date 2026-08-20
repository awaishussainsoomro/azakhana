"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const munasabatCategories = [
    "1st Muharram", "2nd Muharram", "3rd Muharram", "4th Muharram",
    "5th Muharram", "6th Muharram", "7th Muharram", "8th Muharram",
    "9th Muharram", "10th Muharram", "11th Muharram", "13th Muharram",
    "25th Muharram", "General",
];

const languages = ["Urdu", "Punjabi", "Saraiki", "Sindhi", "Arabic", "English", "Other"];

export default function EditNohay() {
    const router = useRouter();
    const params = useParams();

    const [nohakhans, setNohakhans] = useState([]);
    const [munasabatList, setMunasabatList] = useState([]);
    const [title, setTitle] = useState("");
    const [nohakhanId, setNohakhanId] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [selectedMunasabat, setSelectedMunasabat] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [language, setLanguage] = useState("Urdu");
    const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    function toggleMunasabat(id) {
        setSelectedMunasabat((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    }

    useEffect(() => {
        fetch("/api/admin/nohakhan/list")
            .then((res) => res.json())
            .then((data) => setNohakhans(data.nohakhans || []));

        fetch("/api/admin/munasabat/list")
            .then((res) => res.json())
            .then((data) => setMunasabatList(data.munasabat || []));

        fetch(`/api/admin/nohay/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.nohay) {
                    setTitle(data.nohay.title);
                    setNohakhanId(data.nohay.nohakhanId);
                    setYoutubeUrl(data.nohay.youtubeUrl);
                    setSelectedMunasabat(data.nohay.munasabatIds || []);
                    setYear(data.nohay.year);
                    setLanguage(data.nohay.language);
                    setTags((data.nohay.tags || []).join(", "));
          setFeatured(data.nohay.featured || false);
        }
        setLoadingData(false);
            });
    }, [params.id]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await fetch(`/api/admin/nohay/${params.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                nohakhanId,
                youtubeUrl,
                munasabatIds: selectedMunasabat,
                year: Number(year),
                language,
                tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        featured,
      }),
        });

        setLoading(false);

        if (res.ok) {
            router.push("/admin/nohay");
        } else {
            const data = await res.json();
            setError(data.error || "Something went wrong");
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this Nohay permanently? This cannot be undone.")) return;

        const res = await fetch(`/api/admin/nohay/${params.id}`, { method: "DELETE" });
        if (res.ok) {
            router.push("/admin/nohay");
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
            <h1 className="text-lg font-semibold text-text-primary mb-6">Edit Nohay</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Nohakhan</label>
                    <select
                        value={nohakhanId}
                        onChange={(e) => setNohakhanId(e.target.value)}
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    >
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
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        required
                    />
                </div>

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
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
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
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="text-accent text-xs font-medium py-2"
                >
                    Delete this Nohay
                </button>
            </form>
        </main>
    );
}
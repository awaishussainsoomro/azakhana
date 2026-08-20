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

const languages = ["Urdu", "Punjabi", "Saraiki", "Sindhi", "Arabic", "English", "Other"];

export default function BulkImport() {
    const router = useRouter();

    const [playlistUrl, setPlaylistUrl] = useState("");
    const [fetching, setFetching] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [videos, setVideos] = useState([]);
    const [selected, setSelected] = useState({});

    const [nohakhans, setNohakhans] = useState([]);
    const [munasabatList, setMunasabatList] = useState([]);
    const [nohakhanId, setNohakhanId] = useState("");
    const [selectedMunasabat, setSelectedMunasabat] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [language, setLanguage] = useState("Urdu");

    const [saving, setSaving] = useState(false);
    const [saveResult, setSaveResult] = useState(null);

    useEffect(() => {
        fetch("/api/admin/nohakhan/list")
            .then((res) => res.json())
            .then((data) => setNohakhans(data.nohakhans || []));

        fetch("/api/admin/munasabat/list")
            .then((res) => res.json())
            .then((data) => setMunasabatList(data.munasabat || []));
    }, []);

    function toggleMunasabat(id) {
        setSelectedMunasabat((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    }

    async function handleFetchPlaylist() {
        setFetchError("");
        setFetching(true);
        setVideos([]);

        const res = await fetch(
            `/api/admin/youtube-playlist?url=${encodeURIComponent(playlistUrl)}`
        );
        const data = await res.json();

        setFetching(false);

        if (res.ok) {
            setVideos(data.videos);
            const initialSelected = {};
            data.videos.forEach((v) => (initialSelected[v.videoId] = true));
            setSelected(initialSelected);
        } else {
            setFetchError(data.error || "Failed to fetch playlist");
        }
    }

    function toggleVideo(videoId) {
        setSelected((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
    }

    async function handleBulkSave() {
        if (!nohakhanId || selectedMunasabat.length === 0) {
            setFetchError("Select a Nohakhan and at least one Munasabat before saving");
            return;
        }

        setSaving(true);
        setSaveResult(null);

        const videosToSave = videos.filter((v) => selected[v.videoId]);
        let successCount = 0;
        let failCount = 0;

        for (const video of videosToSave) {
            const res = await fetch("/api/admin/nohay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: video.title,
                    slug: slugify(video.title),
                    nohakhanId,
                    youtubeUrl: video.youtubeUrl,
                    munasabatIds: selectedMunasabat,
                    year: Number(year),
                    language,
                    tags: "",
                    featured: false,
                }),
            });

            if (res.ok) {
                successCount++;
            } else {
                failCount++;
            }
        }

        setSaving(false);
        setSaveResult({ successCount, failCount });
    }

    return (
        <main className="min-h-screen bg-bg px-6 py-10 max-w-2xl mx-auto">
            <h1 className="text-lg font-semibold text-text-primary mb-6">
                Bulk Import from YouTube Playlist
            </h1>

            <div className="flex flex-col gap-4 mb-8">
                <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">
                        Playlist URL
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={playlistUrl}
                            onChange={(e) => setPlaylistUrl(e.target.value)}
                            placeholder="https://youtube.com/playlist?list=..."
                            className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                        />
                        <button
                            onClick={handleFetchPlaylist}
                            disabled={fetching || !playlistUrl}
                            className="bg-accent text-white text-sm font-medium px-5 rounded-xl disabled:opacity-50"
                        >
                            {fetching ? "Fetching..." : "Fetch"}
                        </button>
                    </div>
                    {fetchError && <p className="text-xs text-accent mt-2">{fetchError}</p>}
                </div>
            </div>

            {videos.length > 0 && (
                <>
                    <div className="bg-surface border border-border rounded-xl p-5 mb-5">
                        <p className="text-sm font-medium text-text-primary mb-4">
                            Shared details for all selected videos
                        </p>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs text-text-secondary mb-1.5 block">Nohakhan</label>
                                <select
                                    value={nohakhanId}
                                    onChange={(e) => setNohakhanId(e.target.value)}
                                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                                >
                                    <option value="">Select a Nohakhan</option>
                                    {nohakhans.map((n) => (
                                        <option key={n._id} value={n._id}>{n.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-text-secondary mb-1.5 block">
                                    Munasabat (select one or more)
                                </label>
                                <div className="flex flex-wrap gap-2 bg-bg border border-border rounded-xl p-3">
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
                                                        : "bg-surface border border-border text-text-secondary text-xs px-3 py-1.5 rounded-full"
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
                                        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-text-secondary mb-1.5 block">Language</label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
                                    >
                                        {languages.map((l) => (
                                            <option key={l} value={l}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-text-secondary mb-3">
                        {Object.values(selected).filter(Boolean).length} of {videos.length} videos selected
                    </p>

                    <div className="flex flex-col gap-2 mb-6 max-h-96 overflow-y-auto">
                        {videos.map((video) => (
                            <label
                                key={video.videoId}
                                className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-2.5 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected[video.videoId] || false}
                                    onChange={() => toggleVideo(video.videoId)}
                                    className="w-4 h-4 accent-accent shrink-0"
                                />
                                <span className="text-sm text-text-primary truncate">{video.title}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={handleBulkSave}
                        disabled={saving}
                        className="w-full bg-accent text-white text-sm font-medium py-3 rounded-xl disabled:opacity-50"
                    >
                        {saving ? "Saving..." : `Save ${Object.values(selected).filter(Boolean).length} Nohay`}
                    </button>

                    {saveResult && (
                        <div className="mt-4 text-center">
                            <p className="text-sm text-text-primary">
                                {saveResult.successCount} saved successfully
                                {saveResult.failCount > 0 && `, ${saveResult.failCount} failed (likely duplicate titles)`}
                            </p>
                            <button
                                onClick={() => router.push("/admin/nohay")}
                                className="text-xs text-accent mt-2"
                            >
                                View Manage Nohay →
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
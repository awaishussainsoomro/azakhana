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

export default function NewNohakhan() {
  const [name, setName] = useState("");
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priority, setPriority] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const slug = slugify(name);

    const res = await fetch("/api/admin/nohakhan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug, youtubeChannel, imageUrl, priority }),
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
        Add Nohakhan
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
            placeholder="e.g. Nadeem Sarwar"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
            required
          />
          {name && (
            <p className="text-xs text-text-muted mt-1">
              URL: /nohakhan/{slugify(name)}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs text-text-secondary mb-1.5 block">
            YouTube Channel (optional)
          </label>
          <input
            type="text"
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
            placeholder="https://youtube.com/@..."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-text-secondary mb-1.5 block">
            Photo URL (optional)
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover mt-2 border border-border"
            />
          )}
        </div>

        {error && <p className="text-xs text-accent">{error}</p>}

        <div>
          <label className="text-xs text-text-secondary mb-1.5 block">
            Priority (higher shows first)
          </label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            placeholder="0"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white text-sm font-medium py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Nohakhan"}
        </button>
      </form>
    </main>
  );
}
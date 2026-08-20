"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditNohakhan() {
  const router = useRouter();
  const params = useParams();
  const [name, setName] = useState("");
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priority, setPriority] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/nohakhan/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.nohakhan) {
          setName(data.nohakhan.name);
          setYoutubeChannel(data.nohakhan.youtubeChannel || "");
          setImageUrl(data.nohakhan.imageUrl || "");
          setPriority(data.nohakhan.priority || 0);
        }
        setLoadingData(false);
      });
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/admin/nohakhan/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, youtubeChannel, imageUrl, priority: Number(priority) }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
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
      <h1 className="text-lg font-semibold text-text-primary mb-6">
        Edit Nohakhan
      </h1>

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
          <label className="text-xs text-text-secondary mb-1.5 block">
            YouTube Channel
          </label>
          <input
            type="text"
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary mb-1.5 block">
            Photo URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary mb-1.5 block">
            Priority (higher shows first)
          </label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none"
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
      </form>
    </main>
  );
}
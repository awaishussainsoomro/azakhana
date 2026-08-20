"use client";

import { useEffect, useRef, useState, useId } from "react";
import { getYoutubeId } from "@/lib/youtube";

export default function VideoPlayer({ youtubeUrl, title }) {
  const videoId = getYoutubeId(youtubeUrl);
  const playerRef = useRef(null);
  const reactId = useId();
  const containerId = `yt-player-${reactId.replace(/:/g, "")}`;
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!videoId) return;

    function createPlayer() {
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setEnded(true);
            }
            if (event.data === window.YT.PlayerState.PLAYING) {
              setEnded(false);
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, containerId]);

  function handleReplay() {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setEnded(false);
    }
  }

  if (!videoId) {
    return (
      <div className="aspect-video rounded-2xl bg-surface-tint flex items-center justify-center">
        <p className="text-sm text-text-muted">Invalid video link</p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-2xl overflow-hidden border border-border relative">
      <div id={containerId} className="w-full h-full" />

      {ended && (
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-sm text-text-secondary">You&apos;ve finished</p>
          <p className="text-base font-medium text-text-primary">{title}</p>
          <button
            onClick={handleReplay}
            className="bg-accent text-white text-sm font-medium px-6 py-2.5 rounded-full flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Replay
          </button>
          <p className="text-xs text-text-muted">Scroll down for more from this Nohakhan</p>
        </div>
      )}
    </div>
  );
}
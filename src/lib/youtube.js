export function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getYoutubeThumbnail(url) {
  const videoId = getYoutubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}
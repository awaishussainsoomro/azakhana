import { cookies } from "next/headers";

function getPlaylistId(url) {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

export async function GET(request) {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const playlistUrl = searchParams.get("url");
    const playlistId = getPlaylistId(playlistUrl);

    if (!playlistId) {
        return Response.json({ error: "Invalid playlist URL" }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    let videos = [];
    let nextPageToken = "";

    try {
        do {
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&pageToken=${nextPageToken}&key=${apiKey}`
            );
            const data = await res.json();

            if (data.error) {
                return Response.json({ error: data.error.message }, { status: 400 });
            }

            const items = (data.items || []).map((item) => ({
                title: item.snippet.title,
                videoId: item.snippet.resourceId.videoId,
                youtubeUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
            }));

            videos = [...videos, ...items];
            nextPageToken = data.nextPageToken || "";
        } while (nextPageToken);

        videos = videos.filter((v) => v.title !== "Private video" && v.title !== "Deleted video");

        return Response.json({ videos });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
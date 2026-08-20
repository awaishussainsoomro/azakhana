import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";

export async function POST(request) {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, youtubeChannel, imageUrl, priority } = await request.json();

    if (!name || !slug) {
        return Response.json(
            { error: "Name and slug are required" },
            { status: 400 }
        );
    }

    try {
        await connectDB();
        const nohakhan = await Nohakhan.create({
            name,
            slug,
            youtubeChannel,
            imageUrl,
            priority: priority ? Number(priority) : 0,
        });
        return Response.json({ success: true, nohakhan });
    } catch (error) {
        if (error.code === 11000) {
            return Response.json({ error: "That name or slug already exists" }, { status: 400 });
        }
        return Response.json({ error: error.message }, { status: 500 });
    }
}
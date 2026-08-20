import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";

export async function POST(request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, nohakhanId, youtubeUrl, munasabatIds, year, language, tags, featured } = body;

  if (!title || !slug || !nohakhanId || !youtubeUrl || !munasabatIds || munasabatIds.length === 0 || !year) {
    return Response.json(
      { error: "Title, slug, Nohakhan, YouTube URL, and year are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const nohay = await Nohay.create({
      title,
      slug,
      nohakhanId,
      youtubeUrl,
      munasabatIds,
      year,
      language,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      featured: Boolean(featured),
    });
    return Response.json({ success: true, nohay });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "That name or slug already exists" }, { status: 400 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
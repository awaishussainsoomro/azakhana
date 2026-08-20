import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";

export async function POST(request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, slug, description } = await request.json();

  if (!name || !slug) {
    return Response.json({ error: "Name and slug are required" }, { status: 400 });
  }

  try {
    await connectDB();
    const munasabat = await Munasabat.create({ name, slug, description });
    return Response.json({ success: true, munasabat });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
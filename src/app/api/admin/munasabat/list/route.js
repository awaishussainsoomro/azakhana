import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const munasabat = await Munasabat.find({}, "name slug").sort({ createdAt: 1 });
  return Response.json({ munasabat });
}
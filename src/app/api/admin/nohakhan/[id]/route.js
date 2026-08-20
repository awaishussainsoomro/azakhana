import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";

export async function GET(request, { params }) {
  const { id } = await params;
  await connectDB();
  const nohakhan = await Nohakhan.findById(id).lean();
  return Response.json({ nohakhan: JSON.parse(JSON.stringify(nohakhan)) });
}

export async function PATCH(request, { params }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    await connectDB();
    const nohakhan = await Nohakhan.findByIdAndUpdate(id, body, { new: true });
    return Response.json({ success: true, nohakhan });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
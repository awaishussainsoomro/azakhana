import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";

export async function GET() {
  await connectDB();
  const nohakhans = await Nohakhan.find({}, "name slug").sort({ name: 1 });
  return Response.json({ nohakhans });
}
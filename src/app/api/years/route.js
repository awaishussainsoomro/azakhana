import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";

export async function GET() {
    await connectDB();
    const years = await Nohay.distinct("year");
    const sorted = years.sort((a, b) => b - a);
    return Response.json({ years: sorted });
}
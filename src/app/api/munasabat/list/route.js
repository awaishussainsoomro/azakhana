import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";

export async function GET() {
    await connectDB();
    const munasabat = await Munasabat.find({}, "name slug").sort({ createdAt: 1 });
    return Response.json({ munasabat });
}
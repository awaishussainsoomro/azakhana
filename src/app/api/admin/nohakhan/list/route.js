import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Nohakhan from "@/models/NohaKhan";

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const nohakhans = await Nohakhan.find({}, "name slug").sort({ name: 1 });
    return Response.json({ nohakhans });
}
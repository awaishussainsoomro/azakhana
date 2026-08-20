import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";

export async function GET(request, { params }) {
    const { id } = await params;
    await connectDB();
    const nohay = await Nohay.findById(id).lean();
    return Response.json({ nohay: JSON.parse(JSON.stringify(nohay)) });
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
        const nohay = await Nohay.findByIdAndUpdate(id, body, { new: true });
        return Response.json({ success: true, nohay });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== process.env.ADMIN_PASSWORD) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await connectDB();
        await Nohay.findByIdAndDelete(id);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
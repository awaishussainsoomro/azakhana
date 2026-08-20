import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Munasabat from "@/models/Munasabat";

export async function GET(request, { params }) {
    const { id } = await params;
    await connectDB();
    const munasabat = await Munasabat.findById(id).lean();
    return Response.json({ munasabat: JSON.parse(JSON.stringify(munasabat)) });
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
        const munasabat = await Munasabat.findByIdAndUpdate(id, body, { new: true });
        return Response.json({ success: true, munasabat });
    } catch (error) {
        if (error.code === 11000) {
            return Response.json({ error: "That name already exists" }, { status: 400 });
        }
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
        await Munasabat.findByIdAndDelete(id);
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
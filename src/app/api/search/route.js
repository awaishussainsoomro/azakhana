import { connectDB } from "@/lib/db";
import Nohay from "@/models/Nohay";
import Nohakhan from "@/models/NohaKhan";
import Munasabat from "@/models/Munasabat";

export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const year = searchParams.get("year");
    const munasabat = searchParams.get("munasabat");
    const language = searchParams.get("language");
    const nohakhan = searchParams.get("nohakhan");
    const tag = searchParams.get("tag");

    const filter = {};

    if (q) {
        const matchingNohakhans = await Nohakhan.find({
            name: { $regex: q, $options: "i" },
        }).select("_id");

        const nohakhanIds = matchingNohakhans.map((n) => n._id);

        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { nohakhanId: { $in: nohakhanIds } },
        ];
    }
    if (year && year !== "All") {
        filter.year = Number(year);
    }
    if (language && language !== "All") {
        filter.language = language;
    }
    if (tag) {
        filter.tags = { $regex: tag, $options: "i" };
    }

    if (munasabat && munasabat !== "All") {
        const munasabatDoc = await Munasabat.findOne({ name: munasabat });
        if (munasabatDoc) {
            filter.munasabatIds = munasabatDoc._id;
        }
    }

    if (nohakhan && nohakhan !== "All") {
        const nohakhanDoc = await Nohakhan.findOne({ name: nohakhan });
        if (nohakhanDoc) {
            filter.nohakhanId = nohakhanDoc._id;
        }
    }

    const page = Number(searchParams.get("page")) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const totalCount = await Nohay.countDocuments(filter);

    const results = await Nohay.find(filter)
        .populate("nohakhanId", "name slug")
        .populate("munasabatIds", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    return Response.json({
        results: JSON.parse(JSON.stringify(results)),
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
    });
}
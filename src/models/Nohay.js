import mongoose from "mongoose";

const NohaySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        nohakhanId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nohakhan",
            required: true,
        },
        youtubeUrl: {
            type: String,
            required: true,
        },
        munasabatIds: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Munasabat",
            required: true,
            validate: {
                validator: (arr) => arr.length > 0,
                message: "At least one Munasabat is required",
            },
        },
        year: {
            type: Number,
            required: true,
        },
        language: {
            type: String,
            enum: ["Urdu", "Punjabi", "Sindhi", "Arabic", "Saraiki", "Other"],
            default: "Urdu",
        },
        tags: {
            type: [String],
            default: [],
        },
        views: {
            type: Number,
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

NohaySchema.index({ year: 1, nohakhanId: 1 });
NohaySchema.index({ munasabatIds: 1, year: 1 });
NohaySchema.index({ views: -1 });
NohaySchema.index({ featured: 1, createdAt: -1 });

export default mongoose.models.Nohay || mongoose.model("Nohay", NohaySchema);
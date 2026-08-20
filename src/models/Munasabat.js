import mongoose from "mongoose";

const MunasabatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Munasabat || mongoose.model("Munasabat", MunasabatSchema);
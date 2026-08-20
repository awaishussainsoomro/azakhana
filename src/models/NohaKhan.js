import mongoose from "mongoose";

const NohakhanSchema = new mongoose.Schema(
  {
    name: {
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
    imageUrl: {
      type: String,
      default: "",
    },
    youtubeChannel: {
      type: String,
      default: "",
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Nohakhan || mongoose.model("Nohakhan", NohakhanSchema);
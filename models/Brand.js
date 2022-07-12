import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: false, trim: true },
  imageUrl: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("brand", brandSchema);

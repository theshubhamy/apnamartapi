import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: false },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("category", categorySchema);

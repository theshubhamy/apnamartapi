import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: false },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("brand", brandSchema);

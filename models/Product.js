import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  specifications: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  discount: { type: Number, required: true },
  sellingPrice: {
    type: Number,
    required: true,
  },
  imageUrl: { type: String, required: true },
  brand: Object,
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },

  ratings: {
    type: Number,
    default: 0,
  },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isDealofTheDay: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", productSchema);
export default Product;

import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    orderedProduct: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "Product",
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        sellingPrice: { type: Number, required: true },
      },
    ],
    shippingAddress: Object,
    razorpay: {
      paymentId: { type: String },
      orderId: { type: String },
      signature: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
      reruired: true,
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
      required: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otp: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  token: { type: String, required: false },
  refreshToken: { type: String, required: false },
  otpExpiryDate: { type: Date, required: false },
  address: [
    {
      street: String,
      landmark: String,
      pinCode: String,
      city: String,
      state: String,
      country: String,
      pinCode: String,
    },
  ],
});

export default mongoose.model("user", userSchema);

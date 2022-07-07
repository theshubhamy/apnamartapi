import bcrypt from "bcryptjs";
//models
import User from "../../../models/user.js";
//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
import { generateOTP } from "../../../helpers/generate-otp.js";
import { sendOtp } from "../../../helpers/emailSendOtp.js";

export const adminSignupPhone = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, phone, password } = req.body;
  const otp = Number.parseInt(generateOTP(6));
  try {
    const existingAdmin = await User.findOne({
      email,
      isAdmin: true,
    });
    if (existingAdmin) {
      const error = new Error("Admin with this email already exists !");
      error.statusCode = 401;
      return next(error);
    } else {
      const encryptedPassword = await bcrypt.hash(password, 12);
      const otpExpiryDate = Date.now() + 3600000;
      const admin = new User({
        name: name,
        email: email,
        phone: phone,
        password: encryptedPassword,
        otp: otp,
        isAdmin: true,
        otpExpiryDate: otpExpiryDate,
      });
      await admin.save();
      await sendOtp(name, email, otp);
      res.status(201).json({
        msg: `Admin registered! OTP sent to ${email}`,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

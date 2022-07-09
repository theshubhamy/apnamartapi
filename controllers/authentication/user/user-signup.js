import bcrypt from "bcryptjs";
//models
import User from "../../../models/User.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";
import { generateOTP } from "../../../helpers/generate-otp.js";
import { sendOtp } from "../../../helpers/emailSendOtp.js";

export const userSignup = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, email, phone, password } = req.body;
  const otp = Number.parseInt(generateOTP(6));

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 401;
      return next(error);
    } else {
      const encryptedPassword = await bcrypt.hash(password, 12);
      const otpExpiryDate = Date.now() + 3600000;
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: encryptedPassword,
        otp: otp,
        otpExpiryDate: otpExpiryDate,
        isAdmin: false,
      });
      await user.save();
      await sendOtp(name, email, otp);
      res.status(201).json({
        msg: `User registered! OTP sent to ${email}`,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

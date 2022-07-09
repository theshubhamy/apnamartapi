//models
import User from "../../../models/User.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminSignupVerification = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, otp } = req.body;

  try {
    const admin = await User.findOne({
      email: email,
      otp: otp,
      otpExpiryDate: { $gt: Date.now() },
      isAdmin: true,
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }

    admin.isVerified = true;
    admin.otp = undefined;
    admin.otpExpiryDate = undefined;
    await admin.save();
    res.status(201).json({
      msg: `Your eamil ${email} verified successfully😊`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

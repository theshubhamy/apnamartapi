//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userSignupVerification = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email: email,
      otp: otp,
      otpExpiryDate: { $gt: Date.now() },
      isAdmin: false,
    });
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      return next(error);
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiryDate = undefined;
    await user.save();
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

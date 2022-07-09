//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../../models/User.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const userLoginEmail = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      isAdmin: false,
      isVerified: true,
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, user.password);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    }

    const id = user._id.toString();
    const name = user.name;
    const phone = user.phone;
    const token = jwt.sign(
      { id, email, phone, name },
      process.env.TOKEN_SIGNING_KEY,
      {
        expiresIn: "24h",
      }
    );
    const refreshToken = jwt.sign(
      { id, phone, email, name },
      process.env.REFRESH_TOKEN_SIGNING_KEY,
      { expiresIn: "24h" }
    );
    user.token = token;
    user.refreshToken = refreshToken;
    user.isActive = true;
    await user.save();
    res.status(201).json({
      msg: `Login with email Successful😊`,
      user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

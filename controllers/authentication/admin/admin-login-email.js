//packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//models
import User from "../../../models/user.js";

//helpers
import { validationErrorHandler } from "../../../helpers/validation-error-handler.js";

export const adminLoginEmail = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { email, password } = req.body;
 
  try {
    const admin = await User.findOne({
      email,
      isAdmin: true,
      isVerified: true,
    });
    if (!admin) {
      const error = new Error("Admin not found");
      error.statusCode = 404;
      return next(error);
    }
    const isPwdEqual = await bcrypt.compare(password, admin.password);
    if (!isPwdEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      return next(error);
    } else {
      const id = admin._id.toString();
      const name = admin.name;
      const phone = admin.phone;
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
      admin.token = token;
      admin.refreshToken = refreshToken;
      admin.isActive = true;
      await admin.save();
      res.status(201).json({
        msg: `Login with email Successful😊`,
        admin,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

import User from "../../models/User.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const fillUserAddress = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { streetAddress, city, state, country, zip } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const address = { streetAddress, city, state, country, zip };
    user.address = address;
    await user.save();
    return res.status(200).json({
      message: "User address filled successfully",
      address: user.address,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

import User from "../../models/User.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      msg: `Users fetched successfully`,
      users,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

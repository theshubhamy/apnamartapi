import Category from "../../models/Category.js";
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      isActive: true,
      isDeleted: false,
    });
    res.status(200).json({
      msg: "Categories fetched successfully",
      categories,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

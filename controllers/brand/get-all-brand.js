import Brand from "../../models/Brand.js";
export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({
      isActive: true,
      isDeleted: false,
    });
    res.status(200).json({
      msg: "Brands fetched successfully",
      brands,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

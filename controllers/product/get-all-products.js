import Product from "../../models/Product.js";
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      const error = new Error("Products not found");
      error.statusCode = 404;
      return next(error);
    } else {
      res.status(200).json({
        success: true,
        products,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

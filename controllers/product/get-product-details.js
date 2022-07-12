import Product from "../../models/Product.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const getProductDetails = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const slug = req.params.slug;
    const product = await Product.find({ slug });
    if (!product) {
      const error = new Error("Product Details not found");
      error.statusCode = 404;
      return next(error);
    } else {
      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

import Product from "../../models/Product.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const getProductById = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const _id = req.params._id;
    const product = await Product.findById(_id);
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

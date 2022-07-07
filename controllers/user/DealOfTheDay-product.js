//models
import Product from "../../models/product.js";

//helpers
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const DealOfTheDayProduct = async (req, res, next) => {
  validationErrorHandler(req, next);

  try {
    const products = await Product.findAll({
      where: {
        isActive: true,
        isDealOfTheDay: true,
      },
    });

    res.status(200).json({
      message: "Deal of the Day Products fetched successfully",
      products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

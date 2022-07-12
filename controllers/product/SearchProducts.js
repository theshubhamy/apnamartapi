import Product from "../../models/Product.js";
import SearchFeatures from "../../helpers/searchFeatures.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const SearchProducts = async (req, res, next) => {
  validationErrorHandler(req, next);
  try {
    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    const searchFeature = new SearchFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

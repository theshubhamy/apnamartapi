import Product from "../../models/Product.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const CreateProduct = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    name,
    description,
    highlights,
    specifications,
    price,
    discount,
    brandName,
    category,
    ratings,
    stock,
  } = req.body;
  console.log(req);
  try {
    if (!req.files.image) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      return next(error);
    }
    if (!req.files.icon) {
      const error = new Error("No icon provided");
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.files.image[0].path;
    const brandUrl = req.files.icon[0].path;

    const slug = name.toLowerCase().replace(/ /g, "-");
    const sellingPrice = price - (price * discount) / 100;
    const product = new Product({
      user: req.userId,
      name: name,
      description: description,
      slug: slug,
      highlights: highlights,
      specifications: specifications,
      price: price,
      discount: discount,
      sellingPrice: sellingPrice,
      imageUrl: imageUrl,
      brand: {
        brandName: brandName,
        brandUrl: brandUrl,
      },
      category: category,
      ratings: ratings,
      stock: stock,
    });
    await product.save();
    res.status(201).json({
      success: true,
      msg: "Product created successfully",
      product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

import Brand from "../../models/Brand.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
import { clearImage } from "../../helpers/clear-image.js";
export const CreateBrand = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, description } = req.body;
  try {
    if (!req.files.image) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.files.image[0].path;
    const preExistingBrand = await Brand.findOne({
      name,
    });
    if (preExistingBrand) {
      clearImage(imageUrl);
      const error = new Error("Brand Already Exists");
      error.statusCode = 403;
      return next(error);
    }
    const brand = new Brand({
      user: req.userId,
      name,
      description,
      imageUrl,
      isActive: true,
    });

    await brand.save();
    res.status(201).json({
      msg: `Brand ${name} created successfully`,
      brand,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

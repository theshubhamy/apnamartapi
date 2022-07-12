import Category from "../../models/Category.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
import { clearImage } from "../../helpers/clear-image.js";
export const CreateCategory = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { name, description } = req.body;
  try {
    if (!req.files.image) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      return next(error);
    }
    const imageUrl = req.files.image[0].path;
    const preExistingCategory = await Category.findOne({
      name,
    });
    if (preExistingCategory) {
      clearImage(imageUrl);
      const error = new Error("Category Already Exists");
      error.statusCode = 403;
      return next(error);
    }
    const category = new Category({
      user: req.userId,
      name,
      description,
      imageUrl,
      isActive: true,
    });

    await category.save();
    res.status(201).json({
      msg: `Category ${name} created successfully`,
      category,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

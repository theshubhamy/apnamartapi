import express from "express";
import { body } from "express-validator";
import { isAdministrator } from "../middleware/is-administrator.js";
//controllers
import { CreateProduct } from "../controllers/product/Create-Product.js";

const router = express.Router();

router.post(
  "/create-product",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("name is required"),
    body("price")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
    body("highlights")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Highlights is required"),
    body("specifications")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("specifications is required"),
    body("discount")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Should be in a Decimal format"),
    body("brandName")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("BrandName is required"),
    body("category")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Category is required"),
    body("ratings")
      .isNumeric()
      .not()
      .isEmpty()
      .withMessage("Ratings is required"),
    body("stock").trim().isInt().withMessage("Stock must be an integer"),
  ],
  CreateProduct
);

export default router;

import express from "express";
import { isUser } from "../middleware/is-user.js";
import { body } from "express-validator";
//controllers
import { getAllProducts } from "../controllers/product/get-all-products.js";
import { getProductDetails } from "../controllers/product/get-product-details.js";
import { SearchProducts } from "../controllers/product/SearchProducts.js";
import { getProductById } from "../controllers/product/get-product-byId.js";
import { getAllCategories } from "../controllers/category/get-all-categories.js";
import { getAllBrands } from "../controllers/brand/get-all-brand.js";
import { fillUserAddress } from "../controllers/users/fill-User-Address.js";
const router = express.Router();

router.get("/get-all-products", getAllProducts);
router.get("/get-product-details/:slug", getProductDetails);
router.get("/get-product-byid/:_id", getProductById);
router.get("/search-products", SearchProducts);
router.get("/get-all-categories", getAllCategories);
router.get("/get-all-brands", getAllBrands);
router.put(
  "/fill-user-address",
  isUser,
  [
    body("streetAddress")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("streetAddress is required"),
    body("city")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("city is required"),
    body("state")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("state is required"),
    body("country")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("country is required"),
    body("zip").not().isEmpty().trim().escape().withMessage("zip is required"),
  ],
  fillUserAddress
);

export default router;

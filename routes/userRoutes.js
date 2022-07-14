import express from "express";

//controllers
import { getAllProducts } from "../controllers/product/get-all-products.js";
import { getProductDetails } from "../controllers/product/get-product-details.js";
import { SearchProducts } from "../controllers/product/SearchProducts.js";
import { getProductById } from "../controllers/product/get-product-byId.js";
import { getAllCategories } from "../controllers/category/get-all-categories.js";
import { getAllBrands } from "../controllers/brand/get-all-brand.js";
const router = express.Router();

router.get("/get-all-products", getAllProducts);
router.get("/get-product-details/:slug", getProductDetails);
router.get("/get-product-byid/:_id", getProductById);
router.get("/search-products", SearchProducts);
router.get("/get-all-categories", getAllCategories);
router.get("/get-all-brands", getAllBrands);

export default router;

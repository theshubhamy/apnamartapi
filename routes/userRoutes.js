import express from "express";

//controllers
import { getAllProducts } from "../controllers/product/get-all-products.js";
import { getProductDetails } from "../controllers/product/get-product-details.js";
import { SearchProducts } from "../controllers/product/SearchProducts.js";
const router = express.Router();

router.get("/get-all-products", getAllProducts);
router.get("/get-product-details/:slug", getProductDetails);
router.get("/search-products", SearchProducts);

export default router;

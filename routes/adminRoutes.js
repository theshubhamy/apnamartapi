import express from "express";
import { body } from "express-validator";
import { isAdministrator } from "../middleware/is-administrator.js";
//controllers
///userlist
import { getAllUsers } from "../controllers/admin/user-list.js";
//products
import { getAllProducts } from "../controllers/product/get-all-products.js";
import { CreateProduct } from "../controllers/product/Create-Product.js";
//brands
import { CreateBrand } from "../controllers/brand/create-brand.js";
import { getAllBrands } from "../controllers/brand/get-all-brand.js";
//category
import { CreateCategory } from "../controllers/category/create-category.js";
import { getAllCategories } from "../controllers/category/get-all-categories.js";
///order
import { getAllOrders } from "../controllers/orders/order-list.js";
import { UpdateOrderStatus } from "../controllers/orders/update-status.js";
import { DeleteOrder } from "../controllers/orders/delete-order.js";
const router = express.Router();

/*userlist*/
router.get("/userlist", isAdministrator, getAllUsers);

/********************brand Routes **************************/
//create brand
router.post(
  "/create-brand",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("name is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  CreateBrand
);
//get all brands
router.get("/get-all-brands", isAdministrator, getAllBrands);

/*************************Category Routes***************************************/
//create category
router.post(
  "/create-category",
  isAdministrator,
  [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("name is required"),
    body("description")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 20 })
      .escape()
      .withMessage("Description is required"),
  ],
  CreateCategory
);
router.get("/get-all-categories", isAdministrator, getAllCategories);

/*********************Product Routes********************************/
router.get("/get-all-products", isAdministrator, getAllProducts);
//craete product
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

/********************************Order Routes************************************/
router.get("/get-all-orders", isAdministrator, getAllOrders);
router.put(
  "/update-order-status",
  isAdministrator,
  [body("status").not().isEmpty().withMessage("Status is required")],
  UpdateOrderStatus
);
router.delete("/delete-order/:id", isAdministrator, DeleteOrder);
export default router;

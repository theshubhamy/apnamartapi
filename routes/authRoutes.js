import express from "express";
import { body } from "express-validator";
//middleware
import { isUser } from "../middleware/is-user.js";
import { isAdmin } from "../middleware/is-admin.js";
//controllers
import { userSignup } from "../../controllers/auth/user/userSignup.js";
const router = express.Router();
/********************************usersRoutes*************************/
// adding new user to the database
router.post(
  "/user/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("phone")
      .trim()
      .isInt()
      .isLength({ min: 10, max: 12 })
      .withMessage("phone number must be an integer"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  userSignup
);

import express from "express";

import { body } from "express-validator";
//admin signup
import { adminSignupPhone } from "../controllers/authentication/admin/admin-signup-phone.js";
import { adminSignupVerification } from "../controllers/authentication/admin/admin-signup-verification.js";
//userSignup
import { userSignup } from "../controllers/authentication/user/user-signup.js";
import { userSignupVerification } from "../controllers/authentication/user/user-signup-verification.js";
//user login
import { userLoginEmail } from "../controllers/authentication/user/user-login-email.js";
//admin login
import { adminLoginEmail } from "../controllers/authentication/admin/admin-login-email.js";


import { adminLogout } from "../controllers/authentication/admin/admin-logout.js";
import { userLogout } from "../controllers/authentication/user/user-logout.js";

//middleware
import { isAdministrator } from "../middleware/is-administrator.js";
import { isUser } from "../middleware/is-user.js";

const router = express.Router();

//ADMIN SIGNUP USING otp
router.post(
  "/administrator/signup",
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
  adminSignupPhone
);

//ADMIN Signup email  OTP verification
router.post(
  "/administrator/signup/otp-verification",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  adminSignupVerification
);

//ADMIN LOGIN USING EMAIL + PASSWORD
router.post(
  "/administrator/login",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  adminLoginEmail
);

//USER SIGNUP USING PHONE
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
//USER Signup email  OTP verification
router.post(
  "/user/signup/otp-verification",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("otp")
      .trim()
      .isInt()
      .isLength({ min: 6 })
      .withMessage("OTP must be an integer and of 6 digits"),
  ],
  userSignupVerification
);
//USER LOGIN USING EMAIL + PASSWORD
router.post(
  "/user/signin",
  [
    body("email").isEmail().withMessage("Should be in a valid email format"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters"),
  ],
  userLoginEmail
);

// ADMIN LOGOUT
router.put("/administrator/logout", isAdministrator, adminLogout);

// USER LOGOUT
router.put("/user/logout", isAdministrator, userLogout);

export default router;

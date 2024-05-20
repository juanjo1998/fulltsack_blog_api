import { Router } from "express";
import { check } from "express-validator";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../../controllers/auth/index.js";
import { validateFields, authRequired } from "../../middlewares/index.js";
import { uniqueUser } from "../../helpers/index.js";

const router = Router();

router.post(
  "/api/register",
  [
    check("username", "The username field is required.").notEmpty(),
    check(
      "username",
      "The username must be min:4 and max:10 characters."
    ).isLength({
      min: 4,
      max: 10,
    }),
    check("username").custom(uniqueUser),
    check("password", "The password field is required.").notEmpty(),
    validateFields,
  ],
  register
);

router.post(
  "/api/login",
  [
    check("username", "The username field is required.").notEmpty(),
    check(
      "username",
      "The username must be min:4 and max:10 characters."
    ).isLength({
      min: 4,
      max: 10,
    }),
    check("password", "The password field is required.").notEmpty(),
    validateFields,
  ],
  login
);

router.post("/api/logout", logout);

router.get("/api/profile", authRequired, profile);

router.get("/api/verify-token", authRequired, verifyToken);

export default router;

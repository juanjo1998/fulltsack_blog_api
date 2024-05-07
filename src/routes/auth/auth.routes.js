import { Router } from "express";
import { check } from "express-validator";
import { register } from "../../controllers/auth/index.js";
import { validateFields } from "../../middlewares/index.js";
import { uniqueUser } from "../../helpers/index.js";

const router = Router();

router.post(
  "/register",
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

export default router;

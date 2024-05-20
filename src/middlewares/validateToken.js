import { request, response } from "express";
import jwt from "jsonwebtoken";

export const authRequired = (req = request, res = response, next) => {
  const { token } = req.cookies;
  // verify if token exist
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  // verify if token is valid
  const secretKey = process.env.JWT_SECRET_KEY;

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token." });
    req.user = user;

    next();
  });
};

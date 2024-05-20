import jwt from "jsonwebtoken";

export const generateJWT = (id = "") => {
  return new Promise((res, rej) => {
    const payload = { id };
    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.sign(payload, secretKey, { expiresIn: "4h" }, (err, token) => {
      if (err) {
        rej("Token error.");
      } else {
        res(token);
      }
    });
  });
};

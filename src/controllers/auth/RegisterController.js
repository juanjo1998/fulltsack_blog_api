import { request, response } from "express";
import { User } from "../../models/index.js";

export const register = async (req = request, res = response) => {
  const { username, password } = req.body;

  // user data

  const userData = { username, password };

  const newUser = await new User(userData);

  await newUser.save();

  return res.status(200).json({
    msg: "user registered.",
    newUser,
  });
};

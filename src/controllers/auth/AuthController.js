import { request, response } from "express";
import { User } from "../../models/index.js";
import { generateJWT } from "../../helpers/index.js";
import bcryptjs from "bcryptjs";

export const login = async (req = request, res = response) => {
  const { username, password } = req.body;
  const trimUsername = username.trim();
  const trimPassword = password.trim();

  try {
    // check if user exist
    const userFound = await User.findOne({ username: trimUsername });

    if (!userFound)
      return res.status(400).json({ errors: [{ msg: "User not found." }] });

    // check password

    const isMatch = await bcryptjs.compare(trimPassword, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: "The password is not valid.",
          },
        ],
      });
    }

    // generate token

    const token = await generateJWT(userFound._id);
    res.cookie("token", token);

    return res.status(200).json({
      msg: "user login",
      userFound,
    });
  } catch (error) {
    return res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error: Unable to create user.",
        },
      ],
    });
  }
};

export const register = async (req = request, res = response) => {
  const { username, password } = req.body;
  const trimUsername = username.trim();
  const trimPassword = password.trim();
  try {
    // encript password

    const hashedPassword = await bcryptjs.hash(trimPassword, 10);

    // user data

    const newUser = new User({
      username: trimUsername,
      password: hashedPassword,
    });

    // save user

    const userSaved = await newUser.save();

    // generate token

    const token = await generateJWT(userSaved._id);

    // save token in cookie

    res.cookie("token", token);

    return res.status(200).json({
      msg: "registered user",
      userSaved,
    });
  } catch (error) {
    return res.status(500).json({
      errors: [
        {
          msg: "Internal Server Error: Unable to create user.",
        },
      ],
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const user = req.user;

  try {
    const userFound = await User.findById(user.id);

    if (!userFound)
      return res.status(400).json({
        msg: "User not found.",
      });

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (req, res) => {
  const user = req.user;

  try {
    const userFound = await User.findById(user.id);

    if (!userFound)
      return res.status(400).json({
        msg: "User not found.",
      });

    return res.status(200).json({
      id: userFound._id,
      username: userFound.username,
    });
  } catch (error) {
    console.log(error);
  }
};

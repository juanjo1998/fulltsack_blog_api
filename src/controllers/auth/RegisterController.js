import { request, response } from "express";
import { User } from "../../models/index.js";
import bcryptjs from "bcryptjs";

export const register = async (req = request, res = response) => {
  const { username, password } = req.body;

  // encript password

  const hashedPassword = await bcryptjs.hash(password, 10);

  // user data

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(200).json({
    msg: "user registered.",
    newUser,
  });
};

export const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  // check if user exist

  try {
    const user = await User.findOne({ username });

    if (user) {
      // check password

      const validPassword = bcryptjs.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          errors: [
            {
              msg: "The password is not valid.",
            },
          ],
        });
      }

      // generate token

      return res.status(200).json({
        msg: "user login.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

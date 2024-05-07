import { User } from "../models/index.js";

export const uniqueUser = async (username = "") => {
  const isNotUnique = await User.findOne({ username });

  if (isNotUnique) {
    throw new Error(`The username: ${username} is already exist.`);
  }
};

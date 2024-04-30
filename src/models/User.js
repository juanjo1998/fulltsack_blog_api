import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    minLength: [4, "The min length is 4"],
    maxLength: [10, "The max length is 10"],
    required: [true, "The username is required."],
    unique: [true, "The username must be unique."],
  },
  password: {
    type: String,
    required: [true, "The password is required."],
  },
});

export const User = model("User", userSchema);

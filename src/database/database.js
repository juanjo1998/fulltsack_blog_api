import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_CNN;

    await mongoose.connect(uri);
    console.log("DATABASE CONNECTED.".bgMagenta);
  } catch (error) {
    console.log(error);
  }
};

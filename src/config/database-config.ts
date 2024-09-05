import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Connected MongoDB");
  } catch (error) {
    console.log("Error connecting MongoDB", error);
  }
};

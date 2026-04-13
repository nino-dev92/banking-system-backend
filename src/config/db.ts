import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ debug: true });

const URL: string = process.env.URL as string;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      dbName: "accounts",
    });
    console.log("DB CONNECTED");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};

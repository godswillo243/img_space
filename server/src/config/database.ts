import mongoose from "mongoose";
import { getEnv } from "../utils";

export const connectToDatabase = async () => {
  console.log("Connecting to mongodb...");
  try {
    const conn = await mongoose.connect(getEnv("MONGODB_URL"));
    return conn.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

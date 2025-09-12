import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB connection error: ", err);
      process.exit(1);
    });

    await mongoose.connect(config.mongoURI as string);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectDB;

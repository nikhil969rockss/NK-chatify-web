import mongoose from "mongoose";
import { ENV } from "./env";

const connectToDB = async () => {
  if (!ENV.MONGO_URL) {
    throw new Error("No Mongo URL found");
  }
  try {
    const conn = await mongoose.connect(ENV.MONGO_URL);
    console.log("Database connection successfull", conn.connection.host);
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
export default connectToDB;

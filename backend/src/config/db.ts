import mongoose from "mongoose";
import { MONGO_URL } from "./env";

console.log(MONGO_URL);
const connectToDB = async () => {
  if (!MONGO_URL) {
    throw new Error("No Mongo URL found");
  }
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log("Database connection successfull", conn.connection.host);
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
export default connectToDB;

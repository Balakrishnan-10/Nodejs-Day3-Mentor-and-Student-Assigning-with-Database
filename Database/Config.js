import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB_URL = process.env.MONGODB_URL

const connectDB = async (req, res) => {
  try {
    // console.log(mongoDB_URL);
    const connection = await mongoose.connect(mongoDB_URL);
    console.log("MongoDB Connected Successfully !!!");
  } catch (error) {
    res.status(500).json({ message: "MongoDB connection failed" });
  }
};

export default connectDB;

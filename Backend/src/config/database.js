import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/interview_db`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectToDB;

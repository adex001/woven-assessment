import mongoose from "mongoose";
import config from "../config";

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
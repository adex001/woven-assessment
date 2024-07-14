import mongoose, { Connection } from "mongoose";
import config from "../config";

type Environment = "development" | "test" | "production";

const dbEnvironments = {
  development: {
    mongoURI: config.MONGO_URI,
  },
  test: {
    mongoURI: config.MONGO_URI_TEST,
  },
  production: {
    mongoURI: config.MONGO_URI,
  },
};

const connectToDatabase = async (environment: Environment): Promise<void> => {
  const mongoURI = dbEnvironments[environment]?.mongoURI;

  if (!mongoURI) {
    throw new Error(`MongoURI for ${environment} environment is not defined`);
  }

  mongoose
    .connect(mongoURI)
    .then(() => console.log(`Connected to MongoDB ${environment} environment.`))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectToDatabase;

import mongoose, { Connection } from "mongoose";
import config from "../config";

type Environment = "development" | "test" | "production";

const connections: { [key in Environment]?: Connection } = {};

const dbEnvironments = {
  development: {
    mongoURI: config.MONGO_URI,
  },
  test: {
    mongoURI: config.MONGO_URI_TEST,
  },
  production: {
    mongoURI: config.MONGO_URI
  },
};

const connectToDatabase = async (environment: Environment): Promise<void> => {
  try {
    const mongoURI = dbEnvironments[environment].mongoURI;

    if (!mongoURI) {
      throw new Error(`MongoURI for ${environment} environment is not defined`);
    }

    if (connections[environment]) {
      console.log(`Already connected to ${environment} database`);
      return;
    }
    mongoose
      .connect(mongoURI)
      .then(() => console.log(`Connected to MongoDB ${environment} environment.`))
      .catch((err) => console.error("MongoDB connection error:", err));

  } catch (error) {
    console.error(`Error connecting to ${environment} database:`, error);
    process.exit(1);
  }
};

export default connectToDatabase;
export { connections };

import { config as dotenvConfig } from "dotenv";

dotenvConfig();


const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  MONGO_URI_TEST,
} = process.env;

const validEnvironments = ["development", "test", "production"];
let defaultEnvironment = null;

if (!validEnvironments.includes(NODE_ENV || "")) {
  defaultEnvironment = "development";
} else {
  defaultEnvironment = NODE_ENV
}

const config = {
  corsOption: {
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  NODE_ENV: defaultEnvironment,
  APP_PORT: PORT || 3000,
  MONGO_URI: MONGO_URI || "",
  MONGO_URI_TEST: MONGO_URI_TEST || "",
  JWT_SECRET: JWT_SECRET || "ABCDEFGH1234567890",
  expiresIn: JWT_EXPIRES_IN || '1h',
};

export default config;

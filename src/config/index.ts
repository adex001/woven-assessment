import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const config = {
  corsOption: {
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  NODE_ENV,
  APP_PORT: PORT || 3000,
  MONGO_URI: MONGO_URI || "",
  JWT_SECRET: JWT_SECRET || "ABCDEFGH1234567890",
  expiresIn: JWT_EXPIRES_IN || '1h',
};

export default config;

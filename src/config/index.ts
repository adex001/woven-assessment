import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const { PORT, NODE_ENV } = process.env;

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
};

export default config;

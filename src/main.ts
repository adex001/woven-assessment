import helmet from "helmet";
import { configDotenv } from "dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import indexRouter from "./routes";

configDotenv();

// app
const app = express();

// Configurations
app.use(cors(config.corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.set("port", config.APP_PORT);

app.get("/", async (req: Request, res: Response) => {
  return res.json({
    message: "Welcome to User Management API.",
  });
});

app.use("/api/v1", indexRouter);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    message: "Invalid url.",
  });
});

// error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
  });
});

app.listen(app.get("port"), () => {
  console.log("User Management API is running on port: ", app.get("port"));
});

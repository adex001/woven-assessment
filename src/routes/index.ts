import { Router } from "express";
import userRoutes from "../users/user.routes";

const indexRouter = Router();

indexRouter.use("/users", userRoutes);

export default indexRouter;

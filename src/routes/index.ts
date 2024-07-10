import { Router } from "express";
import userRoutes from "./user";

const indexRouter = Router();

indexRouter.use('/user', userRoutes);

export default indexRouter;

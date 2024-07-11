import { Router } from "express";
import userRoutes from "../user/user.routes";

const indexRouter = Router();

indexRouter.use('/users', userRoutes);

export default indexRouter;

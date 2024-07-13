import { Router } from "express";
import UserController from "./user.controller";
import schemaValidator from "../middlewares/schemaValidator";
import { loginSchema, registerSchema, updateProfileSchema } from "./user.schema";
import authenticateToken from "../middlewares/validateToken";
import upload from "../middlewares/upload";

const userRoutes = Router();

userRoutes.post("/register", schemaValidator(registerSchema), UserController.register);
userRoutes.post('/login', schemaValidator(loginSchema), UserController.login);
userRoutes.get('/profile', authenticateToken, UserController.getProfile);
userRoutes.put('/profile', authenticateToken, schemaValidator(updateProfileSchema), UserController.updateProfile);
userRoutes.post('/profile/picture', authenticateToken, upload.single('file'), UserController.uploadProfilePicture);
userRoutes.get('/profile/picture', authenticateToken, UserController.getProfilePicture)

export default userRoutes;

import { Router } from "express";
import { postLogin, postRegister } from "../controllers/authController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const authRouter = Router()

authRouter.post("/auth/register", schemaValidator(registerSchema), postRegister)
authRouter.post("/auth/login", schemaValidator(loginSchema), postLogin)

export default authRouter
import { Router } from "express";
import { postLogin, postRegister } from "../controllers/authController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const authRouter = Router()

authRouter.post("/sign-up", schemaValidator(registerSchema), postRegister)
authRouter.post("/sign-in", schemaValidator(loginSchema), postLogin)

export default authRouter
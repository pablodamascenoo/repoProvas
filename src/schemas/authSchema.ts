import Joi, { any } from "joi";
import { UserInsertData, UserInsertSchema } from "../repositories/userRepository.js";

export const registerSchema = Joi.object<UserInsertSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({"any.required": "passwords must match"})
})

export const loginSchema = Joi.object<UserInsertData>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
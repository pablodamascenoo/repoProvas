import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";
import verifyToken from "../middlewares/tokenValidator.js";

const categoryRouter = Router()

categoryRouter.get("/categories", verifyToken, getCategories)

export default categoryRouter
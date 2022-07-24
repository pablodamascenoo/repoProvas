import { Router } from "express";
import verifyToken from "../middlewares/tokenValidator.js";

const categoryRouter = Router()

categoryRouter.get("/categories", verifyToken)

export default categoryRouter
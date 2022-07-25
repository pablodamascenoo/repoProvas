import { Router } from "express";
import { getTests, postTest } from "../controllers/testController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import verifyToken from "../middlewares/tokenValidator.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.post("/tests", verifyToken, schemaValidator(testSchema), postTest);
testRouter.get("/tests", verifyToken, getTests);

export default testRouter;

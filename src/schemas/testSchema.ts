import Joi from "joi";
import { TestSchemaData } from "../repositories/testRepository.js";

const testSchema = Joi.object<TestSchemaData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    teacherId: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required(),
    disciplineId: Joi.number().integer().required()
})

export default testSchema
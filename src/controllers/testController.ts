import * as testService from "../services/testService.js"
import { Request, Response } from "express";
import { TestSchemaData } from "../repositories/testRepository.js";


export async function postTest(req: Request, res: Response) {
    const TestData: TestSchemaData = req.body
    await testService.createTest(TestData)
    res.sendStatus(201)
}
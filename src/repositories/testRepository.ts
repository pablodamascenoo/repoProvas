import { Test } from "@prisma/client";
import client from "../config/database.js";

export type TestSchemaData = Omit<Test, "id"|"teacherDisciplineId"> & {teacherId: number, disciplineId:number}
export type TestInsertData = Omit<Test, "id">

export async function insertTest(testData:TestInsertData) {
    await client.test.create({
        data:{...testData}
    })
}
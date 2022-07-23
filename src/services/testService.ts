import * as categoryRepository from "../repositories/categoryRepository.js"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js"
import * as testRepository from "../repositories/testRepository.js"
import { TestSchemaData } from "../repositories/testRepository.js"

export async function createTest(testData: TestSchemaData) {
    
    const foundCategory = await categoryRepository.getCategoryById(testData.categoryId)
    if(!foundCategory) throw { status: 401, message: "category not registered"}
    const teacherDisciplineRelation = await teacherDisciplineRepository.findRelation(testData.teacherId, testData.disciplineId)
    if(!teacherDisciplineRelation) throw { status:401, message:"this teacher/discipline relation does not exists"}
    const insertData: testRepository.TestInsertData = {
        teacherDisciplineId: teacherDisciplineRelation.id,
        categoryId: testData.categoryId,
        name: testData.name,
        pdfUrl: testData.pdfUrl
    }
    await testRepository.insertTest(insertData)
}
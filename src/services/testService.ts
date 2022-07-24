import * as categoryRepository from "../repositories/categoryRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import { TestSchemaData } from "../repositories/testRepository.js";

export async function createTest(testData: TestSchemaData) {
  const foundCategory = await categoryRepository.getCategoryById(
    testData.categoryId
  );
  if (!foundCategory) throw { status: 401, message: "category not registered" };
  const teacherDisciplineRelation =
    await teacherDisciplineRepository.findRelation(
      testData.teacherId,
      testData.disciplineId
    );
  if (!teacherDisciplineRelation)
    throw {
      status: 401,
      message: "this teacher/discipline relation does not exists",
    };
  const insertData: testRepository.TestInsertData = {
    teacherDisciplineId: teacherDisciplineRelation.id,
    categoryId: testData.categoryId,
    name: testData.name,
    pdfUrl: testData.pdfUrl,
  };
  await testRepository.insertTest(insertData);
}

export async function getTestsByFilter(filter: string) {
  if (filter === "disciplines") {
    const foundTestsByDiscipline = await termRepository.getTestsByDiscipline();
    return foundTestsByDiscipline;
  } else if (filter === "teachers") {
    const foundTestsByTeacher =
      await teacherDisciplineRepository.getTestsByTeacher();
    return foundTestsByTeacher;
  } else
    throw { status: 422, message: "param must be disciplines or teachers" };
}

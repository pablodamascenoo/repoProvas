import { TestSchemaData } from "../../src/repositories/testRepository.js";

export default function validTestBody() {
  const body: TestSchemaData = {
    name: "prova de javascript",
    pdfUrl: "https://www.google.com/jpg",
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1,
  };
  return body;
}

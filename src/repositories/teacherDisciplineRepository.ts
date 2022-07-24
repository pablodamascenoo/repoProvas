import client from "../config/database.js";

export async function findRelation(teacherId: number, disciplineId: number) {
  const foundRelation = await client.teacherDiscipline.findFirst({
    where: {
      teacherId,
      disciplineId,
    },
  });
  return foundRelation;
}

export async function getTestsByTeacher() {
  const result = await client.teacherDiscipline.findMany({
    include: {
      discipline: {
        include: {
          term: true,
        },
      },
      teacher: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
  });

  return result;
}

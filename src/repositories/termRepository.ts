import client from "../config/database.js";

export async function getTestsByDiscipline() {
  const result = await client.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            select: {
              teacher: true,
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
}

import client from "../config/database.js";

async function main() {
  await client.term.createMany({
    data: [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
    ],
    skipDuplicates: true,
  });

  await client.categorie.createMany({
    data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
    skipDuplicates: true,
  });

  await client.teacher.createMany({
    data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
    skipDuplicates: true,
  });

  await client.discipline.createMany({
    data: [
      { name: "HTML e CSS", termId: 1 },
      { name: "JavaScript", termId: 2 },
      { name: "React", termId: 3 },
      { name: "Humildade", termId: 4 },
      { name: "Planejamento", termId: 5 },
      { name: "Autoconfiança", termId: 6 },
    ],
    skipDuplicates: true,
  });

  await client.teacherDiscipline.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 1, disciplineId: 2 },
      { teacherId: 1, disciplineId: 3 },
      { teacherId: 2, disciplineId: 4 },
      { teacherId: 2, disciplineId: 5 },
      { teacherId: 2, disciplineId: 6 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });

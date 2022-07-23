import client from "../config/database.js";

export async function findRelation(teacherId:number, disciplineId:number) {
    const foundRelation = await client.teacherDiscipline.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    })
    return foundRelation
}
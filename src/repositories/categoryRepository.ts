import { Categorie } from "@prisma/client";
import client from "../config/database.js";

export async function getCategoryById(id:number) {
    const foundCategory = await client.categorie.findFirst({
        where:{
            id
        }
    })
    return foundCategory
}
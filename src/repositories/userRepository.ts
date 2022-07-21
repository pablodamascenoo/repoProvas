import { User } from "@prisma/client";
import client from "../config/database.js";

export type UserInsertData = Omit<User, "id">
export type UserInsertSchema = UserInsertData & {confirmPassword: string}

export async function findUserById(id:number) {
    const foundUser = await client.user.findFirst({
        where:{
            id
        }
    })
    return foundUser
}

export async function findUserByEmail(email:string) {
    const foundUser = await client.user.findFirst({
        where:{
            email
        }
    })
    return foundUser
}

export async function insertUser(data:UserInsertData){
    await client.user.create({
        data
    })
}
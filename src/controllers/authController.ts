import { Request, Response } from "express";
import { UserInsertData} from "../repositories/userRepository.js";
import * as authService from "../services/authService.js"

export async function postLogin(req: Request, res: Response) {
    const userData:UserInsertData = req.body
    const token = await authService.login(userData)
    return res.send(token)
}

export async function postRegister(req: Request, res: Response) {
    const {email, password}:UserInsertData = req.body
    await authService.register({email, password})
    return res.sendStatus(201)
}
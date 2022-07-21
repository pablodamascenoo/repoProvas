import * as authRepository from "../repositories/userRepository.js"
import { UserInsertData } from "../repositories/userRepository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function register(userData: UserInsertData) {
    const foundUser = await authRepository.findUserByEmail(userData.email)
    if(foundUser) throw { status: 409, message: "email already registered"}
    const cryptedPassword = cryptPassword(userData.password)
    await authRepository.insertUser({...userData, password: cryptedPassword})
}

export async function login(userData: UserInsertData) {
    const foundUser = await authRepository.findUserByEmail(userData.email)
    if(!foundUser) throw { status: 404, message: "user not found"}
    if(!bcrypt.compareSync(userData.password, foundUser.password)) throw { status: 401, message: "wrong password"}
    return generateToken(userData.email)
}

function cryptPassword(password: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
}

function generateToken(email: string) {
    const data = { email };
    const config = { expiresIn: process.env.JWT_EXPIRES };
    const token = jwt.sign(data, process.env.JWT_SECRET, config);
    return token;
}
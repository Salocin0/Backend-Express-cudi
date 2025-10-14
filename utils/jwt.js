import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_ACCESS = process.env.JWT_ACCESS
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN
const JWT_REFRESH = process.env.JWT_REFRESH
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN

export const generarAccessToken = (payload)=>{
    const expiresIn = 5 // 15 min
    return jwt.sign(payload,JWT_ACCESS,{expiresIn})
}

export const generarRefreshToken = (payload)=>{
    const expiresIn =  2592000 // 30 dias
    return jwt.sign(payload,JWT_REFRESH,{expiresIn})
}
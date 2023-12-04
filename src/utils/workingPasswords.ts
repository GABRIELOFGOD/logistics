import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose/types'

export const salt = (salter: number) => bcrypt.genSalt(salter)

export const hashing = (password: string, salter: string) => bcrypt.hash(password, salter)

export const comparePassword = (password: string, userPassword: string) => bcrypt.compare(password, userPassword)

export const createCookie = (id: ObjectId) => {
    return jwt.sign({id}, process.env.JWT_TOKEN, {expiresIn: '3d'})
}
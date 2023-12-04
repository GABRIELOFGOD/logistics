import express from 'express'
import { forgotPassword, userLogin, userReg } from '../controllers'

export const router = express.Router()

router.route('/register').post(userReg)

router.route('/login').post(userLogin)

router.route('/forgot-password').put(forgotPassword)
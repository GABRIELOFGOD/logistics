import express from 'express'
import { regGood } from '../controllers'

export const router = express.Router()

router.route('/send').post(regGood)
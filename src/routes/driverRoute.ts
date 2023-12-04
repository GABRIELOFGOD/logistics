import express from 'express'
import { addVehicle, driverLogin, driverRegistration } from '../controllers'

export const router = express.Router()

router.route('/register').post(driverRegistration)
router.route('/login').post(driverLogin)
router.route('/vehicle:id').put(addVehicle)
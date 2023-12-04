import mongoose from "mongoose";
import { Driver, User, Vehicle } from "../models";

type vehicleProp = {
    brand: string,
    regNum: string,
    logisticNum: string,
    color: string,
    own: any
}

interface userProp {
    name: string,
    phone: number,
    address: string,
    email: string,
    password: string,
}

interface driverProp{
    name: string,
    email: string,
    phone: number,
    password: string,
    vehicles: any[]
}

export const vehicleCreator = (vehicle: vehicleProp) => Vehicle.create(vehicle)

export const userCreator = (user: userProp) => User.create(user)

export const driverCreator = (driver: driverProp) => Driver.create(driver)

// export const addVehicle = ( id:mongoose.Types.ObjectId, vehicle:any) => {
//     Driver.findByIdAndUpdate(id, {
//         vehicles: {...vehicle}
//     })
// }
import mongoose from "mongoose";
import { Driver, User } from "../models";

export const vehicleAdder = (id:mongoose.Types.ObjectId, newVehicle:any ) => Driver.findByIdAndUpdate(id, {
    $addToSet: { vehicles: newVehicle }
})

export const userPasswordUpdate = (id: string, password:string) => User.findByIdAndUpdate(id, {password})
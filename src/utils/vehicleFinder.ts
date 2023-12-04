import { Vehicle } from "../models";

export const allVehicles = () => Vehicle.find()

export const oneVehicle = (regNum: string) => Vehicle.findOne({regNum})
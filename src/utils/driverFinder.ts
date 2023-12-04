import { Driver } from "../models";

export const driverEmailFinder = (email: string) => Driver.findOne({email})

export const driverPhoneFinder = (phone: number) => Driver.findOne({phone})



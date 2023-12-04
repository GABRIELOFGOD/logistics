import { Request, Response } from "express";
import { allVehicles, driverEmailFinder, oneVehicle } from "../utils";
import { vehicleAdder, vehicleCreator } from "../config";


export const regVehicle = async(req: Request, res: Response) => {
    const { brand, color, regNum, owner, } = req.body
    try {

        // ================= CHECKING IF VEHICLE HAS BEEN REGISTERED =============== //
        const isExist = await oneVehicle(regNum)
        if(isExist) return res.status(401).json({error: 'This vehicle has already been registered'})

        // ================= CREATING IDENTITY NUMBER ==================== //
        const logisticNum = await `GLG/${Date.now()}/SN${allVehicles.length + 1}`

        // ============== VALIDATING INPUT FIELDS =================== //
        if(!brand || !color || !regNum || !owner) return res.status(401).json({error: 'All input fields are required'})

        // ==================== CONFIRMING IF VWHICLE OWNER IS REGISTERED ==================== //
        const isDriver = await driverEmailFinder(owner)
        if(!isDriver) return res.status(404).json({error: 'This is not a registered driver, try again or register as a driver'})

        const newVehicle = await vehicleCreator({
            brand,
            color,
            regNum,
            logisticNum,
            own: isDriver
        })

        // ================ ADDING NEW VEHICLE TO DRIVER'S INVENTORY ================ //
        const newDriver = await vehicleAdder(isDriver._id, newVehicle)

        // ================= SENDING A SUCCESS RESPONSE ================ //
        res.status(201).json({success: 'Vehicle registered successfully', newVehicle})
        
    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}
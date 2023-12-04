import { Request, Response } from "express";
import { comparePassword, createCookie, driverEmailFinder, driverPhoneFinder, hashing, salt, strongPassword, validEmail, validatePhone } from "../utils";
import { driverCreator } from "../config";

export const driverRegistration = async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body
    try {
        
        // =============== VALIDATING INPUT FIELDS =================== //
        if(!name) return res.status(400).json({error: 'name field is required'})

        if(!email) return res.status(400).json({error: 'email field is required'})

        if(!password) return res.status(400).json({error: 'password field is required'})
        
        // =============== VALIDATING PHONE IS CORRECT ================= //
        if(phone){
            const isPhone = validatePhone(phone)
            if(!isPhone) return res.status(400).json({error: 'This is not a valid phone number'})
        }

        // =============== VALIDATING EMAIL IS CORRECT =================== //
        const isEmail = validEmail(email)
        if(!isEmail) return res.status(400).json({error: 'This is not a valid email address'})

        // =============== VALIDATING STRONG PASSWORD ==================== //
        const passStrg = strongPassword(password)
        if(!passStrg) return res.status(400).json({error: 'password must be at least 8 characters including at least an uppercase, a lowercase, a number and a specal character'})

        // ================ CHECKING IF USER EXISTS ================== //
        const emailExists = await driverEmailFinder(email)
        if(emailExists) return res.status(400).json({error: 'This user already exists, try loging in or use another email'})

        const phoneExists = await driverPhoneFinder(phone)
        if(phoneExists) return res.status(400).json({error: 'This user already exists, try loging in or use another phone number'})

        // ============== HASHING PASSWORD ============== //
        const salter = await salt(10)
        const hashedPassword = await hashing(password, salter)

        const newDriver = {
            name,
            email,
            phone,
            password: hashedPassword,
            vehicles: []
        }

        const driver = await driverCreator(newDriver)

        res.status(201).json({success: 'New deriver account created successfully', driver})

    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}

export const driverLogin = async(req: Request, res: Response) => {
    const { email, phone, password } = req.body
    try {

        // ================= CONFIRMING USER INPUTS ==================== //
        if(!email && !phone) return res.status(400).json({error: 'kindly input your phone number or email to login to your account'})
        if(!password) return res.status(400).json({error: 'password field is required to login to your account'})
        if(email && phone) return res.status(400).json({error: 'kindly input your phone number or email to login to your account'})

        // ================ CHECKING IF USER EXISTS ==================== //
        const emailExists = await driverEmailFinder(email)
        const phoneExists = await driverPhoneFinder(phone)
        const user = emailExists || phoneExists
        if(user){
            
            // =============== CONFIRMING PASSWORD ================= //
            const correctPassword = await comparePassword(password, user.password)
            if (correctPassword) {
                const token = createCookie(user._id)
                res.cookie('driver', token, { maxAge: 60*60*24*3*1000, httpOnly: true } )
                res.status(201).json({success: 'Login successfully'})
            } else {
                return res.status(400).json({error: 'user does not exists check your email or phone number and password then try again'})
            }
        }else{
            return res.status(400).json({error: 'user does not exists check your email or phone number and password then try again'})
        }


    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}

export const addVehicle = async (req: Request, res: Response) => {
    // const { id } = req.params
    // try {
    //     const newVehicle = await Driver.findByIdAndUpdate(id, {
    //         vehicles: {...}
    //     })
    // } catch (error) {
    //     return res.status(400).json({error: 'user does not exists check your email or phone number and password then try again'})
    // }
}

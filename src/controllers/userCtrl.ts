import { Request, Response } from "express";
import { comparePassword, createCookie, hashing, salt, emailFinder, phoneFinder, strongPassword, validEmail, validatePhone, userFinder } from "../utils";
import { userCreator } from "../config";

// ====================== USER REGISTERATION CONTROLLER ====================== //
export const userReg = async (req: Request, res: Response) => {
    const { name, phone, address, email, password } = req.body
    try {

        // =============== VALIDATING INPUT FIELDS =================== //
        if(!name) return res.status(400).json({error: 'name field is required'})

        if(!email) return res.status(400).json({error: 'email field is required'})

        if(!password) return res.status(400).json({error: 'password field is required'})

        // ================ CHECKING IF USER EXISTS ================== //
        const emailExists = await emailFinder(email)
        if(emailExists) return res.status(400).json({error: 'This user already exists, try loging in or use another email'})

        const phoneExists = await phoneFinder(phone)
        if(phoneExists) return res.status(400).json({error: 'This user already exists, try loging in or use another phone number'})

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

        // ============== HASHING PASSWORD ============== //
        const salter = await salt(10)
        const hashedPassword = await hashing(password, salter)

        // =============== CREATING NEW USER ================ //
        const userData = {
            name,
            phone,
            address,
            email,
            password: hashedPassword
        }
        const newUser = await userCreator(userData)
        // newUser = { ...others, password }
        res.status(201).json({success: 'New user created successfully', newUser})
        
    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}

// ========================== USER LOGIN CONTROLLER ============================ //
export const userLogin = async (req: Request, res: Response) => {
    const { email, phone, password } = req.body
    try {

        // ================= CONFIRMING USER INPUTS ==================== //
        if(!email && !phone) return res.status(400).json({error: 'kindly input your phone number or email to login to your account'})
        if(!password) return res.status(400).json({error: 'password field is required to login to your account'})
        if(email && phone) return res.status(400).json({error: 'kindly input your phone number or email to login to your account'})

        // ================ CHECKING IF USER EXISTS ==================== //
        const emailExists = await emailFinder(email)
        const phoneExists = await phoneFinder(phone)
        const user = emailExists || phoneExists
        if(user){
            
            // =============== CONFIRMING PASSWORD ================= //
            const correctPassword = await comparePassword(password, user.password)
            if (correctPassword) {
                const token = createCookie(user._id)
                res.cookie('user', token, { maxAge: 60*60*24*3*1000, httpOnly: true } )
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

export const forgotPassword = async (req: Request, res: Response) => {
    const { password } = req.body
    const { id } = req.params
    try {

        // ================ VALIDATING USER INPUT ======================== //
        if(!password) return res.status(402).json({error: 'Inputs are required'})
        
        // =============== GETTING USER TO UPDATE PASSWORD ====================== //
        // const user = await userFinder(id)

        // =================== HASHING PASSWORD ===================== //
        const salter = await salt(10)
        const hashedPassword = await hashing(password, salter)

        // =================== UPDATING USER PASSWORD ======================== //
        console.log(hashedPassword)

    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}
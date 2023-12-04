import { Request, Response } from "express";

export const regGood =async (req:Request, res: Response) => {
    const { name, weight, location } = req.body
    try {
        
    } catch (err) {
        res.status(400).json({error: 'Something went wrong, check your internet and try again. If this error persists, kingly reach out to us.'})
    }
}
import mongoose from "mongoose";
import { User } from "../models";

export const emailFinder = (email: string) => User.findOne({email})

export const phoneFinder = (phone: number) => User.findOne({phone})

export const userFinder = (id:string) => User.findById(id)
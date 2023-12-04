import validator from "validator";

export const validEmail = (input:string) => validator.isEmail(input)

export const validatePhone = (input: string) => validator.isMobilePhone(input)

export const strongPassword = (input: string) => validator.isStrongPassword(input)
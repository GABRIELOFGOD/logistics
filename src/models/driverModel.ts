import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const driverSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
    },
    balance:{
        type: Number,
        default: 0
    },
    vehicles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Vehicle'
    }]
}, {timestamps: true});

//Export the model
export const Driver = mongoose.model('Driver', driverSchema);
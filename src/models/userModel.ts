import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
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
    address: {
        type:String
    },
    city:{
        type: String
    },
    country: {
        type: String
    },
    transactions:[{
        type:mongoose.Types.ObjectId,
        ref: 'Goods'
    }]
}, { timestamps: true });

//Export the model
export const User = mongoose.model('User', userSchema);
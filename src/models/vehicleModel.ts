import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var VehicleSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true,
    },
    regNum:{
        type:String,
        required:true,
        unique:true,
    },
    logisticNum:{
        type: String,
        unique: true,
        required: true
    },
    color:{
        type:String,
        required:true,
    },
    own:{
        type:mongoose.Types.ObjectId,
        ref: 'Driver'
    },
    image:{
        type: String
    },
    goodsConvelled:[{
        type:mongoose.Types.ObjectId,
        ref: 'Goods'
    }]
}, {timestamps: true});

//Export the model
export const Vehicle = mongoose.model('Vehicle', VehicleSchema);
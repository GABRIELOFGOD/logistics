import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const goodsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:String,
    },
    dropoff:{
        type:String,
        required: true
    },
    pickup:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId || String,
        ref: 'User'
    },
    trackingId:{
        type: String
    },
    convener:{
        type: mongoose.Types.ObjectId,
        ref: 'Vehicle'
    },
    status:{
        type: String,
        default: 'pending'
    },
    price:{
        type: Number,
        required: true
    },
    other:{
        type: String
    }
}, { timestamps: true });

//Export the model
export const Goods = mongoose.model('Goods', goodsSchema);
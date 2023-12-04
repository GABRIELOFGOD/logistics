import mongoose from "mongoose";
// const mongoUri = (uri:string) => {
//     return uri
// }

// const urigan = mongoUri(process.env.MONGODB_URI)

export const conn = async (uri:string) => {
    let connect = await mongoose.connect(uri)
    .then(() => console.log('Data base connected successfully'))
    .catch(err => console.log('Data base connection failed', err))
}
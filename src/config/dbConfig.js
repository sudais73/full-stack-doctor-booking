import mongoose from "mongoose";

export const connectDb = async()=>{
try {
    mongoose.connection.on('connected', ()=>console.log('db connected'))
    await mongoose.connect(process.env.MONGODB_URL)
} catch (error) {
    console.log(error.message);
    
}
}
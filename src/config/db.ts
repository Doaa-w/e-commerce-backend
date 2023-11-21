import mongoose from "mongoose";
import { dev } from ".";

export const connectDB= async ()=>{
try {
    mongoose.connect(dev.db.url)
} catch (error) {
   console.log(error) 
}
}
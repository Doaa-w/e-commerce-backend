import mongoose from "mongoose";


export const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true,
            minlenght: [2, "category's name should be more than 5 characters "],
            maxlenght: [50 , "category's name should be less than 50 characters"],
        },
        slug:{
            type: String,
            require: true,
            lowercase: true,
        },
    },
    {timestamps: true}
);
export default mongoose.model("category", categorySchema)
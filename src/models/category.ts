
import { Schema ,model } from "mongoose";

 const categorySchema = new Schema(
    {
        name:{
            type : String,
            require: true,
            trim: true,
            minlenght: [2, "category name should be more than 5 characters "],
            maxlenght: [50 , "category name should be less than 50 characters"],
        },
        slug:{
            type: String,
            unique: true ,
            lowercase: true,
        },
    },
    {timestamps: true}
);
export const category = model('category', categorySchema)
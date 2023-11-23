import mongoose from "mongoose";
import { Schema ,model } from "mongoose";


export const categorySchema = new Schema(
    {
        name:{
            type: String,
            require: true,
            minlenght: [2, "category's name should be more than 5 characters "],
            maxlenght: [50 , "category's name should be less than 50 characters"],
        },
        slug:{
            type: String,
            lowercase: true,
        },
    },
    {timestamps: true}
);
export const category = model("category", categorySchema)
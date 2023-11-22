import {Request,Response , NextFunction } from "express";
import category from "../models/category";


export const getAllCategories =  async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const categories = await category.find() 
        console.log('category:')
        res.status(200).json({message: 'all categories are here' , payload: categories})  
    } catch (error) {
        next(error)
    }
        
     
}
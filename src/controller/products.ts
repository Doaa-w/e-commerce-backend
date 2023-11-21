import {Request,Response , NextFunction } from "express";
import product from "../models/product";


export const getAllProducts = async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const products = await product.find()
        console.log('products:', products)
        res.status(200).json({message: 'all products are here' , payload:products})  
    } catch (error) {
        next(error)
    }
        
     
}

export const createProduct = async (req: Request , res: Response , next:NextFunction)=>{
    // const { name, description, quantity } = req.body

    // if (!name || !description) {
    //   next(ApiError.badRequest('Name and Description are requried'))
    //   return
    // }
    // const product = new Product({
    //   name,
    //   description,
    //   quantity,
    // })
  
    // await product.save()
    // res.json(product)
 
}
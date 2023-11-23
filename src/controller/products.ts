import {Request,Response , NextFunction } from "express";
import product from "../models/product";
import { productInput } from "../types";


export const getAllProducts = async (req: Request , res: Response , next:NextFunction)=>{
    try {
      const products = await product.find()
        res.status(200).json({message: 'all products are here' , payload:products})  
    } catch (error) {
        next(error)
    }

}

export const createProduct = async (req: Request , res: Response , next:NextFunction)=>{
  try {
    const { name, description, quantity } = req.body
    const s_product = new product({
      name,
      description,
      quantity,
    })
    await s_product.save()
    console.log(s_product)

    res.status(201).json({ message: 'all products are here', payload: s_product })
  } catch (error) {
    next(error)
  }
}
export const deleteProduct = async (req: Request , res: Response , next:NextFunction)=> {
  try {
    const id = req.params.id
    const deletedProduct = await product.findByIdAndDelete(id)
    if (deletedProduct) {
      res.status(200).json({
        message: 'Product deleted',
        payload: deletedProduct,
      })
    }
  } catch (error) {
    next(error)
  }
}












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